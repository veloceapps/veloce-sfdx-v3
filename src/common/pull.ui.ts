import { existsSync, mkdirSync } from 'fs';
import { writeFileSafe } from '../utils/common.utils';
import {
  LegacySection,
  LegacyUiDefinition,
  SfUIDefinition,
  UiDefinitionContainerDto,
  UiDef,
  UiDefinition,
  UiElement,
  UiMetadata,
} from '../types/ui.types';
import { extractElementMetadata, fetchUiDefinitions, fromBase64, isLegacyDefinition } from '../utils/ui.utils';
import { ProductModel } from '../types/productModel.types';
import { fetchProductModels } from '../utils/productModel.utils';
import { fetchDocumentContent } from '../utils/document.utils';
import { CommandParams } from '../types/command.types';
import { getContext } from '../utils/context';

export async function pullUI(params: CommandParams): Promise<string[]> {
  const { rootPath, conn, member } = params;
  if (!member) {
    return [];
  }
  const modelNames = member.all ? undefined : Array.from(member.names).map((ui) => ui.split(':')[0]);

  console.log(
    `Pulling All Uis for ${
      member.all ? 'All Product models' : 'Product models with names: ' + (modelNames?.join() ?? '')
    }`,
  );
  const uiDefProductModels: ProductModel[] = await fetchProductModels(conn, member.all, modelNames);

  Array.from(member.names).forEach((ui) => {
    const [modelName, uiDefName] = ui.split(':');
    if (uiDefName) {
      console.log(
        `Pull for separate UI Definition '${uiDefName}' is not supported. Pulling All UI Definitions for '${modelName}'.`,
      );
    }
  });

  const modelsWithContents: { productModel: ProductModel; uiDefs: UiDefinitionContainerDto[] }[] = await Promise.all(
    uiDefProductModels.map((productModel) =>
      fetchUiDefinitions(conn, productModel.Id, productModel.VELOCPQ__Version__c).then(async (uiDefinitions) => ({
        uiDefs: await Promise.all(
          uiDefinitions
            .map(async (sfUiDef) => {
              const content = await fetchDocumentContent(conn, sfUiDef.VELOCPQ__SourceDocumentId__c);
              try {
                const uiDef = { ...JSON.parse(content ?? '') } as UiDef;
                const priceList = (uiDef as UiDefinition).properties?.priceList;
                if (priceList) {
                  const ctx = getContext();
                  const localId = ctx.idmap?.reverseGet(priceList);
                  if (localId) {
                    console.log(`IDMAP: ${priceList} => ${localId}`);
                    (uiDef as UiDefinition).properties!.priceList = localId;
                  }
                }
                return {
                  uiDef,
                  sfMetadata: sfUiDef,
                } as UiDefinitionContainerDto;
              } catch (err) {
                console.log(`Failed to parse document content: ${productModel.Name}`);
                return;
              }
            })
            .filter(async (uiDef) => (await uiDef) !== undefined)
            .map(async (uiDef) => (await uiDef) as UiDefinitionContainerDto),
        ),
        productModel,
      })),
    ),
  );

  modelsWithContents.forEach(({ productModel, uiDefs }) => {
    const { Name } = productModel;
    const path = `${rootPath}/config-ui/${Name}`;

    // legacy ui definitions metadata is stored in global metadata.json as array
    const legacyMetadataArray: LegacyUiDefinition[] = [];
    const legacySfMetadataArray: SfUIDefinition[] = [];

    if (uiDefs.length) {
      console.log(`Pulling Uis result: ${uiDefs.length} UI Definition(s) for ${Name} model`);
    }

    uiDefs?.forEach((container) => {
      if (isLegacyDefinition(container.uiDef)) {
        saveLegacyUiDefinition(container.uiDef, path, container.uiDef.name, legacyMetadataArray);
        legacySfMetadataArray.push(container.sfMetadata);
      } else {
        const uiDir = `${path}/${container.uiDef.name}`;
        saveUiDefinition(container.sfMetadata, container.uiDef, uiDir);
      }
    });

    if (legacyMetadataArray.length) {
      writeFileSafe(path, 'metadata.json', JSON.stringify(legacyMetadataArray, null, 2));
      writeFileSafe(path, 'sfMetadata.json', JSON.stringify(legacySfMetadataArray, null, 2));
    }
  });

  return modelsWithContents.flatMap(({ productModel, uiDefs }) => {
    return uiDefs.map((container) => {
      if (isLegacyDefinition(container.uiDef)) {
        return productModel.Id;
      } else {
        return container.sfMetadata.Id as string;
      }
    });
  });
}

function saveLegacySections(
  sections: LegacySection[],
  sourcePath: string,
  path: string,
  metadata: LegacyUiDefinition,
  parentId?: string,
): void {
  const firstChildren = sections.filter((s) => s.parentId === parentId);

  firstChildren.forEach((c) => {
    const childPath = `${path}/${c.label}`;

    // save files
    saveLegacySectionFiles(c, sourcePath, childPath, metadata);

    // save grandchildren
    saveLegacySections(sections, sourcePath, childPath, metadata, c.id);
  });
}

function saveLegacyUiDefinition(
  ui: LegacyUiDefinition,
  sourcePath: string,
  uiName: string,
  metadataArray: LegacyUiDefinition[],
): void {
  const legacyMetadata: LegacyUiDefinition = { ...ui, sections: [] };

  ui.tabs.forEach((tab) => {
    const path = `${uiName}/${tab.name}`;
    const tabSections = ui.sections.filter((section) => section.page === tab.id);

    saveLegacySections(tabSections, sourcePath, path, legacyMetadata);
  });

  metadataArray.push(legacyMetadata);
}

function saveLegacySectionFiles(
  section: LegacySection,
  sourcePath: string,
  path: string,
  metadata: LegacyUiDefinition,
): void {
  const sectionMeta = { ...section };
  const fullDir = `${sourcePath}/${path}`;

  if (section.script) {
    const fileName = `${section.label}.js`;
    writeFileSafe(fullDir, fileName, fromBase64(section.script));
    delete sectionMeta.script;
    sectionMeta.scriptUrl = `${path}/${fileName}`;
  }
  if (section.styles) {
    const fileName = `${section.label}.css`;
    writeFileSafe(fullDir, fileName, fromBase64(section.styles));
    delete sectionMeta.styles;
    sectionMeta.stylesUrl = `${path}/${fileName}`;
  }
  if (section.template) {
    const fileName = `${section.label}.html`;
    writeFileSafe(fullDir, fileName, fromBase64(section.template));
    delete sectionMeta.template;
    sectionMeta.templateUrl = `${path}/${fileName}`;
  }
  if (section.properties) {
    const fileName = `${section.label}.json`;
    writeFileSafe(fullDir, fileName, JSON.stringify(section.properties, null, 2));
    delete sectionMeta.properties;
    sectionMeta.propertiesUrl = `${path}/${fileName}`;
  }

  metadata.sections.push(sectionMeta);
}

function saveUiDefinition(sfUiDef: SfUIDefinition, ui: UiDefinition, path: string): void {
  const { children, ...rest } = ui;

  // save elements recursively
  const childrenNames = children.reduce((acc, child) => {
    const elName = saveElement(child, `${path}/src`);
    return elName ? [...acc, elName] : acc;
  }, [] as string[]);

  // create UI Definition metadata
  const metadata: UiMetadata = {
    ...rest,
    children: childrenNames,
  };
  writeFileSafe(path, 'metadata.json', JSON.stringify(metadata, null, 2) + '\n');
  writeFileSafe(path, 'sfMetadata.json', JSON.stringify(sfUiDef, null, 2) + '\n');
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
