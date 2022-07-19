import { Connection, SfdxError } from '@salesforce/core';
import { RecordResult } from 'jsforce/record-result';
import { IdMap } from '../types/idmap';

interface ExternalIdMapMdt {
  Name: string;
  VELOCPQ__Value__c: string;
}

export async function loadIdMap(conn: Connection): Promise<IdMap> {
  const result = await conn.autoFetchQuery<ExternalIdMapMdt>(
    'SELECT Name,VELOCPQ__Value__c FROM VELOCPQ__External_Id_Map__mdt',
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
    idmap[r.Name] = r.VELOCPQ__Value__c;
  }
  console.log(`Loaded ID-MAP from environment with ${Object.entries(idmap).length} entries`);
  return idmap;
}

const chunkItems = <T>(items: T[]): T[][] =>
  items.reduce((chunks: T[][], item: T, index) => {
    const chunk = Math.floor(index / 48);
    chunks[chunk] = ([] as T[]).concat(chunks[chunk] || [], item);
    return chunks;
  }, []);

export async function saveIdMap(conn: Connection, idmap: IdMap): Promise<void> {
  console.log(`Saving ID-MAP to environment with ${Object.entries(idmap).length} entries`);
  const chunks = chunkItems(Object.entries(idmap));
  for (const chunk of chunks) {
    const records = chunk.map(([k, v]) => ({ Name: k, VELOCPQ__Value__c: v }));
    const results = (await conn.upsert<ExternalIdMapMdt>(
      'VELOCPQ__External_Id_Map__mdt',
      records,
      'Name',
    )) as RecordResult[];
    for (const r of results) {
      if (!r.success) {
        throw new SfdxError(`Failed to upsert idmap:\n ${JSON.stringify(r.errors, null, '  ')}`);
      }
    }
  }
}
