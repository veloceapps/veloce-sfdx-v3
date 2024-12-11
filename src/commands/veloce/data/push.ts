/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import { existsSync, readFileSync } from 'node:fs';
import * as os from 'os';
import { parse } from 'csv-parse/sync';
import { flags, SfdxCommand } from '@salesforce/command';
import { Connection, Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { ExecuteService } from '@salesforce/apex-node';
import { QueryResult } from 'jsforce';
import { Tooling } from '@salesforce/core/lib/connection';
import { ExecuteAnonymousResponse } from '@salesforce/apex-node/lib/src/execute/types';
import { IdMap } from '../../../types/idmap';
import { SalesforceEntity } from '../../../types/salesforceEntity';
import { keysToLowerCase, validSFID } from '../../../utils/common.utils';
import { loadIdMap, saveIdMap } from '../../../common/idmap';
import { Member, parseMembers } from '../../../utils/members';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

interface ExecuteScriptResult {
  output: string;
  ok: boolean;
}

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('veloce-sfdx-v3', 'data-push');

export default class Push extends SfdxCommand {
  public static description = messages.getMessage('commandDescription');

  public static examples = messages.getMessage('examples').split(os.EOL);

  public static args = [];

  public static defaultIgnoreFields = [
    'CreatedDate'.toLowerCase(),
    'CreatedById'.toLowerCase(),
    'LastModifiedDate'.toLowerCase(),
    'LastModifiedById'.toLowerCase(),
    'SystemModstamp'.toLowerCase(),
    'IsDeleted'.toLowerCase(),
    'IsArchived'.toLowerCase(),
    'LastViewedDate'.toLowerCase(),
    'LastReferencedDate'.toLowerCase(),
    'UserRecordAccessId'.toLowerCase(),
    'OwnerId'.toLowerCase(),
  ];

  protected static flagsConfig = {
    members: flags.string({
      char: 'm',
      description: messages.getMessage('membersFlagDescription'),
    }),
    sourcepath: flags.string({
      char: 'p',
      description: messages.getMessage('sourcepathFlagDescription'),
    }),
    noproject: flags.boolean({
      char: 'P',
      description: messages.getMessage('noprojectFlagDescription'),
    }),
    sobjecttype: flags.string({
      char: 's',
      description: messages.getMessage('sobjecttypeFlagDescription'),
      required: false,
    }),
    externalid: flags.string({
      char: 'e',
      description: messages.getMessage('externalidFlagDescription'),
      required: false,
    }),
    idreplacefields: flags.string({
      char: 'R',
      description: messages.getMessage('idreplacefieldsFlagDescription'),
      required: false,
    }),
    printids: flags.boolean({
      char: 'P',
      description: messages.getMessage('printidsFlagDescription'),
      required: false,
    }),
    upsert: flags.boolean({ char: 'U', description: messages.getMessage('upsertFlagDescription'), required: false }),
    dry: flags.boolean({ char: 'd', description: messages.getMessage('dryFlagDescription'), required: false }),
    diff: flags.boolean({ char: 'D', description: messages.getMessage('diffFlagDescription'), required: false }),
    ignorefields: flags.string({ char: 'o', description: messages.getMessage('ignoreFieldsFlagDescription') }),
    batch: flags.string({ char: 'b', description: messages.getMessage('batchFlagDescription') }),
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  /* eslint complexity: ["error", 65]*/
  public async run(): Promise<AnyJson> {
    if (!this.org) {
      return Promise.reject('Org is not defined');
    }
    if (!existsSync('sfdx-project.json') && this.flags.noproject === false) {
      return Promise.reject('You must have sfdx-project.json while runnign this plugin.');
    }

    const conn = this.org.getConnection();

    const batchSize = parseInt(this.flags.batch || '5', 10);
    let sType = this.flags.sobjecttype ? (this.flags.sobjecttype as string).toLowerCase() : '';
    const extIdParam = this.flags.externalid as string;
    const extId = extIdParam ? extIdParam.toLowerCase() : 'VELOCPQ__ReferenceId__c'.toLowerCase();
    const idReplaceFieldsParam = this.flags.idreplacefields as string;
    const idReplaceFields = idReplaceFieldsParam ? idReplaceFieldsParam.toLowerCase().split(',') : [];
    const ignoreFieldsParam = this.flags.ignorefields as string;
    let upsert = this.flags.upsert || false;
    const dry = this.flags.dry || false;
    const diff = this.flags.diff || true;
    const rootPath = ((this.flags.sourcepath || 'data') as string).replace(/\/$/, ''); // trim last slash if present

    if (
      this.flags.members &&
      (this.flags.idreplacefields || this.flags.ignorefields || this.flags.sobjecttype || this.flags.upsert)
    ) {
      throw new SfdxError('-m flag cannot be used with -R -o --upsert or -s flags');
    }
    if (this.flags.members) {
      upsert = true;
    }

    const match = ignoreFieldsParam?.match(/(?<appendMode>[+-])?\s*(?<fieldsToIgnore>.*)/);
    const { appendMode, fieldsToIgnore } = match?.groups ?? {};
    let ignoreFields: string[];
    if (fieldsToIgnore) {
      const fieldsArray = fieldsToIgnore?.toLocaleString().split(',');
      switch (appendMode) {
        case '+':
          ignoreFields = [...Push.defaultIgnoreFields, ...fieldsArray];
          break;
        case '-':
          ignoreFields = Push.defaultIgnoreFields.filter((item) => fieldsArray.indexOf(item) < 0);
          break;
        default:
          ignoreFields = fieldsArray;
          break;
      }
    } else {
      ignoreFields = Push.defaultIgnoreFields;
    }

    if (!ignoreFields.includes('id')) {
      ignoreFields.push('id');
    }
    if (!ignoreFields.includes(extId) && !upsert) {
      ignoreFields.push(extId);
    }

    let members: Member[] = [];
    let filename = '';
    if (this.flags.members) {
      filename = 'VELOCPQ__PriceList__c.csv';
      sType = 'VELOCPQ__PriceList__c'.toLowerCase();
      members = parseMembers(this.flags.members);
    } else {
      filename = `${this.flags.sobjecttype as string}.csv`;
    }
    this.ux.log(`Pushing data ${rootPath}/${filename} to ${sType}`);
    const ids = await this.PushData(
      rootPath,
      filename,
      conn,
      diff,
      sType,
      ignoreFields,
      members.length > 0 ? 'id' : null,
      members.map((m) => m.name),
      extId,
      batchSize,
      idReplaceFields,
      upsert,
      dry,
      this.flags.printids,
    );

    if (members.length > 0) {
      this.ux.log(`Pushing data ${rootPath}/VELOCPQ__PricePlan__c.csv to VELOCPQ__PricePlan__c`);
      const priceListIds = await this.PushData(
        rootPath,
        'VELOCPQ__PricePlan__c.csv',
        conn,
        diff,
        'VELOCPQ__PricePlan__c',
        ignoreFields,
        'VELOCPQ__PriceListId__c',
        ids,
        extId,
        batchSize,
        idReplaceFields,
        upsert,
        dry,
        this.flags.printids,
      );

      this.ux.log(`Pushing data ${rootPath}/VELOCPQ__PricePlanCharge__c.csv to VELOCPQ__PricePlanCharge__c`);
      await this.PushData(
        rootPath,
        'VELOCPQ__PricePlanCharge__c.csv',
        conn,
        diff,
        'VELOCPQ__PricePlanCharge__c',
        ignoreFields,
        'VELOCPQ__PricePlanId__c',
        priceListIds,
        extId,
        batchSize,
        idReplaceFields,
        upsert,
        dry,
        this.flags.printids,
      );

      this.ux.log(`Pushing data ${rootPath}/VELOCPQ__PlanChargeTier__c.csv to VELOCPQ__PlanChargeTier__c`);
      await this.PushData(
        rootPath,
        'VELOCPQ__PlanChargeTier__c.csv',
        conn,
        diff,
        'VELOCPQ__PlanChargeTier__c',
        ignoreFields.concat(['name']),
        'VELOCPQ__PricePlanId__c',
        priceListIds,
        extId,
        batchSize,
        idReplaceFields,
        upsert,
        dry,
        this.flags.printids,
      );

      this.ux.log(`Pushing data ${rootPath}/VELOCPQ__PlanChargeRamp__c.csv to VELOCPQ__PlanChargeRamp__c`);
      await this.PushData(
        rootPath,
        'VELOCPQ__PlanChargeRamp__c.csv',
        conn,
        diff,
        'VELOCPQ__PlanChargeRamp__c',
        ignoreFields,
        'VELOCPQ__PricePlanId__c',
        priceListIds,
        extId,
        batchSize,
        idReplaceFields,
        upsert,
        dry,
        this.flags.printids,
      );

      this.ux.log(`Pushing data ${rootPath}/VELOCPQ__RampChargeTier__c.csv to VELOCPQ__RampChargeTier__c`);
      await this.PushData(
        rootPath,
        'VELOCPQ__RampChargeTier__c.csv',
        conn,
        diff,
        'VELOCPQ__RampChargeTier__c',
        ignoreFields,
        'VELOCPQ__PricePlanId__c',
        priceListIds,
        extId,
        batchSize,
        idReplaceFields,
        upsert,
        dry,
        this.flags.printids,
      );

      this.ux.log(`Pushing data ${rootPath}/VELOCPQ__RampRelatedPrice__c.csv to VELOCPQ__RampRelatedPrice__c`);
      await this.PushData(
        rootPath,
        'VELOCPQ__RampRelatedPrice__c.csv',
        conn,
        diff,
        'VELOCPQ__RampRelatedPrice__c',
        ignoreFields,
        'VELOCPQ__PricePlanId__c',
        priceListIds,
        extId,
        batchSize,
        idReplaceFields,
        upsert,
        dry,
        this.flags.printids,
      );
    }
    // Return an object to be displayed with --json
    return { orgId: this.org.getOrgId() };
  }

  private hasChanges(
    idmap: IdMap,
    ignorefields: string[],
    extId: string,
    oldObj: SalesforceEntity,
    obj: SalesforceEntity,
  ): 'NEW' | 'CHANGE' | 'UNCHANGED' {
    for (const k of Object.keys(obj)) {
      if (!k) {
        continue;
      }
      if (ignorefields.includes(k)) {
        continue;
      }
      if (k === 'id') {
        continue;
      }
      if (!oldObj) {
        return 'NEW';
      }
      let o = obj[k];
      if (k !== extId && idmap[obj[k]]) {
        o = idmap[obj[k]];
      }
      if ('' + oldObj[k] !== '' + o && !(oldObj[k] === null && o === '')) {
        return 'CHANGE';
      }
    }
    return 'UNCHANGED';
  }

  private printChanges(
    idmap: IdMap,
    ignorefields: string[],
    extId: string,
    oldObj: SalesforceEntity,
    obj: SalesforceEntity,
  ): void {
    for (const k of Object.keys(obj)) {
      if (k === 'id') {
        continue;
      }
      if (ignorefields.includes(k)) {
        continue;
      }
      if (!k) {
        continue;
      }
      if (!oldObj) {
        this.ux.log(`  ${k}: ${('' + obj[k]).length > 512 ? '...' : obj[k]}`);
        continue;
      }
      let o = obj[k];
      if (k !== extId && idmap[obj[k]]) {
        o = idmap[obj[k]];
      }
      if ('' + oldObj[k] !== '' + o && !(oldObj[k] === null && o === '')) {
        this.ux.log(
          `  ${k}: ${oldObj[k] === undefined ? '' : ('' + oldObj[k]).length > 512 ? '...' : oldObj[k]} => ${
            ('' + o).length > 512 ? '...' : o
          }`,
        );
      }
    }
  }

  private async getOldRecords(
    conn: Connection,
    keys: string[],
    sType: string,
    extIdField: string,
    ids: string[],
  ): Promise<{ [key: string]: SalesforceEntity }> {
    const extId2OldValues: { [key: string]: SalesforceEntity } = {};
    // Query back Ids
    const query = `SELECT ${keys.join(',')}
                   FROM ${sType}
                   WHERE ${extIdField} in ('${ids.join("','")}')`;

    const queryResult: QueryResult<SalesforceEntity> = await this.runSoqlQuery(conn, query);

    if (!queryResult.done) {
      throw new SfdxError(`Query not done: ${query}`, 'ApexError');
    }
    queryResult.records.forEach((rWithCase: any) => {
      const r = keysToLowerCase(rWithCase);
      extId2OldValues[r[extIdField]] = r;
    });
    return extId2OldValues;
  }

  private async getIds(
    conn: Connection,
    sType: string,
    extIdField: string,
    ids: string[],
  ): Promise<{ [key: string]: string }> {
    const extId2OldValues: { [key: string]: string } = {};
    // Query back Ids
    const query = `SELECT Id,${extIdField}
                   FROM ${sType}
                   WHERE ${extIdField} in ('${ids.join("','")}')`;

    const queryResult: QueryResult<SalesforceEntity> = await this.runSoqlQuery(conn, query);

    if (!queryResult.done) {
      throw new SfdxError(`Query not done: ${query}`, 'ApexError');
    }
    queryResult.records.forEach((rWithCase: any) => {
      const r = keysToLowerCase(rWithCase);
      extId2OldValues[r[extIdField]] = r['id'];
    });
    return extId2OldValues;
  }

  private async runSoqlQuery(connection: Connection | Tooling, query: string): Promise<QueryResult<SalesforceEntity>> {
    console.debug('running query');

    const result = await connection.autoFetchQuery<SalesforceEntity>(query, { autoFetch: true, maxFetch: 50000 });
    console.debug(`Query complete with ${result.totalSize} records returned`);
    if (result.totalSize) {
      console.debug('fetching columns for query');
    }
    // remove nextRecordsUrl and force done to true
    delete result.nextRecordsUrl;
    result.done = true;
    return result;
  }

  private async PushData(
    rootPath: string,
    filename: string,
    conn: Connection,
    diff: boolean,
    sType: string,
    ignoreFields: string[],
    onlyField: string | null,
    onlyFieldValues: string[],
    extId: string,
    batchSize: number,
    idReplaceFields: string[],
    upsert: boolean,
    dry: boolean,
    printids: boolean,
  ): Promise<string[]> {
    let ok = true;
    let output = '';
    const outputIds: string[] = [];

    const boolfields = [];
    const datefields = [];
    const numericfields = [];

    const fileContent = readFileSync(`${rootPath}/${filename}`);
    let idmap = await loadIdMap(conn);
    // retrieve types of args
    const fieldsResult = await conn.autoFetchQuery<SalesforceEntity>(
      `
      SELECT EntityDefinition.QualifiedApiName, QualifiedApiName, ValueTypeId, IsCalculated
      FROM FieldDefinition
      WHERE EntityDefinition.QualifiedApiName IN ('${sType}')
      ORDER BY QualifiedApiName
    `,
      { autoFetch: true, maxFetch: 50000 },
    );

    for (const f of fieldsResult.records) {
      const apiName = f['QualifiedApiName'].toLowerCase();

      const valueTypeId = f['ValueTypeId'];
      const isCalculated = f['IsCalculated'];

      if (isCalculated === 'true') {
        ignoreFields.push(apiName);
      } else if (valueTypeId === 'boolean') {
        boolfields.push(apiName);
      } else if (valueTypeId === 'double' || valueTypeId === 'integer') {
        numericfields.push(apiName);
      } else if (valueTypeId === 'datetime' || valueTypeId === 'date') {
        datefields.push(apiName);
      }
    }

    const records: SalesforceEntity[] = parse(fileContent, { columns: true, bom: true });

    if (records.length > 128 && !diff) {
      this.ux.log('Turning off Auto-Diff mode because too much data, use --diff to force it ON');
      diff = false;
    }

    let hasFailedExtIds = false;
    const seenExtIds: string[] = [];

    records.forEach((rWithCase) => {
      const r = keysToLowerCase(rWithCase);
      if (onlyField && !onlyFieldValues.includes(r[onlyField])) {
        return;
      }
      outputIds.push(r['id']);

      if (r[extId] && seenExtIds.includes(r[extId])) {
        this.ux.log(
          `${r['id']}: Duplicated Value ${r[extId]} for key ${extId}, External IDs MUST be unique across the file`,
        );
        hasFailedExtIds = true;
      }
      // Fail if id's are empty
      if (!r[extId]) {
        this.ux.log(`${r['id']}: ${extId} is empty please populate with some truly unique ID and proceed`);
        hasFailedExtIds = true;
      } else {
        seenExtIds.push(r[extId]);
      }
    });
    if (hasFailedExtIds) {
      throw new SfdxError(`Failed because at least one ${extId} (duplicate or empty)`);
    }

    let currentBatch = 0;
    let batch = records.slice(batchSize * currentBatch, batchSize * (currentBatch + 1));
    while (batch.length > 0) {
      this.ux.log(`batch#${currentBatch} size: ${batch.length}`);
      const ids: string[] = [];
      let extId2OldOrgValues: { [key: string]: SalesforceEntity } = {};

      batch.forEach((rWithCase) => {
        const r = keysToLowerCase(rWithCase);
        ids.push(r[extId]);
      });
      let script = '';
      let objects = '';
      const idsToValidate = new Set<string>();
      let keys: string[] = [];
      for (const rWithCase of batch) {
        const r = keysToLowerCase(rWithCase);

        const fields = [];
        const currentKeys: string[] = [];
        for (const [k, value] of Object.entries(r)) {
          let s = '' + value;
          if (ignoreFields.includes(k)) {
            continue;
          }

          if (!currentKeys.includes(k)) {
            currentKeys.push(k);
          }
          keys = currentKeys;

          if (idReplaceFields.includes(k)) {
            for (const [key, v] of Object.entries(idmap)) {
              const olds = s;
              s = olds.replaceAll(key, v);
              if (olds !== s) {
                this.ux.log(`CONTENT: ${key} => ${v}`);
              }
            }
          }
          const m = idmap[s];
          if (k !== extId && m) {
            // dont map ExternalID column!
            s = m;
          }
          if (s === '') {
            fields.push(`${upsert ? '' : 'o.'}${k}=null`);
          } else if (boolfields.includes(k)) {
            if (s === '1') {
              fields.push(`${upsert ? '' : 'o.'}${k}=true`);
            } else if (s === '0') {
              fields.push(`${upsert ? '' : 'o.'}${k}=false`);
            } else {
              fields.push(`${upsert ? '' : 'o.'}${k}=${s}`);
            }
          } else if (datefields.includes(k)) {
            fields.push(`${upsert ? '' : 'o.'}${k}=date.valueOf('${s}')`);
          } else if (numericfields.includes(k)) {
            fields.push(`${upsert ? '' : 'o.'}${k}=${s}`);
          } else {
            if (k !== extId && validSFID(s)) {
              idsToValidate.add(s);
            }
            fields.push(
              `${upsert ? '' : 'o.'}${k}='${s
                .replaceAll('\\', '\\\\')
                .replaceAll("'", "\\'")
                .replaceAll('\n', '\\n')
                .replaceAll('\r', '\\r')}'`,
            );
          }
        }

        if (upsert) {
          objects += `o.add(new ${sType} (${fields.join(',')}));\n`;
        } else {
          if (printids) {
            this.ux.log(`ID: ${extId} = ${r[extId]}`);
          }
          objects += `o = [SELECT Id FROM ${sType} WHERE ${extId}='${r[extId]}' LIMIT 1];\n`;
          objects += `${fields.join(';')};\n`;
          objects += 'update o;\n';
        }
      }

      extId2OldOrgValues = diff ? await this.getOldRecords(conn, keys, sType, extId, ids) : {};
      script = '';
      if (upsert) {
        for (const vid of idsToValidate) {
          script += `Database.query('SELECT Id FROM '+((Id)'${vid}').getsobjecttype()+' WHERE Id = \\'${vid}\\'');\n`;
        }
        script += `
${sType} [] o = new List<${sType}>();
${objects}
upsert o ${extId};
`;
      } else {
        for (const vid of idsToValidate) {
          script += `Database.query('SELECT Id FROM '+((Id)'${vid}').getsobjecttype()+' WHERE Id = \\'${vid}\\');\n`;
        }
        // Update only mode!
        script = `
${sType} o;
${objects}
`;
      }

      if (!dry) {
        const { ok: execOk, output: execOutput } = await this.executeScript(conn, script, sType);
        if (!execOk) {
          ok = false;
        }
        output += execOutput;
      } else {
        this.ux.log('No Data Updated, because running in DRY mode');
      }

      idmap = await this.updateIds(conn, batch, diff, sType, extId, ids, ignoreFields, extId2OldOrgValues, idmap);

      currentBatch++;
      // next batch
      batch = records.slice(batchSize * currentBatch, batchSize * (currentBatch + 1));
    }

    if (!dry) {
      await saveIdMap(conn, idmap);
    } else {
      this.ux.log('Skipping saving ID-MAP because in dry mode');
    }

    if (!ok) {
      throw new SfdxError(output, 'ApexError');
    }
    this.ux.log('Data successfully loaded');
    return outputIds;
  }

  private formatDefault(response: ExecuteAnonymousResponse): string {
    let outputText = '';
    if (response.success) {
      outputText += 'SUCCESS\n';
      outputText += `\n${response.logs}`;
    } else {
      const diagnostic = response.diagnostic ? response.diagnostic[0] : null;
      if (!response.compiled) {
        outputText += `Error: Line: ${diagnostic ? diagnostic.lineNumber : ''}, Column: ${
          diagnostic ? diagnostic.columnNumber : ''
        }\n`;
        outputText += `Error: ${diagnostic ? diagnostic.compileProblem : ''}\n`;
      } else {
        outputText += 'COMPILE SUCCESS\n';
        outputText += `Error: ${diagnostic ? diagnostic.exceptionMessage : ''}\n`;
        outputText += `Error: ${diagnostic ? diagnostic.exceptionStackTrace : ''}\n`;
        outputText += `\n${response.logs}`;
      }
    }
    return outputText;
  }

  private remapErrorOutput(entity: string, output: string): string {
    let lastReferenceId = '';
    const referenceIdLogPrefix = 'Execute Anonymous: o = [SELECT Id FROM';
    const noRowsForAssignmentLogPart = 'System.QueryException: List has no rows for assignment to SObject';

    let newOutput = '';
    for (const l of output.split('\n')) {
      // Execute Anonymous: o = [SELECT Id FROM velocpq__productmodel__c WHERE velocpq__referenceid__c='3f261fa60d7116f25c' LIMIT 1];
      if (l.includes(referenceIdLogPrefix)) {
        const parts = l.split("'");
        if (parts.length >= 3) {
          lastReferenceId = parts[1];
        }
      } else if (l.includes(noRowsForAssignmentLogPart)) {
        const replaced = l.replaceAll(
          noRowsForAssignmentLogPart,
          `“Unable to update "${entity}" record, no record with reference Id "${lastReferenceId}" found“. Try push with --upsert flag`,
        );
        newOutput += replaced;
      } else {
        newOutput += l;
      }
      newOutput += '\n';
    }
    return newOutput;
  }

  private async executeScript(conn: Connection, script: string, entity: string): Promise<ExecuteScriptResult> {
    const exec = new ExecuteService(conn);
    const execAnonOptions = Object.assign({}, { apexCode: script });
    const result = await exec.executeAnonymous(execAnonOptions);
    let ok = true;
    let output = '';
    if (!result.success) {
      ok = false;
      const out = this.formatDefault(result);
      this.ux.log(out);
      output += `${out}\n`;
      this.ux.log('Executed Script START');
      this.ux.log(script);
      this.ux.log('Executed Script END');
      output += `${out}\n`;
    }
    return { ok, output: this.remapErrorOutput(entity, output) };
  }

  private async updateIds(
    conn: Connection,
    batch: SalesforceEntity[],
    diff: boolean,
    sType: string,
    extId: string,
    ids: string[],
    ignoreFields: string[],
    extId2OldOrgValues: { [key: string]: SalesforceEntity },
    idmap: IdMap,
  ): Promise<IdMap> {
    // Query back Ids
    const newIds = await this.getIds(conn, sType, extId, ids);
    batch.forEach((rWithCase) => {
      const r = keysToLowerCase(rWithCase);
      let changeType: string;
      let oldOrgValue: SalesforceEntity = {};
      if (diff) {
        oldOrgValue = extId2OldOrgValues[r[extId]];
        changeType = this.hasChanges(idmap, ignoreFields, extId, oldOrgValue, r);
      } else {
        changeType = '';
      }

      if (r['id'] && newIds[r[extId]]) {
        this.ux.log(`${r['id']} => ${newIds[r[extId]]} <${changeType}>`);
        if (r['id'] !== newIds[r[extId]]) {
          idmap[r['id']] = newIds[r[extId]];
        }
      } else {
        this.ux.log(
          `${r['id'] ? r['id'] : 'MISSING'} => ${
            newIds[r[extId]] ? newIds[r[extId]] : '??????????????????'
          } <${changeType}>`,
        );
      }
      if (diff) {
        this.printChanges(idmap, ignoreFields, extId, oldOrgValue, r);
      }
    });
    return idmap;
  }
}
