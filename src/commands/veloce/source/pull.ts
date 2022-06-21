/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import { gunzipSync } from 'zlib';
import * as os from 'os';
import { existsSync, mkdirSync } from 'node:fs'
import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import {
  LegacySection,
  LegacyUiDefinition,
  UiDef,
  UiDefinition,
  UiElement,
  UiMetadata
} from '../../../shared/types/ui.types';
import { writeFileSafe } from '../../../shared/utils/common.utils';
import { extractElementMetadata, fromBase64, isLegacyDefinition } from '../../../shared/utils/ui.utils';
import { ProductModel } from '../../../shared/types/product-model.types';
import { MemberType, MembersMap } from '../../../shared/types/pull.types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('veloce-sfdx-v3', 'source-pull');

export default class Pull extends SfdxCommand {
  public static description = messages.getMessage('commandDescription');

  public static examples = messages.getMessage('examples').split(os.EOL);

  public static args = [];

  // -u quick-guide
  // -m model:Octa
  // -p ./source/templates

  protected static flagsConfig = {
    // flag with a value (-m, --members=VALUE)
    members: flags.string({
      char: 'm',
      description: messages.getMessage('membersFlagDescription'),
    }),
    sourcepath: flags.string({
      char: 'p',
      description: messages.getMessage('sourcepathFlagDescription'),
    }),
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  private sourcepath: string;
  private membersMap: MembersMap;

  public async run(): Promise<AnyJson> {
    this.sourcepath = ((this.flags.sourcepath || 'source') as string).replace(/\/$/, ''); // trim last slash if present
    this.membersMap = this.getMembersMap();

    const productModels: ProductModel[] = await this.fetchProductModels();
    if (!productModels.length) {
      return {};
    }

    this.writeProductModelJsons(productModels);
    await this.fetchPml(productModels);
    await this.fetchUiDefinitions(productModels);

    this.ux.log('Done.');

    // Return an object to be displayed with --json
    return {'pms': productModels.length};
  }

  private writeProductModelJsons(productModels: ProductModel[]): void {
    productModels.forEach(({Id, Name, VELOCPQ__ContentId__c, VELOCPQ__Version__c, VELOCPQ__ReferenceId__c}) => {
      const productModelJson = JSON.stringify({
        Id,
        Name,
        VELOCPQ__ContentId__c,
        VELOCPQ__Version__c,
        VELOCPQ__ReferenceId__c,
      }, null, '  ');
      const dir = `${this.sourcepath}/${Name}`;
      writeFileSafe(dir, `${Name}.json`, productModelJson, {flag: 'w+'});
    });
  }

  private async fetchProductModels(): Promise<ProductModel[] | undefined> {
    const modelNames: string[] = [this.membersMap[MemberType.pml], this.membersMap[MemberType.ui]]
      .filter(Boolean)
      .flat()
      .map(({modelName}) => modelName as string);

    const conn = this.org?.getConnection()
    if (!conn) {
      return
    }

    let query = 'Select Id,Name,VELOCPQ__ContentId__c,VELOCPQ__Version__c,VELOCPQ__ReferenceId__c,VELOCPQ__UiDefinitionsId__c from VELOCPQ__ProductModel__c';
    if (modelNames.length) {
      query += ` WHERE Name IN ('${modelNames.join("','")}')`;
    }

    this.ux.log(`Dumping models with names: ${modelNames.length ? modelNames.join() : 'All'}`);
    const result = await conn.query<ProductModel>(query);
    this.ux.log(`Product models result count: ${result?.totalSize}`);

    return result?.records ?? [];
  }

  private getMembersMap(): MembersMap {
    // -m config-ui:Cato:Default\ UI,pml:Cato
    const members = (this.flags.members || '') as string;
    const membersMap: MembersMap = members
      .split(',')
      .map(member => member.split(':'))
      .reduce((acc, [memberType, modelName, defName]) => {
        if (acc[memberType]) {
          acc[memberType] = [];
        }
        (acc[memberType] as any[]).push({
          modelName,
          defName
        });
        return acc;
      }, {} as MembersMap);

    return membersMap;
  }

  private async fetchPml(productModels: ProductModel[]): Promise<void> {
    const membersPml: any[] = this.membersMap[MemberType.pml] ?? [];
    const modelNames = membersPml.map(({modelName}) => modelName as string);
    const productModelsPml: ProductModel[] = this.flags.members ? productModels.filter(({Name}) => modelNames.includes(Name)) : [...productModels];

    const contents = await Promise.all(productModelsPml.map(productModel => Promise.all([
      Promise.resolve(productModel),
      this.getDocumentAttachment(productModel.VELOCPQ__ContentId__c)
    ])));

    contents.forEach(([{Name}, pml]) => {
      const dir = `${this.sourcepath}/${Name}`;
      writeFileSafe(dir, `${Name}.pml`, pml, {flag: 'w+'})
    })
  }

  private async getDocumentAttachment(documentId: string): Promise<string> {
    const url = await this.getDocumentAttachmentUrl(documentId)
    return (url && await this.getDocumentAttachmentContent(url)) || ''
  }

  private async getDocumentAttachmentUrl(documentId: string): Promise<string | undefined> {
    const conn = this.org?.getConnection()
    if (!conn) {
      return
    }

    const query = `Select Body from Document WHERE Id='${documentId}'`

    this.ux.log(`Dumping Document with id: ${documentId}`);
    const result = await conn.query<{ Body: string }>(query)
    const [record] = result?.records ?? []

    if (!record) {
      throw new SfdxError(`Document not found: ${documentId}`)
    }

    return record.Body
  }

  private async getDocumentAttachmentContent(url: string): Promise<string | undefined> {
    const conn = this.org?.getConnection();
    if (!conn) {
      return;
    }

    this.ux.log(`Dumping Attachment with url: ${url}`);
    const res = await conn.request({url});

    const gzipped = Buffer.from(res.toString(), 'base64');
    return gunzipSync(gzipped).toString();
  }

  private saveLegacySectionFiles(section: LegacySection, dir: string, metadata: LegacyUiDefinition): void {
    const sectionMeta = {...section};

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

  private saveLegacySections(sections: LegacySection[], path: string, metadata: LegacyUiDefinition, parentId?: string): void {
    const firstChildren = sections.filter(s => s.parentId === parentId)

    firstChildren.forEach(c => {
      const childPath = `${path}/${c.label}`

      // save files
      this.saveLegacySectionFiles(c, childPath, metadata)

      // save grandchildren
      this.saveLegacySections(sections, childPath, metadata, c.id)
    })
  }

  private saveLegacyUiDefinition(ui: LegacyUiDefinition, path: string, metadataArray: LegacyUiDefinition[]): void {
    const legacyMetadata: LegacyUiDefinition = {...ui, sections: []}

    ui.tabs.forEach(tab => {
      const tabPath = `${path}/${tab.name}`
      const tabSections = ui.sections.filter(section => section.page === tab.id)

      this.saveLegacySections(tabSections, tabPath, legacyMetadata)
    })

    metadataArray.push(legacyMetadata)
  }

  private saveElement(el: UiElement, path: string): string | undefined {
    // name is located in the Angular decorator which is the part of the element script
    const script = el.script && fromBase64(el.script)
    if (!script) {
      return
    }

    const elName = extractElementMetadata(script).name
    const elDir = `${path}/${elName}`

    if (!existsSync(elDir)) {
      mkdirSync(elDir, {recursive: true})
    }

    writeFileSafe(elDir, 'script.ts', script)

    if (el.styles) {
      writeFileSafe(elDir, 'styles.css', fromBase64(el.styles))
    }
    if (el.template) {
      writeFileSafe(elDir, 'template.html', fromBase64(el.template))
    }

    el.children.forEach(c => this.saveElement(c, elDir))

    return elName
  }

  private saveUiDefinition(ui: UiDefinition, path: string): void {
    const {children, ...rest} = ui

    // save elements recursively
    const childrenNames = children.reduce((acc, child) => {
      const elName = this.saveElement(child, path)
      return elName ? [...acc, elName] : acc
    }, [] as string[])

    // create UI Definition metadata
    const metadata: UiMetadata = {
      ...rest,
      children: childrenNames
    }
    writeFileSafe(path, 'metadata.json', JSON.stringify(metadata, null, 2) + '\n')
  }

  private async fetchUiDefinitions(productModels: ProductModel[]): Promise<void> {
    const membersUi: any[] = this.membersMap[MemberType.ui] ?? [];
    const modelNames: string[] = membersUi.map(({modelName}) => modelName as string);
    const productModelsUiDef: ProductModel[] = this.flags.members ? productModels.filter(({Name}) => modelNames.includes(Name)) : [...productModels];

    const contents = await Promise.all(productModelsUiDef.map(productModel => Promise.all([
      Promise.resolve(productModel),
      this.getDocumentAttachment(productModel.VELOCPQ__UiDefinitionsId__c)
    ])));

    contents.forEach(([{Name}, content]) => {
      let uiDefs: UiDef[] = [];
      try {
        uiDefs = JSON.parse(content) as UiDef[];
      } catch (err) {
        this.ux.log(`Failed to parse document content: ${Name}`);
        return;
      }

      const path = `${this.sourcepath}/${Name}`;

      // legacy ui definitions metadata is stored in global metadata.json as array
      const legacyMetadataArray: LegacyUiDefinition[] = []

      uiDefs?.forEach(ui => {
        const includeUiName = !this.flags.members || membersUi.some(({modelName, defName}) => modelName === Name && (!defName || defName === ui.name))
        if (!includeUiName) {
          return;
        }

        const uiDir = `${path}/${ui.name}`

        if (isLegacyDefinition(ui)) {
          this.saveLegacyUiDefinition(ui, uiDir, legacyMetadataArray)
        } else {
          this.saveUiDefinition(ui, uiDir)
        }
      })

      if (legacyMetadataArray.length) {
        writeFileSafe(path, 'metadata.json', JSON.stringify(legacyMetadataArray, null, 2))
      }
    })

  }
}
