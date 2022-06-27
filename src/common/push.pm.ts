import {readdirSync, readFileSync, writeFileSync} from 'node:fs';
import {Connection, SfdxError} from '@salesforce/core';
import { ProductModel } from '../shared/types/productModel.types';

async function getPm(conn: Connection, pm: string): Promise<string | null> {
  // deal with folder
  // Check if veloce folder exists:
  const docResult = await conn.query<ProductModel>(`Select Id, Name
                                                    from VELOCPQ__ProductModel__c
                                                    WHERE Name = '${pm}'`)
  if (docResult.totalSize > 0) {
    return docResult.records[0].Id
  }
  return null
}

async function uploadPM(sourcepath: string, conn: Connection, pmName: string): Promise<string> {
  const meta = JSON.parse(readFileSync(`${sourcepath}/${pmName}.json`).toString()) as { [key: string]: string }
  const pmId = await getPm(conn, pmName)
  let returnId = ''
  if (pmId === null) {
    // inserting new product model from meta
    delete meta['Id']
    await conn.sobject<{ [key: string]: string; }>('VELOCPQ__ProductModel__c').create(meta, {},
      (err, ret) => {
        if (err || !ret.success) {
          throw new SfdxError(`Failed to insert Product Model ${pmName}, error: ${err ? err.toString(): 'no-error'}`)
        }
        // update meta json with new id
        meta['Id'] = ret.id
        returnId = meta['Id']
      })
  } else {
    // updating existing product model from meta
    await conn.sobject<{ [key: string]: string; }>('VELOCPQ__ProductModel__c').update(meta,
      (err, ret) => {
        if (err || !ret.success) {
          throw new SfdxError(`Failed to update Product Model ${pmName}, error: ${err ? err.toString(): 'no-error'}`)
        }
        returnId = meta['Id']
      })
  }
  // Update meta on filesystem
  writeFileSync(`${sourcepath}/${pmName}.json`,
    JSON.stringify(meta, null, '  '), {flag: 'w+'})
  return returnId
}

function findAllPMs(sourcepath: string): Set<string> {
  const result = new Set<string>()
  const filenames = readdirSync(sourcepath);
  filenames.forEach(file => {
    if (file.endsWith('.json')) {
      result.add(file)
    }
  });
  return result
}

export async function pushPM(sourcepath: string, conn: Connection, pushAll: boolean, pmsToUpload: Set<string>): Promise<string[]> {
  const pmIDs: string[] = []
  if (pushAll) {
    console.log('Pushing All PMs')
    pmsToUpload = findAllPMs(sourcepath)
    for (const p of pmsToUpload) {
      pmIDs.push(await uploadPM(sourcepath, conn, p))
    }
  } else if (pmsToUpload.size > 0) {
    // Push some members only
    console.log(`Pushing PMs with names: ${Array.from(pmsToUpload.values()).join(',')}`)
    for (const p of pmsToUpload) {
      pmIDs.push(await uploadPM(sourcepath, conn, p))
    }
  }
  return pmIDs
}
