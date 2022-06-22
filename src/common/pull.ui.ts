import {Connection} from '@salesforce/core';
import { writeFileSafe } from '../shared/utils/common.utils';
import {
  LegacySection,
  LegacyUiDefinition,
  UiDef,
  UiDefinition,
  UiElement,
  UiMetadata
} from '../shared/types/ui.types';
import { extractElementMetadata, fromBase64, isLegacyDefinition } from '../shared/utils/ui.utils';
import { gunzipSync } from 'zlib';
import { existsSync, mkdirSync } from 'fs';

export async function pullUI(sourcepath: string, conn: Connection, dumpAll: boolean, uisToDump: Set<string>, pmsToDump: Set<string>): Promise<ProductModel[]> {
  const productModelsUiDef: ProductModel[] = await fetchProductModels.bind(this)(conn, dumpAll, uisToDump);
  const uiDefsMap: {[modelName: string]: string;} = Array.from(uisToDump).reduce((acc, ui) => {
    const [modelName, defName] = ui.split(':');
    acc[modelName] = defName;
    return acc;
  }, {});

  const contents = await Promise.all(productModelsUiDef.map(productModel => Promise.all([
    Promise.resolve(productModel),
    getDocumentAttachment.bind(this)(conn, productModel.VELOCPQ__UiDefinitionsId__c)
  ])));

  contents.forEach(([{Name}, content]) => {
    let uiDefs: UiDef[] = [];
    try {
      uiDefs = JSON.parse(content) as UiDef[];
    } catch (err) {
      this.ux.log(`Failed to parse document content: ${Name}`);
      return;
    }

    // mark full PM dump as a dependancy (metadata)
    pmsToDump.add(Name);

    const path = `${sourcepath}/${Name}`;

    // legacy ui definitions metadata is stored in global metadata.json as array
    const legacyMetadataArray: LegacyUiDefinition[] = []

    uiDefs?.forEach(ui => {
      const includeUiName = dumpAll || !uiDefsMap[Name] || uiDefsMap[Name] === ui.name;
      if (!includeUiName) {
        return;
      }

      const uiDir = `${path}/${ui.name}`

      if (isLegacyDefinition(ui)) {
        saveLegacyUiDefinition(ui, uiDir, legacyMetadataArray)
      } else {
        saveUiDefinition(ui, uiDir)
      }
    })

    if (legacyMetadataArray.length) {
      writeFileSafe(path, 'metadata.json', JSON.stringify(legacyMetadataArray, null, 2))
    }
  })

  return productModelsUiDef;
}

function saveLegacySections(sections: LegacySection[], path: string, metadata: LegacyUiDefinition, parentId?: string): void {
  const firstChildren = sections.filter(s => s.parentId === parentId)

  firstChildren.forEach(c => {
    const childPath = `${path}/${c.label}`

    // save files
    saveLegacySectionFiles(c, childPath, metadata)

    // save grandchildren
    saveLegacySections(sections, childPath, metadata, c.id)
  })
}

function saveLegacyUiDefinition(ui: LegacyUiDefinition, path: string, metadataArray: LegacyUiDefinition[]): void {
  const legacyMetadata: LegacyUiDefinition = { ...ui, sections: [] }

  ui.tabs.forEach(tab => {
    const tabPath = `${path}/${tab.name}`
    const tabSections = ui.sections.filter(section => section.page === tab.id)

    saveLegacySections(tabSections, tabPath, legacyMetadata)
  })

  metadataArray.push(legacyMetadata)
}

function saveLegacySectionFiles(section: LegacySection, dir: string, metadata: LegacyUiDefinition): void {
  const sectionMeta = { ...section }

  if (section.script) {
    const fileName = `${section.label}.js`
    writeFileSafe(dir, fileName, fromBase64(section.script))
    delete sectionMeta.script
    sectionMeta.scriptUrl = `${dir}/${fileName}`
  }
  if (section.styles) {
    const fileName = `${section.label}.css`
    writeFileSafe(dir, fileName, fromBase64(section.styles))
    delete sectionMeta.styles
    sectionMeta.scriptUrl = `${dir}/${fileName}`
  }
  if (section.template) {
    const fileName = `${section.label}.html`
    writeFileSafe(dir, fileName, fromBase64(section.template))
    delete sectionMeta.template
    sectionMeta.templateUrl = `${dir}/${fileName}`
  }
  if (section.properties) {
    const fileName = `${section.label}.json`
    writeFileSafe(dir, fileName, JSON.stringify(section.properties, null, 2))
    delete sectionMeta.properties
    sectionMeta.propertiesUrl = `${dir}/${fileName}`
  }

  metadata.sections.push(sectionMeta)
}

function saveUiDefinition(ui: UiDefinition, path: string): void {
  const { children, ...rest } = ui

  // save elements recursively
  const childrenNames = children.reduce((acc, child) => {
    const elName = saveElement(child, path)
    return elName ? [...acc, elName] : acc
  }, [] as string[])

  // create UI Definition metadata
  const metadata: UiMetadata = {
    ...rest,
    children: childrenNames
  }
  writeFileSafe(path, 'metadata.json', JSON.stringify(metadata, null, 2) + '\n')
}

async function getDocumentAttachment(conn: Connection, documentId: string): Promise<string|undefined> {
  const query = `Select Body from Document WHERE Id='${documentId}'`

  const result = await conn.query<{ Body: string }>(query)
  const [record] = result?.records ?? []

  if (!record) {
    this.ux.log(`Document not found: ${documentId}`);
    return;
  }

  const url: string = record?.Body;

  const res = await conn.request({url});

  const gzipped = Buffer.from(res.toString(), 'base64');
  return gunzipSync(gzipped).toString();
}

async function fetchProductModels(conn: Connection, dumpAll: boolean, uisToDump: Set<string>): Promise<ProductModel[]> {
  const modelNames = dumpAll ? undefined : Array.from(uisToDump).map(ui => ui.split(':')[0]);
  let query = 'Select Id,Name,VELOCPQ__ContentId__c,VELOCPQ__Version__c,VELOCPQ__ReferenceId__c,VELOCPQ__UiDefinitionsId__c from VELOCPQ__ProductModel__c';
  if (!dumpAll) {
    query += ` WHERE Name IN ('${modelNames.join("','")}')`;
  }

  this.ux.log(`Dumping ${modelNames?.length ? 'Uis with names:' + modelNames.join() : 'All Uis'}`);
  const result = await conn.query<ProductModel>(query);
  this.ux.log(`Uis result count: ${result?.totalSize}`);

  return result?.records ?? [];
}

function saveElement(el: UiElement, path: string): string | undefined {
  // name is located in the Angular decorator which is the part of the element script
  const script = el.script && fromBase64(el.script)
  if (!script) {
    return
  }

  const elName = extractElementMetadata(script).name
  const elDir = `${path}/${elName}`

  if (!existsSync(elDir)) {
    mkdirSync(elDir, { recursive: true })
  }

  writeFileSafe(elDir, 'script.ts', script)

  if (el.styles) {
    writeFileSafe(elDir, 'styles.css', fromBase64(el.styles))
  }
  if (el.template) {
    writeFileSafe(elDir, 'template.html', fromBase64(el.template))
  }

  el.children.forEach(c => saveElement(c, elDir))

  return elName
}
