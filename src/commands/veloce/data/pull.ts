/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import { existsSync, createWriteStream, lstatSync } from 'node:fs';
import * as os from 'os';
import { mkdirSync, WriteStream } from 'fs';
import { flags, SfdxCommand } from '@salesforce/command';
import { Connection, Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { EntityDefinition } from '../../../types/entityDefinition';
import { SalesforceEntity } from '../../../types/salesforceEntity';
import { loadIdMap } from '../../../common/idmap';
import { Member, parseMembers } from '../../../utils/members';
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
    // flag with a value (-m, --members=VALUE)
    members: flags.string({
      char: 'm',
      description: messages.getMessage('membersFlagDescription'),
    }),
    where: flags.string({
      char: 'w',
      description: messages.getMessage('whereFlagDescription'),
      required: false,
    }),
    sobjecttype: flags.string({
      char: 's',
      description: messages.getMessage('sobjecttypeFlagDescription'),
      required: false,
    }),
    sourcepath: flags.string({
      char: 'p',
      description: messages.getMessage('sourcepathFlagDescription'),
      required: false,
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

  /* eslint complexity: ["error", 26]*/
  public async run(): Promise<AnyJson> {
    if (!this.org) {
      return Promise.reject('Org is not defined');
    }
    if (!existsSync('sfdx-project.json') && this.flags.noproject === false) {
      return Promise.reject('You must have sfdx-project.json while runnign this plugin.');
    }
    const conn = this.org.getConnection();

    const rootPath = ((this.flags.sourcepath || 'data') as string).replace(/\/$/, ''); // trim last slash if present

    if (this.flags.members && (this.flags.idreplacefields || this.flags.ignorefields || this.flags.sobjecttype)) {
      throw new SfdxError('-m flag cannot be used with -R -o or -s flags');
    }

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
    let sobjecttype = this.flags.sobjecttype as string;
    let members: Member[] = [];
    let where = this.flags.where;

    let filename = '';
    if (this.flags.members) {
      if (!lstatSync(this.flags.sourcepath).isDirectory()) {
        throw new SfdxError(`${this.flags.sourcepath as string} must be a dir if -m flag is used.`);
      }
      filename = 'VELOCPQ__PriceList__c.csv';
      sobjecttype = 'VELOCPQ__PriceList__c';
      members = parseMembers(this.flags.members);
      where = members[0].all ? '' : `Name IN ('${members.map((m) => m.name).join("','")}')`;
    } else {
      filename = `${this.flags.sobjecttype as string}.csv`;
    }
    this.ux.log(`Pulling data for ${sobjecttype} into ${filename}`);
    const ids = await this.pullData(rootPath, filename, conn, ignoreFields, sobjecttype, where, idReplaceFields);
    if (this.flags.members) {
      this.ux.log(
        `Pulling data for VELOCPQ__PricePlan__c into ${this.flags.sourcepath as string}/VELOCPQ__PricePlan__c.csv`,
      );
      const pricePlanIds = await this.pullData(
        rootPath,
        'VELOCPQ__PricePlan__c.csv',
        conn,
        Pull.defaultIgnoreFields,
        'VELOCPQ__PricePlan__c',
        members[0].all ? '' : `VELOCPQ__PriceListId__c IN ('${ids.join("','")}')`,
        [],
      );
      this.ux.log(
        `Pulling data for VELOCPQ__PricePlanCharge__c into ${
          this.flags.sourcepath as string
        }/VELOCPQ__PricePlanCharge__c.csv`,
      );
      await this.pullData(
        rootPath,
        'VELOCPQ__PricePlanCharge__c.csv',
        conn,
        Pull.defaultIgnoreFields,
        'VELOCPQ__PricePlanCharge__c',
        members[0].all ? '' : `VELOCPQ__PricePlanId__c IN ('${pricePlanIds.join("','")}')`,
        [],
      );
      this.ux.log(
        `Pulling data for VELOCPQ__PlanChargeTier__c into ${
          this.flags.sourcepath as string
        }/VELOCPQ__PlanChargeTier__c.csv`,
      );
      await this.pullData(
        rootPath,
        'VELOCPQ__PlanChargeTier__c.csv',
        conn,
        Pull.defaultIgnoreFields,
        'VELOCPQ__PlanChargeTier__c',
        members[0].all ? '' : `VELOCPQ__PricePlanId__c IN ('${pricePlanIds.join("','")}')`,
        [],
      );
      this.ux.log(
        `Pulling data for VELOCPQ__PlanChargeRamp__c into ${
          this.flags.sourcepath as string
        }/VELOCPQ__PlanChargeRamp__c.csv`,
      );
      await this.pullData(
        rootPath,
        'VELOCPQ__PlanChargeRamp__c.csv',
        conn,
        Pull.defaultIgnoreFields,
        'VELOCPQ__PlanChargeRamp__c',
        members[0].all ? '' : `VELOCPQ__PricePlanId__c IN ('${pricePlanIds.join("','")}')`,
        [],
      );
      this.ux.log(
        `Pulling data for VELOCPQ__RampChargeTier__c into ${
          this.flags.sourcepath as string
        }/VELOCPQ__RampChargeTier__c.csv`,
      );
      await this.pullData(
        rootPath,
        'VELOCPQ__RampChargeTier__c.csv',
        conn,
        Pull.defaultIgnoreFields,
        'VELOCPQ__RampChargeTier__c',
        members[0].all ? '' : `VELOCPQ__PricePlanId__c IN ('${pricePlanIds.join("','")}')`,
        [],
      );
      this.ux.log(
        `Pulling data for VELOCPQ__RampRelatedPrice__c into ${
          this.flags.sourcepath as string
        }/VELOCPQ__RampRelatedPrice__c.csv`,
      );
      await this.pullData(
        rootPath,
        'VELOCPQ__RampRelatedPrice__c.csv',
        conn,
        Pull.defaultIgnoreFields,
        'VELOCPQ__RampRelatedPrice__c',
        members[0].all ? '' : `VELOCPQ__PricePlanId__c IN ('${pricePlanIds.join("','")}')`,
        [],
      );
    }
    // Return an object to be displayed with --json
    return {};
  }

  private async pullData(
    rootPath: string,
    filename: string,
    conn: Connection,
    ignoreFields: string[],
    sobjecttype: string,
    where: string,
    idReplaceFields: string[],
  ): Promise<string[]> {
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
    if (!existsSync(rootPath)) {
      mkdirSync(rootPath, { recursive: true });
    }

    writer.pipe(createWriteStream(`${rootPath}/${filename}`, { flags: 'w+' }));

    const { fields, lookupFields } = await this.getFields(conn, sobjecttype, ignoreFields);
    let query;
    if (where) {
      query = `SELECT ${fields.join(',')} FROM ${sobjecttype} WHERE ${where} ORDER BY Name,Id`;
    } else {
      query = `SELECT ${fields.join(',')} FROM ${sobjecttype} ORDER BY Name,Id`;
    }
    const ids: string[] = [];
    const result = await conn.autoFetchQuery<SalesforceEntity>(query, { autoFetch: true, maxFetch: 100000 });
    this.ux.log(`Query complete with ${result.totalSize} records returned`);
    if (result.totalSize) {
      for (const r of result.records) {
        delete r['attributes'];
        ids.push(r['Id']);
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
    return ids;
  }

  private async getFields(conn: Connection, sobjecttype: string, ignoreFields: string[]): Promise<FieldsResult> {
    const fields = [];
    const lookupFields = [];

    const fieldsResult = await conn.autoFetchQuery<EntityDefinition>(
      `
SELECT EntityDefinition.QualifiedApiName, QualifiedApiName, DataType
FROM FieldDefinition
WHERE EntityDefinition.QualifiedApiName IN ('${sobjecttype}') ORDER BY QualifiedApiName
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
