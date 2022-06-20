/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import * as os from 'os';
import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { gunzipSync } from 'zlib';
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
import { existsSync } from 'fs';

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
    name: flags.string({
      char: 'n',
      description: messages.getMessage('nameFlagDescription'),
      required: true
    }),
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  private sourcepath: string;

  public async run(): Promise<AnyJson> {
    const conn = this.org.getConnection();
    const members = (this.flags.members || '') as string;
    this.sourcepath = ((this.flags.sourcepath || 'source') as string).replace(/\/$/, ''); // trim last slash if present

    const pmls: string[] = []
    const membersArray = members.split(',')
    for(const m of membersArray) {
      const parts = m.split(':')
      if (parts[0] === 'pml' && parts[1]) {
        pmls.push(parts[1])
      }
    }
    interface ProductModel {
      [key: string]: string;
    }
    let pmlQuery: string
    if (members === '') {
      // Dump ALL
      // PML
      pmlQuery = 'Select Id,Name,VELOCPQ__ContentId__c,VELOCPQ__Version__c from VELOCPQ__ProductModel__c';
      this.ux.log('Dumping All PMLs')
    } else if (pmls.length > 0) {
      // Dump some members only
      pmlQuery = `Select Id,Name,VELOCPQ__ContentId__c,VELOCPQ__Version__c from VELOCPQ__ProductModel__c WHERE Name IN ('${pmls.join("','")}')`;
      this.ux.log(`Dumping PMLs with names: ${pmls.join(',')}`)
    }

    // Query the org
    const pmlResult = await conn.query<ProductModel>(pmlQuery);
    this.ux.log(`PMLs result count: ${pmlResult.totalSize}`)
    for (const r of pmlResult.records) {
      mkdirSync(this.sourcepath)
      writeFileSync(`${this.sourcepath}/${r.Name}.pml.json`, JSON.stringify({
        Id: r.Id,
        Name: r.Name,
        /* eslint-disable camelcase */ VELOCPQ__ContentId__c: r.VELOCPQ__ContentId__c,
        /* eslint-disable camelcase */ VELOCPQ__Version__c: r.VELOCPQ__Version__c,
      }, null, '  '),{flag: 'w+'})
      writeFileSync(`${this.sourcepath}/${r.Name}.pml`, r.VELOCPQ__ContentId__c,{flag: 'w+'})
    }
    // Return an object to be displayed with --json
    return { 'pmls': pmlResult.records };
  }

  private async getDocumentId(modelName: string): Promise<string | undefined> {
    const conn = this.org?.getConnection()
    if (!conn) {
      return
    }

    const query = `Select VELOCPQ__UiDefinitionsId__c from VELOCPQ__ProductModel__c WHERE Name='${modelName}'`

    const result = await conn.query<{ 'VELOCPQ__UiDefinitionsId__c': string }>(query)
    const [record] = result?.records ?? []

    if (!record) {
      throw new SfdxError(`Product Model not found: ${modelName}`)
    }

    return record.VELOCPQ__UiDefinitionsId__c
  }

  private async getDocumentAttachmentUrl(documentId: string): Promise<string | undefined> {
    const conn = this.org?.getConnection()
    if (!conn) {
      return
    }

    const query = `Select Body from Document WHERE Id='${documentId}'`

    const result = await conn.query<{ Body: string }>(query)
    const [record] = result?.records ?? []

    if (!record) {
      throw new SfdxError(`Document not found: ${documentId}`)
    }

    return record.Body
  }

  private async getDocumentAttachmentContent(url: string): Promise<UiDef[] | undefined> {
    const conn = this.org?.getConnection();
    if (!conn) {
      return;
    }

    const res = await conn.request({ url });
    const gzipped = Buffer.from(res.toString(), 'base64');
    const data = gunzipSync(gzipped).toString();

    try {
      return JSON.parse(data) as UiDef[];
    } catch (err) {
      this.ux.log(`Failed to parse document content: ${url}`);
      return [];
    }
  }

  private saveLegacySectionFiles(section: LegacySection, dir: string, metadata: LegacyUiDefinition): void {
    const sectionMeta = { ...section };

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
    const legacyMetadata: LegacyUiDefinition = { ...ui, sections: [] }

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
      mkdirSync(elDir, { recursive: true })
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
    const { children, ...rest } = ui

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

  private async fetchUiDefinitions(): Promise<UiDef[]|undefined> {
    const modelName: string = this.flags.name;
    const documentId: string = await this.getDocumentId(modelName);
    if (!documentId) {
      return;
    }
    const url: string = await this.getDocumentAttachmentUrl(documentId);
    if (!url) {
      return;
    }
    const uiDefs: UiDef[] = await this.getDocumentAttachmentContent(url);

    const path = `${this.sourcepath}/${modelName}`;

    // legacy ui definitions metadata is stored in global metadata.json as array
    const legacyMetadataArray: LegacyUiDefinition[] = []

    uiDefs?.forEach(ui => {
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
  }
}
