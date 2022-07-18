/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import { existsSync, createWriteStream } from 'node:fs';
import * as os from 'os';
import { WriteStream } from 'fs';
import { flags, SfdxCommand } from '@salesforce/command';
import { Connection, Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { EntityDefinition } from '../../../types/entityDefinition';
import { SalesforceEntity } from '../../../types/salesforceEntity';
import { loadIdMap } from '../../../common/idmap';
//
type CsvWriterPipeFunction = (stream: WriteStream) => void;
type CsvWriterEndFunction = () => void;
type CsvWriterWriteFunction = (o: Record<string, unknown>) => void;
interface CsvWriter {
  pipe: CsvWriterPipeFunction;
  end: CsvWriterEndFunction;
  write: CsvWriterWriteFunction;
}

type CsvWriterFunction = (opts: Record<string, unknown>) => CsvWriter;
const csvWriter: CsvWriterFunction = require('csv-write-stream'); // eslint-disable-line

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('veloce-sfdx-v3', 'data-pull');

interface FieldsResult {
  fields: string[];
  lookupFields: string[];
}

export default class Pull extends SfdxCommand {
  public static description = messages.getMessage('commandDescription');

  public static examples = messages.getMessage('examples').split(os.EOL);

  public static args = [];

  public static defaultIgnoreFields = [
    'CreatedDate',
    'CreatedById',
    'LastModifiedDate',
    'LastModifiedById',
    'SystemModstamp',
    'IsDeleted',
    'IsArchived',
    'LastViewedDate',
    'LastReferencedDate',
    'UserRecordAccessId',
    'OwnerId',
    'VELOCPQ__LatestVersion__c',
  ];

  protected static flagsConfig = {
    where: flags.string({
      char: 'w',
      description: messages.getMessage('whereFlagDescription'),
      required: false,
    }),
    sobjecttype: flags.string({
      char: 's',
      description: messages.getMessage('sobjecttypeFlagDescription'),
      required: true,
    }),
    sourcepath: flags.string({
      char: 'p',
      description: messages.getMessage('sourcepathFlagDescription'),
      required: true,
    }),
    ignorefields: flags.string({
      char: 'o',
      description: messages.getMessage('ignoreFieldsFlagDescription'),
      required: false,
    }),
    idreplacefields: flags.string({
      char: 'R',
      description: messages.getMessage('idreplacefieldsFlagDescription'),
      required: false,
    }),
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  /* eslint complexity: ["error", 25]*/
  public async run(): Promise<AnyJson> {
    if (!this.org) {
      return Promise.reject('Org is not defined');
    }
    if (!existsSync('sfdx-project.json') && this.flags.noproject === false) {
      return Promise.reject('You must have sfdx-project.json while runnign this plugin.');
    }
    const conn = this.org.getConnection();

    const idReplaceFieldsFlag = this.flags.idreplacefields as string;
    const ignoreFieldsFlag = this.flags.ignorefields as string;

    const idReplaceFields = idReplaceFieldsFlag ? idReplaceFieldsFlag?.split(',') : [];

    const match = ignoreFieldsFlag?.match(/(?<appendMode>[+-])?\s*(?<fieldsToIgnore>.*)/);
    const { appendMode, fieldsToIgnore } = match?.groups ?? {};
    let ignoreFields = [];
    if (fieldsToIgnore) {
      const fieldsArray = fieldsToIgnore?.split(',');
      switch (appendMode) {
        case '+':
          ignoreFields = [...Pull.defaultIgnoreFields, ...fieldsArray];
          break;
        case '-':
          ignoreFields = Pull.defaultIgnoreFields.filter((item) => fieldsArray.indexOf(item) < 0);
          break;
        default:
          ignoreFields = fieldsArray;
          break;
      }
    } else {
      ignoreFields = Pull.defaultIgnoreFields;
    }

    const reverseIdmap: { [key: string]: string } = {};
    const idmap = await loadIdMap(conn);
    for (const [key, value] of Object.entries(idmap)) {
      reverseIdmap[value] = key;
    }
    const writer = csvWriter({
      separator: ',',
      newline: '\n',
      headers: undefined,
      sendHeaders: true,
      bom: true,
    });
    writer.pipe(createWriteStream(this.flags.sourcepath as string, { flags: 'w+' }));

    const { fields, lookupFields } = await this.getFields(conn, ignoreFields);
    let query;
    if (this.flags.where) {
      query = `SELECT ${fields.join(',')} FROM ${this.flags.sobjecttype as string} WHERE ${
        this.flags.where as string
      } ORDER BY Name,Id`;
    } else {
      query = `SELECT ${fields.join(',')} FROM ${this.flags.sobjecttype as string} ORDER BY Name,Id`;
    }

    const result = await conn.autoFetchQuery<SalesforceEntity>(query, { autoFetch: true, maxFetch: 100000 });
    this.ux.log(`Query complete with ${result.totalSize} records returned`);
    if (result.totalSize) {
      for (const r of result.records) {
        delete r['attributes'];
        // reverse map Ids
        for (const f of lookupFields) {
          const newId = reverseIdmap[r[f]];
          if (r[f] && newId) {
            // Reverse mapping IDs
            this.ux.log(`${r[f]} => ${newId}`);
            r[f] = newId;
          }
        }
        for (const [key, value] of Object.entries(r)) {
          if (idReplaceFields.includes(key)) {
            let s = value ? value.toString() : '';
            for (const [k, v] of Object.entries(reverseIdmap)) {
              const olds = s;
              s = olds.replaceAll(k, v);
              if (olds !== s) {
                this.ux.log(`CONTENT: ${k} => ${v}`);
              }
            }
            r[key] = s;
          }
        }

        writer.write(r);
      }
    }
    writer.end();
    // Return an object to be displayed with --json
    return {};
  }

  private async getFields(conn: Connection, ignoreFields: string[]): Promise<FieldsResult> {
    const fields = [];
    const lookupFields = [];

    const fieldsResult = await conn.autoFetchQuery<EntityDefinition>(
      `
SELECT EntityDefinition.QualifiedApiName, QualifiedApiName, DataType
FROM FieldDefinition
WHERE EntityDefinition.QualifiedApiName IN ('${this.flags.sobjecttype as string}') ORDER BY QualifiedApiName
    `,
      { autoFetch: true, maxFetch: 50000 },
    );

    for (const f of fieldsResult.records) {
      const apiName = f.QualifiedApiName;
      const datatype = f.DataType;
      if (datatype.includes('Formula') || ignoreFields.includes(apiName)) {
        continue;
      }
      if (datatype.includes('Lookup')) {
        lookupFields.push(apiName);
      }
      fields.push(apiName);
    }
    return {
      fields,
      lookupFields,
    };
  }
}
