import { existsSync, readFileSync } from 'fs';
import { Connection } from '@salesforce/core';
import { IdMapJson } from '../common/idmap.json';
import {
  LegacyUiDefinition,
  SfUIDefinition,
  UiDef,
  UiDefinition,
  UiElement,
  UiElementMetadata,
  UiMetadata,
} from '../types/ui.types';
import { getDirectoryNames, readFileSafe } from './common.utils';

const METADATA_DECORATOR_REGEX = /@ElementDefinition\(([\s\S]+)\)(\n|\r\n|.)*export class/g;

export const isLegacyDefinition = (uiDefinition: UiDef): uiDefinition is LegacyUiDefinition => {
  return !(uiDefinition as UiDefinition).version;
};

export const fromBase64 = (data: string): string => {
  return Buffer.from(data, 'base64').toString('utf8');
};

export const toBase64 = (data: string): string => {
  return Buffer.from(data, 'utf8').toString('base64');
};

export const extractElementMetadata = (script: string): UiElementMetadata => {
  const metadataString = (METADATA_DECORATOR_REGEX.exec(script) ?? [])[1];

  // need to reset regex last index to prevent null result for next execution
  METADATA_DECORATOR_REGEX.lastIndex = 0;

  return eval(`(${metadataString})`) as UiElementMetadata;
};

export async function fetchUiDefinitions(
  conn: Connection,
  modelId: string,
  modelVersion: string | undefined,
): Promise<SfUIDefinition[]> {
  const query = `SELECT Id, Name, VELOCPQ__ModelId__c, VELOCPQ__Default__c, VELOCPQ__SourceBlob__c, VELOCPQ__SourceDocumentId__c, VELOCPQ__ModelVersion__c, VELOCPQ__ReferenceId__c FROM VELOCPQ__UiDefinition__c WHERE VELOCPQ__ModelId__c='${modelId}' AND VELOCPQ__ModelVersion__c=${modelVersion}`;
  const result = await conn.autoFetchQuery<SfUIDefinition>(query, { autoFetch: true, maxFetch: 100000 });
  return result?.records ?? [];
}

export class UiDefinitionsBuilder {
  private sfUiDefinitions: SfUIDefinition[] = [];

  public constructor(private dir: string, private modelName: string, private idmap?: IdMapJson) {}

  public getSfUiDefinitions(): SfUIDefinition[] {
    return this.sfUiDefinitions;
  }

  public pack(): UiDef[] {
    const dir = `${this.dir}/${this.modelName}`;
    return [...this.packUiDefinitions(dir), ...this.packLegacyUiDefinitions(dir)];
  }

  private packUiDefinitions(dir: string): UiDefinition[] {
    const folders = getDirectoryNames(`${dir}`);

    const uiDefinitions: UiDefinition[] = folders.reduce((acc, folder) => {
      const mainDir = `${dir}/${folder}`;
      const sourceDir = `${mainDir}/src`;
      const metadataString = readFileSafe(`${mainDir}/metadata.json`);
      const sfMetadataString = readFileSafe(`${mainDir}/sfMetadata.json`);

      if (!metadataString) {
        return acc;
      }

      if (sfMetadataString) {
        try {
          const sfMetadata = JSON.parse(sfMetadataString ?? {}) as SfUIDefinition | SfUIDefinition[];
          if (sfMetadata instanceof Array) {
            this.sfUiDefinitions.push(...sfMetadata);
          } else {
            this.sfUiDefinitions.push(sfMetadata);
          }
        } catch (e) {
          console.log(`Failed to parse sfMetadata.json file for UI ${folder}`, e);
        }
      }

      const metadata: UiMetadata = JSON.parse(metadataString);
      if (metadata.properties?.priceList) {
        metadata.properties.priceList = this.mapId(metadata.properties?.priceList);
      }
      const { children, ...rest } = metadata;

      const uiDefinition: UiDefinition = {
        ...rest,
        children: children.map((childName) => this.packUiElement(`${sourceDir}/${childName}`)),
      };

      return [...acc, uiDefinition];
    }, [] as UiDefinition[]);

    return uiDefinitions;
  }

  private packUiElement(dir: string): UiElement {
    const script = readFileSafe(`${dir}/script.ts`);
    const metadata = extractElementMetadata(script);
    if (!metadata) {
      throw new Error(`Cannot read element metadata "${dir}"`);
    }

    const element: UiElement = {
      script: toBase64(script),
      children: metadata.children?.map((childName) => this.packUiElement(`${dir}/${childName}`)) ?? [],
    };

    const styles = readFileSafe(`${dir}/styles.css`);
    if (styles) {
      element.styles = toBase64(styles);
    }

    const template = readFileSafe(`${dir}/template.html`);
    if (template) {
      element.template = toBase64(template);
    }

    return element;
  }

  private packLegacyUiDefinitions(dir: string): LegacyUiDefinition[] {
    const isExistingFile = existsSync(`${dir}/metadata.json`);

    if (!isExistingFile) {
      return [];
    }

    const metadataString = readFileSync(`${dir}/metadata.json`, 'utf-8');
    const legacyDefinitions: LegacyUiDefinition[] = JSON.parse(metadataString);

    for (const ui of legacyDefinitions) {
      ui.priceList = ui.priceList && this.mapId(ui.priceList);

      for (const section of ui.sections) {
        if (section.templateUrl) {
          const p = `${dir}/${section.templateUrl.trim()}`;
          this.assertPath(p);
          const b = readFileSync(p);
          const base64 = b.toString('base64');
          section.template = base64;
          delete section.templateUrl;
        }
        if (section.scriptUrl) {
          const p = `${dir}/${section.scriptUrl.trim()}`;
          this.assertPath(p);
          const b = readFileSync(p);
          const base64 = b.toString('base64');
          section.script = base64;
          delete section.scriptUrl;
        }
        if (section.stylesUrl) {
          const p = `${dir}/${section.stylesUrl.trim()}`;
          this.assertPath(p);
          const b = readFileSync(p);
          const base64 = b.toString('base64');
          section.styles = base64;
          delete section.stylesUrl;
        }
        if (section.propertiesUrl) {
          const p = `${dir}/${section.propertiesUrl.trim()}`;
          this.assertPath(p);
          section.properties = this.parseJsonFile(p);
          delete section.propertiesUrl;
        }
      }
    }

    return legacyDefinitions;
  }

  private assertPath(p: string): void {
    for (const part of p.split('/')) {
      if (part.startsWith(' ') || part.endsWith(' ') || part.startsWith('\t') || part.endsWith('\t')) {
        console.log(`Path has leading trailing/leading spaces, please remove and rename folder: ${p}`);
        process.exit(255);
      }
    }
  }

  private parseJsonFile(p: string): any {
    try {
      const b = readFileSync(p).toString();
      return JSON.parse(b);
    } catch (e: any) {
      console.log('Failed to read/parse JSON file ', e);
      process.exit(255);
    }
  }

  private mapId(id: string): string {
    const newId = this.idmap?.get(id);

    if (newId) {
      console.log(`IDMAP: ${id} => ${newId}`);
      return newId;
    }

    console.log(`IDMAP: Id ${id} was not replaced!`);
    return id;
  }
}
