import { Connection, SfdxError } from '@salesforce/core';
import { RecordResult } from 'jsforce/record-result';
import { IdMap } from '../types/idmap';

interface ExternalIdMapMdt {
  Key__c: string;
  Value__c: string;
}

export async function loadIdMap(conn: Connection): Promise<IdMap> {
  const result = await conn.autoFetchQuery<ExternalIdMapMdt>('SELECT Key__c,Value__c FROM External_Id_Map__mdt', {
    autoFetch: true,
    maxFetch: 50000,
  });
  if (result.totalSize !== result.records.length) {
    throw new SfdxError(
      `Too few rows fetched from total: ${result.totalSize} and fetched only ${result.records.length}`,
    );
  }
  const idmap: IdMap = {};
  for (const r of result.records) {
    idmap[r.Key__c] = r.Value__c;
  }
  return idmap;
}

const chunkItems = <T>(items: T[]): T[][] =>
  items.reduce((chunks: T[][], item: T, index) => {
    const chunk = Math.floor(index / 48);
    chunks[chunk] = ([] as T[]).concat(chunks[chunk] || [], item);
    return chunks;
  }, []);

export async function saveIdMap(conn: Connection, idmap: IdMap): Promise<void> {
  const chunks = chunkItems(Object.entries(idmap));
  for (const chunk of chunks) {
    const records = chunk.map(([k, v]) => ({ Key__c: k, Value__c: v }));
    const results = (await conn.upsert<ExternalIdMapMdt>('External_Id_Map__mdt', records, 'Key__c')) as RecordResult[];
    for (const r of results) {
      if (!r.success) {
        throw new SfdxError(`Failed to upsert idmap:\n ${r.errors.join('\n')}`);
      }
    }
  }
}
