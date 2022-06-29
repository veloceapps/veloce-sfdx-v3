import {readdirSync, readFileSync, writeFileSync} from 'node:fs';
import {gzipSync} from 'node:zlib';
import {Connection, SfdxError} from '@salesforce/core';
import { CreateResult } from '../types/common.types';
import { Document } from '../types/document.types';
import { Folder } from '../types/folder.types';
import {ProductModel} from '../types/productModel.types';

async function getDocument(conn: Connection, name: string): Promise<string|null> {
  // TODO: optimize in single query?
  const pmResult = await conn.query<ProductModel>(`SELECT Id, Name, VELOCPQ__ContentId__c
                                                    FROM VELOCPQ__ProductModel__c
                                                    WHERE Name = '${name}'`)
  if (pmResult.records.length > 1) {
    throw new SfdxError(`More then signle model found with name: ${name}`)
  }
  if (pmResult.records.length === 0) {
    return null
  }
  const docResult = await conn.query<Document>(`SELECT Id
                                                  FROM Document
                                                  WHERE Id = '${pmResult.records[0].VELOCPQ__ContentId__c}'`)

  if (docResult.records.length > 1) {
    throw new SfdxError(`No linked Document found ${name} and ID ${pmResult.records[0].VELOCPQ__ContentId__c}`)
  }
  if (docResult.records.length === 0) {
    return null
  }
  return pmResult.records[0].VELOCPQ__ContentId__c
}

async function getOrCreateModelFolderId(conn: Connection): Promise<string> {
  let folderId: string
// deal with folder
// Check if veloce folder exists:
  const folderResult = await conn.query<Folder>(`SELECT Id, Name, Type
                                                 FROM Folder
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

async function uploadModel(sourcepath: string, conn: Connection, pmlName: string): Promise<string> {
  const pmToUpload = new Set<string>()

  const pml = readFileSync(`${sourcepath}/model/${pmlName}/${pmlName}.pml`)
  const gzipped = gzipSync(pml)
  // Encode to base64 TWICE!, first time is requirement of POST/PATCH, and it will be decoded on reads automatically by SF.
  const b64Data = Buffer.from(gzipped.toString('base64')).toString('base64')

  const meta = JSON.parse(readFileSync(`${sourcepath}/model/${pmlName}/${pmlName}.json`).toString()) as { [key: string]: string }
  const folderId = await getOrCreateModelFolderId(conn)
  // attempt to update existing document first
  const documentId = await getDocument(conn, pmlName)

  if (documentId !== null) {
    // update existing document
    console.log(`Updating existing PML document(${pmlName}) with ID: ${documentId}`)
    const data = {
      body: b64Data,
      name: pmlName,
      folderId
    }
    await conn.request({
      url: `/services/data/v${conn.getApiVersion()}/sobjects/Document/${documentId}`,
      body: JSON.stringify(data),
      method: 'PATCH'
    }); // patch has no response for some reason
    return documentId
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
    writeFileSync(`${sourcepath}/model/${pmlName}/${pmlName}.json`,
      JSON.stringify(meta, null, '  '), {flag: 'w+'})
    // mark ProductModel as pending upload
    pmToUpload.add(pmlName)
    void uploadPM(sourcepath, conn, pmlName)
    return response.id
  }
}

export interface PushPmlParams {
  sourcepath: string;
  conn: Connection;
  pushAll: boolean;
  modelsToUpload: Set<string>;
}

export async function pushModel(params: PushPmlParams): Promise<string[]> {
  const { sourcepath, conn, pushAll, modelsToUpload } = params;

  const retIDs = []
  if (pushAll) {
    // Push ALL
    console.log('Pushing All Models')
    const allModelsToUpload = findAllModels(sourcepath)
    for (const p of allModelsToUpload) {
      retIDs.push(await uploadModel(sourcepath, conn, p))
    }
  } else if (modelsToUpload.size > 0) {
    // Push some members only
    console.log(`Pushing Models with names: ${Array.from(modelsToUpload.values()).join(',')}`)
    for (const p of modelsToUpload) {
      retIDs.push(await uploadModel(sourcepath, conn, p))
    }
  }
  return retIDs
}

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

async function uploadPM(sourcepath: string, conn: Connection, pmName: string): Promise<void> {
  const meta = JSON.parse(readFileSync(`${sourcepath}/model/${pmName}/${pmName}.json`).toString()) as { [key: string]: string }
  const pmId = await getPm(conn, pmName)
  if (pmId === null) {
    // inserting new product model from meta
    delete meta['Id']
    await conn.sobject<{ [key: string]: string }>('VELOCPQ__ProductModel__c').create(meta, {},
      (err, ret) => {
        if (err || !ret.success) {
          throw new SfdxError(`Failed to insert Product Model ${pmName}, error: ${err ? err.toString(): 'no-error'}`)
        }
        // update meta json with new id
        meta['Id'] = ret.id
      })
  } else {
    // updating existing product model from meta
    await conn.sobject<{ [key: string]: string }>('VELOCPQ__ProductModel__c').update(meta,
      (err, ret) => {
        if (err || !ret.success) {
          throw new SfdxError(`Failed to update Product Model ${pmName}, error: ${err ? err.toString(): 'no-error'}`)
        }
      })
  }
  // Update meta on filesystem
  writeFileSync(`${sourcepath}/model/${pmName}/${pmName}.json`,
    JSON.stringify(meta, null, '  '), {flag: 'w+'})
}

function findAllModels(sourcepath: string): Set<string> {
  const result = new Set<string>()
  const filenames = readdirSync(`${sourcepath}/model`);
  filenames.forEach(file => {
    result.add(file)
  });
  return result
}

