import { Connection } from '@salesforce/core';
import { parseJsonSafe, writeFileSafe } from '../utils/common.utils';
import { Member } from '../types/member.types';
import { Template } from '../types/template.types';

export interface PullDocTemplatesParams {
  sourcepath: string;
  conn: Connection;
  member?: Member;
}


export async function pullDocTemplates(params: PullDocTemplatesParams): Promise<string[]> {
  const {sourcepath, conn, member} = params;
  if (!member) {
    return [];
  }

  const rootPath = `${sourcepath}/doc-template`;

  let query = `Select Id,Name,VELOCPQ__FileId__c,VELOCPQ__Active__c,VELOCPQ__Description__c,VELOCPQ__FileName__c,VELOCPQ__Properties__c,VELOCPQ__Queries__c,VELOCPQ__Script__c from VELOCPQ__Template__c`;
  if (!member.all) {
    query += ` WHERE Name IN ('${member.names.join("','")}')`;
  }
  console.log(`Pulling ${member.all ? 'All Templates' : 'Templates with names: ' + member.names.join(',')}`);
  const result: Template[] = (await conn.autoFetchQuery(query, {autoFetch: true, maxFetch: 100000}))?.records ?? [];
  console.log(`Pulling Doc template result count: ${result.length}`);

  const ids = [];
  for (const r of result) {
    const {
      Id,
      Name,
      VELOCPQ__FileId__c,
      VELOCPQ__Active__c,
      VELOCPQ__Description__c,
      VELOCPQ__FileName__c,
      VELOCPQ__Properties__c,
      VELOCPQ__Queries__c,
      VELOCPQ__Script__c
    } = r;
    const dir = `${rootPath}/${Name}`;
    const propertiesDir = `${dir}/properties`;
    const queriesDir = `${dir}/queries`;

    const properties = parseJsonSafe(VELOCPQ__Properties__c) ?? [];
    const queries = parseJsonSafe(VELOCPQ__Queries__c) ?? [];
    properties.forEach((p) => {
      writeFileSafe(propertiesDir, `${p.name}.json`, JSON.stringify(p, null, 2), {flag: 'w+'});
    });
    queries.forEach((q) => {
      writeFileSafe(queriesDir, `${q.queryName}.json`, JSON.stringify(q, null, 2), {flag: 'w+'});
    });

    writeFileSafe(dir, 'script.js', VELOCPQ__Script__c ?? '', {flag: 'w+'});

    if (VELOCPQ__FileId__c) {
      const query = `Select VersionData from ContentVersion WHERE IsLatest = true AND ContentDocumentId='${VELOCPQ__FileId__c}'`;
      const result = await conn.query(query);
      if (!result.records.length) {
        console.log(`Document ${VELOCPQ__FileId__c} not found`);
        continue;
      }
      const url = result.records[0].VersionData;
      const res = await conn.request({url, encoding: null}) as Buffer;
      writeFileSafe(dir, VELOCPQ__FileName__c, res, {flag: 'w+'});
    }

    const json = JSON.stringify(
      {
        Id,
        Name,
        VELOCPQ__Active__c,
        VELOCPQ__Description__c
      },
      null,
      '  ',
    );
    writeFileSafe(dir, `${Name}.json`, json, {flag: 'w+'});

    ids.push(Id);
  }

  return ids;
}
