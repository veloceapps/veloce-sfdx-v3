import { Connection } from '@salesforce/core';
import { parseJsonSafe, writeFileSafe } from '../utils/common.utils';
import { Member } from '../types/member.types';
import { fetchTemplates } from '../utils/docTemplate.utils';
import { fetchContentVersion } from '../utils/contentDocument.utils';
import { Template } from '../types/template.types';
import { IdMap } from '../types/idmap';

export interface PullDocTemplatesParams {
  idmap: IdMap;
  rootPath: string;
  conn: Connection;
  member?: Member;
}

export async function pullDocTemplates(params: PullDocTemplatesParams): Promise<string[]> {
  const { rootPath: sourcepath, conn, member } = params;
  if (!member) {
    return [];
  }

  const rootPath = `${sourcepath}/doc-template`;

  console.log(`Pulling ${member.all ? 'All Templates' : 'Templates with names: ' + member.names.join(',')}`);
  const result: Template[] = await fetchTemplates(conn, member.all, member.names);
  console.log(`Pulling Doc template result count: ${result.length}`);

  const ids: string[] = [];
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
      VELOCPQ__Script__c,
      VELOCPQ__ReferenceId__c,
    } = r;
    const dir = `${rootPath}/${Name}`;
    const propertiesDir = `${dir}/properties`;
    const queriesDir = `${dir}/queries`;

    const properties: { [key: string]: any }[] = VELOCPQ__Properties__c && parseJsonSafe(VELOCPQ__Properties__c);
    const queries: { [key: string]: any }[] = VELOCPQ__Queries__c && parseJsonSafe(VELOCPQ__Queries__c);
    properties?.forEach((p) => {
      writeFileSafe(propertiesDir, `${p['name'] as string}.json`, JSON.stringify(p, null, 2), { flag: 'w+' });
    });
    queries?.forEach((q) => {
      writeFileSafe(queriesDir, `${q['queryName'] as string}.json`, JSON.stringify(q, null, 2), { flag: 'w+' });
    });

    writeFileSafe(dir, 'script.js', VELOCPQ__Script__c ?? '', { flag: 'w+' });

    if (VELOCPQ__FileId__c) {
      const resultContent = await fetchContentVersion(conn, undefined, VELOCPQ__FileId__c);
      const url = resultContent?.VersionData;
      if (url) {
        const res = await conn.request<Buffer>({ url, encoding: null } as any);
        writeFileSafe(dir, VELOCPQ__FileName__c, res, { flag: 'w+' });
      } else {
        console.log(`Document ${VELOCPQ__FileId__c} not found`);
      }
    }

    const json = JSON.stringify(
      {
        Id,
        Name,
        VELOCPQ__Active__c,
        VELOCPQ__Description__c,
        VELOCPQ__ReferenceId__c,
      },
      null,
      '  ',
    );
    writeFileSafe(dir, `${Name}.json`, json, { flag: 'w+' });

    ids.push(Id ?? 'N/A');
  }

  return ids;
}
