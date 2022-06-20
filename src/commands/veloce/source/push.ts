/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import * as os from 'os';
import { readFileSync, writeFileSync} from 'node:fs';
import {gzipSync} from 'node:zlib';
import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('veloce-sfdx-v3', 'source-push');

// The type we are querying for
interface Document {
  Id: string;
  Body: string;
  FolderId: string;
}

interface Folder {
  Id: string;
  Name: string;
  DeveloperName: string;
  AccessType: string;
  Type: string;
}

interface CreateResult {
  id: string;
  success: boolean;
  errors: string[];
  name: string;
  message: string;
}

export default class Push extends SfdxCommand {
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

  public async run(): Promise<AnyJson> {
    const members = (this.flags.members || '') as string;
    const sourcepath = ((this.flags.sourcepath || 'source') as string).replace(/\/$/, ''); // trim last slash if present

    let pmlsToUpload = new Set<string>() // PML Documents to upload
    let pmsToUpload = new Set<string>() // PM entities to uplaod

    const membersArray = members.split(',')
    for (const m of membersArray) {
      const parts = m.split(':')
      if (parts[0] === 'pml' && parts[1]) {
        pmlsToUpload.add(parts[1])
      }
    }
    if (members === '') {
      // Oush ALL
      // PML
      this.ux.log('Pushing All PMLs')
      pmlsToUpload = this.findAllPMLs(sourcepath)
      for (const p of pmlsToUpload) {
        await this.uploadPML(sourcepath, p, pmsToUpload)
      }
      this.ux.log('Pushing All PMs')
      pmsToUpload = this.findAllPMs(sourcepath)
      for (const p of pmsToUpload) {
        await this.uploadPM(sourcepath, p)
      }
    } else if (pmlsToUpload.size > 0) {
      // Dump some members only
      this.ux.log(`Pushing PMLs with names: ${Array.from(pmlsToUpload.values()).join(',')}`)
      for (const p of pmlsToUpload) {
        await this.uploadPML(sourcepath, p, pmsToUpload)
      }
      this.ux.log(`Pushing PMLs with names: ${Array.from(pmsToUpload.values()).join(',')}`)
      for (const p of pmsToUpload) {
        await this.uploadPM(sourcepath, p)
      }
    }

    // Return an object to be displayed with --json
    return {'pmls': Array.from(pmlsToUpload.values())};
  }

  private async getOrCreateModelFolderId(): Promise<string> {
    const conn = this.org.getConnection();
    let folderId: string
    // deal with folder
    // Check if veloce folder exists:
    const folderResult = await conn.query<Folder>(`Select Id, Name, Type
                                                   from Folder
                                                   WHERE Name = 'velo_product_models'`)
    if (!folderResult.records || folderResult.records.length <= 0) {
      // Create new Folder
      const folder = {
        Name: 'velo_product_models',
        DeveloperName: 'velo_product_models',
        Type: 'Document',
        AccessType: 'Public'
      } as Folder
      const folderCreateResult = (await conn.sobject('Folder').create(folder)) as CreateResult
      if (folderCreateResult.success) {
        this.ux.log(`New folder created ${folderCreateResult.name} with id ${folderCreateResult.id}`)
      } else {
        throw new SfdxError(`Failed to create folder: ${JSON.stringify(folderCreateResult)}`)
      }
      return folderCreateResult.id
    } else {
      folderId = folderResult.records[0].Id
      this.ux.log(`Use existing folder ${folderResult.records[0].Name} with id ${folderId}`)
      return folderId
    }
  }

  private async documentExists(documentId: string): Promise<boolean> {
    const conn = this.org.getConnection();
    // deal with folder
    // Check if veloce folder exists:
    const docResult = await conn.query<Document>(`Select Id
                                                  from Document
                                                  WHERE Id = '${documentId}'`)
    return docResult.totalSize > 0
  }

  private findAllPMLs(sourcepath: string): Set<string> {
    const result = new Set<string>()
    return result
  }

  private findAllPMs(sourcepath: string): Set<string> {
    const result = new Set<string>()
    return result
  }

  private async uploadPM(sourcepath: string, pmName: string): Promise<void> {
  }

  private async uploadPML(sourcepath: string, pmlName: string, pmToUpload: Set<string>): Promise<void> {
    const conn = this.org.getConnection();
    const pml = readFileSync(`${sourcepath}/${pmlName}.pml`)
    const gzipped = gzipSync(pml)
    // Encode to base64 TWICE!, first time is requirement of POST/PATCH, and it will be decoded on reads automatically by SF.
    const b64Data = Buffer.from(gzipped.toString('base64')).toString('base64')

    const meta = JSON.parse(readFileSync(`${sourcepath}/${pmlName}.pml.json`).toString()) as { [key: string]: string }
    const folderId = this.getOrCreateModelFolderId()
    // attempt to update existing document first
    if (await this.documentExists(meta['VELOCPQ__ContentId__c'])) {
      // update existing document
      this.ux.log(`Updating existing PML document(${pmlName}) with ID: ${meta['VELOCPQ__ContentId__c']}`)
      const data = {
        body: b64Data,
        name: pmlName,
        folderId
      }
      await conn.request({
        url: `/services/data/v${conn.getApiVersion()}/sobjects/Document/${meta['VELOCPQ__ContentId__c']}`,
        body: JSON.stringify(data),
        method: 'PATCH'
      });
    } else {
      // upload new document and link it to ProductModel
      this.ux.log(`Create new PML document(${pmlName})`)
      const data = {
        body: b64Data,
        name: pmlName,
        folderId
      }
      const response = (await conn.request({
        url: `/services/data/v${conn.getApiVersion()}/sobjects/Document`,
        body: JSON.stringify(data),
        method: 'POST'
      })) as CreateResult;
      if (response.success) {
        this.ux.log(`New Document '${pmlName}' created with id ${response.id}`)
      } else {
        throw new SfdxError(`Failed to create document: ${JSON.stringify(response)}`)
      }
      // update meta
      meta['VELOCPQ__ContentId__c'] = response.id
      writeFileSync(`${sourcepath}/${pmlName}.pml.json`,
        JSON.stringify(meta, null, '  '), {flag: 'w+'})
      // mark ProductModel as pending upload
      pmToUpload.add(pmlName)
    }
  }
}
