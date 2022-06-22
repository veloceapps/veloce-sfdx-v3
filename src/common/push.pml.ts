import {readdirSync, readFileSync, writeFileSync} from 'node:fs';
import {gzipSync} from 'node:zlib';
import {Connection, SfdxError} from '@salesforce/core';

interface PmlReturn {
  pmlRecords: string[];
  pmlPmsToUpload: Set<string>;
}

async function documentExists(conn: Connection, documentId: string): Promise<boolean> {
  // deal with folder
  // Check if veloce folder exists:
  const docResult = await conn.query<Document>(`Select Id
                                                  from Document
                                                  WHERE Id = '${documentId}'`)
  return docResult.totalSize > 0
}

async function getOrCreateModelFolderId(conn: Connection): Promise<string> {
  let folderId: string
// deal with folder
// Check if veloce folder exists:
  const folderResult = await conn.query<Folder>(`Select Id, Name, Type
                                                 from Folder
                                                 WHERE Name = 'velo_product_models'`)
  if (!folderResult.records || folderResult.records.length <= 0) {
    // Create new Folder
    const folder = {
      Name: 'velo_product_models',
      DeveloperName: 'velo_product_models',
      Type: 'Document',
      AccessType: 'Public'
    } as Folder
    const folderCreateResult = (await conn.sobject('Folder').create(folder)) as CreateResult
    if (folderCreateResult.success) {
      console.log(`New folder created ${folderCreateResult.name} with id ${folderCreateResult.id}`)
    } else {
      throw new SfdxError(`Failed to create folder: ${JSON.stringify(folderCreateResult)}`)
    }
    return folderCreateResult.id
  } else {
    folderId = folderResult.records[0].Id
    console.log(`Use existing folder ${folderResult.records[0].Name} with id ${folderId}`)
    return folderId
  }
}

function findAllPMLs(sourcepath: string): Set<string> {
  const result = new Set<string>()
  const filenames = readdirSync(sourcepath);
  filenames.forEach(file => {
    if (file.endsWith('.pml')) {
      result.add(file)
    }
  });
  return result
}

async function uploadPML(sourcepath: string, conn: Connection, pmlName: string, pmToUpload: Set<string>): Promise<void> {
  const pml = readFileSync(`${sourcepath}/${pmlName}.pml`)
  const gzipped = gzipSync(pml)
  // Encode to base64 TWICE!, first time is requirement of POST/PATCH, and it will be decoded on reads automatically by SF.
  const b64Data = Buffer.from(gzipped.toString('base64')).toString('base64')

  const meta = JSON.parse(readFileSync(`${sourcepath}/${pmlName}.json`).toString()) as { [key: string]: string }
  const folderId = getOrCreateModelFolderId(conn)
  // attempt to update existing document first
  if (await documentExists(conn, meta['VELOCPQ__ContentId__c'])) {
    // update existing document
    console.log(`Updating existing PML document(${pmlName}) with ID: ${meta['VELOCPQ__ContentId__c']}`)
    const data = {
      body: b64Data,
      name: pmlName,
      folderId
    }
    const response: CreateResult = await conn.request({
      url: `/services/data/v${conn.getApiVersion()}/sobjects/Document/${meta['VELOCPQ__ContentId__c']}`,
      body: JSON.stringify(data),
      method: 'PATCH'
    });
    if (!response.success) {
      throw new SfdxError(`Failed to update document: ${JSON.stringify(response)}`)
    }
  } else {
    // upload new document and link it to ProductModel
    console.log(`Create new PML document(${pmlName})`)
    const data = {
      body: b64Data,
      name: pmlName,
      folderId
    }
    const response: CreateResult = (await conn.request({
      url: `/services/data/v${conn.getApiVersion()}/sobjects/Document`,
      body: JSON.stringify(data),
      method: 'POST'
    }));
    if (response.success) {
      console.log(`New Document '${pmlName}' created with id ${response.id}`)
    } else {
      throw new SfdxError(`Failed to create document: ${JSON.stringify(response)}`)
    }
    // update meta
    meta['VELOCPQ__ContentId__c'] = response.id
    writeFileSync(`${sourcepath}/${pmlName}.json`,
      JSON.stringify(meta, null, '  '), {flag: 'w+'})
    // mark ProductModel as pending upload
    pmToUpload.add(pmlName)
  }
}

export async function pushPml(sourcepath: string, conn: Connection, pushAll: boolean, pmlsToUpload: Set<string>): Promise<PmlReturn> {
  const retIDs = []
  let pmsToUpload = new Set<string>()
  if (pushAll) {
    // Push ALL
    console.log('Pushing All PMLs')
    pmsToUpload = findAllPMLs(sourcepath)
    for (const p of pmlsToUpload) {
      retIDs.push(await uploadPML(sourcepath, conn, p, pmsToUpload))
    }
  } else if (pmlsToUpload.size > 0) {
    // Push some members only
    console.log(`Pushing PMLs with names: ${Array.from(pmlsToUpload.values()).join(',')}`)
    for (const p of pmlsToUpload) {
      retIDs.push(await uploadPML(sourcepath, conn, p, pmsToUpload))
    }
  }
  return {
    pmlRecords: retIDs,
    pmlPmsToUpload: pmsToUpload
  }
}
