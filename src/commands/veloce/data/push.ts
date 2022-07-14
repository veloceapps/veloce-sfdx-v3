/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import { existsSync, readFileSync } from 'node:fs';
import * as os from 'os';
import * as parse from 'csv-parse/lib/sync';
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
      required: true,
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

    let ok = true;
    let output = '';
    const batchSize = parseInt(this.flags.batch || '5', 10);
    const sType = (this.flags.sobjecttype as string).toLowerCase();
    const extIdParam = this.flags.externalid as string;
    const extId = extIdParam ? extIdParam.toLowerCase() : 'VELOCPQ__ReferenceId__c'.toLowerCase();
    const idReplaceFieldsParam = this.flags.idreplacefields as string;
    const idReplaceFields = idReplaceFieldsParam ? idReplaceFieldsParam.toLowerCase().split(',') : [];
    const ignoreFieldsParam = this.flags.ignorefields as string;
    const upsert = this.flags.upsert || false;
    const dry = this.flags.dry || false;
    let diff = this.flags.diff || true;

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

    const boolfields = [];
    const datefields = [];
    const numericfields = [];

    const fileContent = readFileSync(this.flags.sourcepath);
    let idmap = await loadIdMap(conn);

    // retrieve types of args
    const fieldsResult = await conn.autoFetchQuery<SalesforceEntity>(
      `
      SELECT EntityDefinition.QualifiedApiName, QualifiedApiName, DataType
      FROM FieldDefinition
      WHERE EntityDefinition.QualifiedApiName IN ('${this.flags.sobjecttype as string}')
      ORDER BY QualifiedApiName
    `,
      { autoFetch: true, maxFetch: 50000 },
    );

    for (const f of fieldsResult.records) {
      const apiName = f['QualifiedApiName'].toLowerCase();
      const datatype = f['DataType'];
      if (datatype.includes('Formula')) {
        ignoreFields.push(apiName);
      } else if (datatype.includes('Checkbox')) {
        boolfields.push(apiName);
      } else if (datatype.includes('Number') || datatype.includes('Percent') || datatype.includes('Currency')) {
        numericfields.push(apiName);
      } else if (datatype.includes('Date')) {
        datefields.push(apiName);
      }
    }

    const records: SalesforceEntity[] = parse(fileContent, { columns: true, bom: true });

    if (records.length > 128 && !this.flags.diff) {
      this.ux.log('Turning off Auto-Diff mode because too much data, use --diff to force it ON');
      diff = false;
    }

    let hasFailedExtIds = false;
    const seenExtIds: string[] = [];

    records.forEach((rWithCase) => {
      const r = keysToLowerCase(rWithCase);

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
          if (this.flags.printids) {
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
        const { ok: execOk, output: execOutput } = await this.executeScript(conn, script);
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
      this.ux.log(`Skipping saving ID-MAP because in dry mode`);
    }

    if (!ok) {
      throw new SfdxError(output, 'ApexError');
    }
    this.ux.log('Data successfully loaded');
    // Return an object to be displayed with --json
    return { orgId: this.org.getOrgId() };
  }

  public hasChanges(
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

  public printChanges(
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

  public async getOldRecords(
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

  public async getIds(
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

  public async runSoqlQuery(connection: Connection | Tooling, query: string): Promise<QueryResult<SalesforceEntity>> {
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

  private async executeScript(conn: Connection, script: string): Promise<ExecuteScriptResult> {
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
    return { ok, output };
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
