import { existsSync, readFileSync } from 'fs';
import { LegacyUiDefinition, UiDef, UiDefinition, UiElement, UiElementMetadata, UiMetadata } from '../types/ui.types';
import { getDirectoryNames, readFileSafe } from './common.utils';

const METADATA_DECORATOR_REGEX = /@ElementDefinition\(([\s\S]+)\)(\n|.)*export class/g;

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

export class UiDefinitionsBuilder {
  public constructor(private dir: string, private modelName: string) {}

  public pack(): UiDef[] {
    const dir = `${this.dir}/${this.modelName}`;
    return [...this.packUiDefinitions(dir), ...this.packLegacyUiDefinitions(dir)];
  }

  private packUiDefinitions(dir: string): UiDefinition[] {
    const folders = getDirectoryNames(dir);

    const uiDefinitions: UiDefinition[] = folders.reduce((acc, folder) => {
      const uiDir = `${dir}/${folder}`;
      const metadataString = readFileSafe(`${uiDir}/metadata.json`);

      if (!metadataString) {
        return acc;
      }

      const metadata: UiMetadata = JSON.parse(metadataString);
      const { children, ...rest } = metadata;

      const uiDefinition: UiDefinition = {
        ...rest,
        children: children.map((childName) => this.packUiElement(`${uiDir}/${childName}`)),
      };

      return [...acc, uiDefinition];
    }, [] as UiDefinition[]);

    return uiDefinitions;
  }

  private packUiElement(dir: string): UiElement {
    const script = readFileSafe(`${dir}/script.ts`);
    const metadata = extractElementMetadata(script);

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
      for (const section of ui.sections) {
        if (section.templateUrl) {
          const p = `${this.dir}/${section.templateUrl.trim()}`;
          this.assertPath(p);
          const b = readFileSync(p);
          const base64 = b.toString('base64');
          section.template = base64;
          delete section.templateUrl;
        }
        if (section.scriptUrl) {
          const p = `${this.dir}/${section.scriptUrl.trim()}`;
          this.assertPath(p);
          const b = readFileSync(p);
          const base64 = b.toString('base64');
          section.script = base64;
          delete section.scriptUrl;
        }
        if (section.stylesUrl) {
          const p = `${this.dir}/${section.stylesUrl.trim()}`;
          this.assertPath(p);
          const b = readFileSync(p);
          const base64 = b.toString('base64');
          section.styles = base64;
          delete section.stylesUrl;
        }
        if (section.propertiesUrl) {
          const p = `${this.dir}/${section.propertiesUrl.trim()}`;
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
}
