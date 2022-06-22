import {existsSync, mkdirSync, writeFileSync} from 'node:fs';
import {gunzipSync} from 'zlib';
import {Connection, SfdxError} from '@salesforce/core';
import { ProductModel } from './entities/productModel';
import { SfdxCommandV } from '../shared/types/common.types';

interface Document {
  Body: string;
}
interface PmlReturn {
  pmlRecords: ProductModel[];
  pmlPmsToDump: Set<string>;
}

export const pullPml = (ctx: SfdxCommandV) => async (sourcepath: string, conn: Connection, dumpAll: boolean, pmlsToDump: Set<string>): Promise<PmlReturn> => {
  const pmlPmsToDump = new Set<string>()

  // Handling of PML
  let pmlQuery: string
  if (dumpAll) {
    // Dump ALL PML
    pmlQuery = 'Select Id,Name,VELOCPQ__ContentId__c from VELOCPQ__ProductModel__c';
    console.log('Dumping All PMLs')
  } else if (pmlsToDump.size > 0) {
    // Dump some members only
    pmlQuery = `Select Id, Name, VELOCPQ__ContentId__c
                from VELOCPQ__ProductModel__c
                WHERE Name IN ('${Array.from(pmlsToDump.values()).join("','")}')`;
    console.log(`Dumping PMLs with names: ${Array.from(pmlsToDump.values()).join(',')}`)
  }
  // PML Handlings
  const pmlResult = await conn.query<ProductModel>(pmlQuery);
  console.log(`PMLs result count: ${pmlResult.totalSize}`)
  for (const r of pmlResult.records) {
    //
    if (!existsSync(sourcepath)) {
      mkdirSync(sourcepath, {recursive: true})
    }
    writeFileSync(`${sourcepath}/${r.Name}.pml`,
      await documentContent(conn, r.VELOCPQ__ContentId__c), {flag: 'w+'})
    // mark full PM dump as a dependancy (metadata)
    pmlPmsToDump.add(r.Name)
  }
  return {
    pmlRecords: pmlResult.records,
    pmlPmsToDump
  }
}

async function documentContent(conn: Connection, documentId: string): Promise<string> {
  const query = `Select Body
                 from Document
                 WHERE Id = '${documentId}'`
  // Query the org
  const result = await conn.query<Document>(query)
  if (!result.records || result.records.length <= 0) {
    throw new SfdxError('Document not found')
  }
  // Document body always only returns one result
  const url = result.records[0].Body
  const res = (await conn.request({url}));
  const gzipped = Buffer.from(res.toString(), 'base64')
  return gunzipSync(gzipped).toString()
}

