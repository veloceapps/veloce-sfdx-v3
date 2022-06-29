import { existsSync, mkdirSync } from 'fs';
import { Connection } from '@salesforce/core';
import { writeFileSafe } from '../utils/common.utils';
import { LegacySection, LegacyUiDefinition, UiDef, UiDefinition, UiElement, UiMetadata } from '../types/ui.types';
import { extractElementMetadata, fromBase64, isLegacyDefinition } from '../utils/ui.utils';
import { ProductModel } from '../types/productModel.types';
import { fetchProductModels } from '../utils/productModel.utils';
import { DocumentContentReturn, fetchDocumentContent } from '../utils/document.utils';

export interface PullUIParams {
  sourcepath: string;
  conn: Connection;
  dumpAll: boolean;
  uisToDump: Set<string>;
}

export async function pullUI(params: PullUIParams): Promise<string[]> {
  const { sourcepath, conn, dumpAll, uisToDump } = params;

  const modelNames = dumpAll ? undefined : Array.from(uisToDump).map((ui) => ui.split(':')[0]);

  console.log(`Dumping ${dumpAll ? 'All Uis' : 'Uis with names: ' + (modelNames?.join() ?? '')}`);
  const uiDefProductModels: ProductModel[] = await fetchProductModels(conn, dumpAll, modelNames);
  console.log(`Dumping Uis result count: ${uiDefProductModels.length}`);

  const uiDefNamesMap = Array.from(uisToDump).reduce((acc, ui) => {
    const [modelName, defName] = ui.split(':');
    acc[modelName] = defName;
    return acc;
  }, {} as { [modelName: string]: string });

  const contents: (DocumentContentReturn | undefined)[] = await Promise.all(
    uiDefProductModels.map((productModel) => fetchDocumentContent(conn, productModel)),
  );

  contents.forEach((res) => {
    if (!res) {
      return;
    }
    const { productModel, content } = res;
    const { Name } = productModel;

    let uiDefs: UiDef[] = [];
    try {
      uiDefs = JSON.parse(content ?? '') as UiDef[];
    } catch (err) {
      console.log(`Failed to parse document content: ${Name}`);
      return;
    }

    const path = `${sourcepath}/config-ui/${Name}`;

    // legacy ui definitions metadata is stored in global metadata.json as array
    const legacyMetadataArray: LegacyUiDefinition[] = [];

    uiDefs?.forEach((ui) => {
      const includeUiName = dumpAll || !uiDefNamesMap[Name] || uiDefNamesMap[Name] === ui.name;
      if (!includeUiName) {
        return;
      }

      const uiDir = `${path}/${ui.name}`;

      if (isLegacyDefinition(ui)) {
        saveLegacyUiDefinition(ui, uiDir, legacyMetadataArray);
      } else {
        saveUiDefinition(ui, uiDir);
      }
    });

    if (legacyMetadataArray.length) {
      writeFileSafe(path, 'metadata.json', JSON.stringify(legacyMetadataArray, null, 2));
    }
  });

  return uiDefProductModels.map(({ Id }) => Id);
}

function saveLegacySections(
  sections: LegacySection[],
  path: string,
  metadata: LegacyUiDefinition,
  parentId?: string,
): void {
  const firstChildren = sections.filter((s) => s.parentId === parentId);

  firstChildren.forEach((c) => {
    const childPath = `${path}/${c.label}`;

    // save files
    saveLegacySectionFiles(c, childPath, metadata);

    // save grandchildren
    saveLegacySections(sections, childPath, metadata, c.id);
  });
}

function saveLegacyUiDefinition(ui: LegacyUiDefinition, path: string, metadataArray: LegacyUiDefinition[]): void {
  const legacyMetadata: LegacyUiDefinition = { ...ui, sections: [] };

  ui.tabs.forEach((tab) => {
    const tabPath = `${path}/${tab.name}`;
    const tabSections = ui.sections.filter((section) => section.page === tab.id);

    saveLegacySections(tabSections, tabPath, legacyMetadata);
  });

  metadataArray.push(legacyMetadata);
}

function saveLegacySectionFiles(section: LegacySection, dir: string, metadata: LegacyUiDefinition): void {
  const sectionMeta = { ...section };

  if (section.script) {
    const fileName = `${section.label}.js`;
    writeFileSafe(dir, fileName, fromBase64(section.script));
    delete sectionMeta.script;
    sectionMeta.scriptUrl = `${dir}/${fileName}`;
  }
  if (section.styles) {
    const fileName = `${section.label}.css`;
    writeFileSafe(dir, fileName, fromBase64(section.styles));
    delete sectionMeta.styles;
    sectionMeta.scriptUrl = `${dir}/${fileName}`;
  }
  if (section.template) {
    const fileName = `${section.label}.html`;
    writeFileSafe(dir, fileName, fromBase64(section.template));
    delete sectionMeta.template;
    sectionMeta.templateUrl = `${dir}/${fileName}`;
  }
  if (section.properties) {
    const fileName = `${section.label}.json`;
    writeFileSafe(dir, fileName, JSON.stringify(section.properties, null, 2));
    delete sectionMeta.properties;
    sectionMeta.propertiesUrl = `${dir}/${fileName}`;
  }

  metadata.sections.push(sectionMeta);
}

function saveUiDefinition(ui: UiDefinition, path: string): void {
  const { children, ...rest } = ui;

  // save elements recursively
  const childrenNames = children.reduce((acc, child) => {
    const elName = saveElement(child, path);
    return elName ? [...acc, elName] : acc;
  }, [] as string[]);

  // create UI Definition metadata
  const metadata: UiMetadata = {
    ...rest,
    children: childrenNames,
  };
  writeFileSafe(path, 'metadata.json', JSON.stringify(metadata, null, 2) + '\n');
}

function saveElement(el: UiElement, path: string): string | undefined {
  // name is located in the Angular decorator which is the part of the element script
  const script = el.script && fromBase64(el.script);
  if (!script) {
    return;
  }

  const elName = extractElementMetadata(script).name;
  const elDir = `${path}/${elName}`;

  if (!existsSync(elDir)) {
    mkdirSync(elDir, { recursive: true });
  }

  writeFileSafe(elDir, 'script.ts', script);

  if (el.styles) {
    writeFileSafe(elDir, 'styles.css', fromBase64(el.styles));
  }
  if (el.template) {
    writeFileSafe(elDir, 'template.html', fromBase64(el.template));
  }

  el.children.forEach((c) => saveElement(c, elDir));

  return elName;
}
