import { Connection, SfdxError } from '@salesforce/core';
import { RecordResult } from 'jsforce';
import { IdMap } from '../types/idmap';

interface ExternalIdMap {
  VELOCPQ__Key__c: string;
  VELOCPQ__Value__c: string;
}

export async function loadIdMap(conn: Connection): Promise<IdMap> {
  const result = await conn.autoFetchQuery<ExternalIdMap>(
    'SELECT VELOCPQ__Key__c,VELOCPQ__Value__c FROM VELOCPQ__ExternalId_Map__c',
    {
      autoFetch: true,
      maxFetch: 50000,
    },
  );
  if (result.totalSize !== result.records.length) {
    throw new SfdxError(
      `Too few rows fetched from total: ${result.totalSize} and fetched only ${result.records.length}`,
    );
  }
  const idmap: IdMap = {};
  for (const r of result.records) {
    if (r.VELOCPQ__Key__c != null && r.VELOCPQ__Value__c != null) {
      idmap[r.VELOCPQ__Key__c] = r.VELOCPQ__Value__c;
    }
  }
  console.log(`Loaded ID-MAP from environment with ${Object.keys(idmap).length} entries`);
  return idmap;
}

const chunkItems = <T>(items: T[]): T[][] =>
  items.reduce((chunks: T[][], item: T, index) => {
    const chunk = Math.floor(index / 10);
    chunks[chunk] = ([] as T[]).concat(chunks[chunk] || [], item);
    return chunks;
  }, []);

export async function saveIdMap(conn: Connection, idmap: IdMap): Promise<void> {
  console.log(`Saving ID-MAP to environment with ${Object.keys(idmap).length} entries`);
  const chunks = chunkItems(Object.keys(idmap));
  for (const chunk of chunks) {
    const records = [];
    for (const k of chunk) {
      if (k == null) {
        continue;
      }
      records.push({ VELOCPQ__Key__c: k, VELOCPQ__Value__c: idmap[k] });
    }
    const results = (await conn.upsert<ExternalIdMap>(
      'VELOCPQ__ExternalId_Map__c',
      records,
      'VELOCPQ__Key__c',
    )) as RecordResult[];
    for (const r of results) {
      if (!r.success) {
        throw new SfdxError(`Failed to upsert idmap:\n ${JSON.stringify(r.errors, null, '  ')}`);
      }
    }
  }
}
