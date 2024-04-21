import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { Connection, SfdxError } from '@salesforce/core';
import { CreateResult } from '../types/common.types';
import { Document, DocumentBody } from '../types/document.types';
import { Folder } from '../types/folder.types';
import { ProductModel } from '../types/productModel.types';
import { CommandParams } from '../types/command.types';
import { createDocument, updateDocument } from '../utils/document.utils';
import { IdMap } from '../types/idmap';

async function getPMLDocument(conn: Connection, modelName: string): Promise<string | null> {
  // TODO: optimize in single query?
  const pmResult = await conn.query<ProductModel>(`SELECT Id, Name, VELOCPQ__ContentId__c
                                                    FROM VELOCPQ__ProductModel__c
                                                    WHERE Name = '${modelName}'`);
  if (pmResult.records.length > 1) {
    throw new SfdxError(`More then signle model found with name: ${modelName}`);
  }
  if (pmResult.records.length === 0) {
    return null;
  }
  if (!pmResult.records[0].VELOCPQ__ContentId__c) {
    console.debug(`Product model '${modelName}' field VELOCPQ__ContentId__c is null`);
    return null;
  }
  const docResult = await conn.query<Document>(`SELECT Id
                                                  FROM Document
                                                  WHERE Id = '${pmResult.records[0].VELOCPQ__ContentId__c}'`);

  if (docResult.records.length > 1) {
    throw new SfdxError(`No linked Document found ${modelName} and ID ${pmResult.records[0].VELOCPQ__ContentId__c}`);
  }
  if (docResult.records.length === 0) {
    return null;
  }
  return pmResult.records[0].VELOCPQ__ContentId__c;
}

async function getOrCreateModelFolderId(conn: Connection): Promise<string> {
  let folderId: string;
  // deal with folder
  // Check if veloce folder exists:
  const folderResult = await conn.query<Folder>(`SELECT Id, Name, Type
                                                 FROM Folder
                                                 WHERE Name = 'velo_product_models'`);
  if (!folderResult.records || folderResult.records.length <= 0) {
    // Create new Folder
    const folder = {
      Name: 'velo_product_models',
      DeveloperName: 'velo_product_models',
      Type: 'Document',
      AccessType: 'Public',
    } as Folder;
    const folderCreateResult = (await conn.sobject('Folder').create(folder)) as CreateResult;
    if (folderCreateResult.success) {
      console.log(`New folder created ${folderCreateResult.name} with id ${folderCreateResult.id}`);
    } else {
      throw new SfdxError(`Failed to create folder: ${JSON.stringify(folderCreateResult)}`);
    }
    return folderCreateResult.id;
  } else {
    folderId = folderResult.records[0].Id;
    console.log(`Use existing folder ${folderResult.records[0].Name} with id ${folderId}`);
    return folderId;
  }
}

async function uploadModel(idmap: IdMap, sourcepath: string, conn: Connection, modelName: string): Promise<string> {
  const pml = readFileSync(`${sourcepath}/model/${modelName}/${modelName}.pml`);
  const gzipped = gzipSync(pml);
  // Encode to base64 TWICE!, first time is requirement of POST/PATCH, and it will be decoded on reads automatically by SF.
  const b64Data = Buffer.from(gzipped.toString('base64')).toString('base64');

  const folderId = await getOrCreateModelFolderId(conn);
  const pmlDocName = `${modelName}_pml`;

  const body: DocumentBody = {
    body: b64Data,
    name: pmlDocName,
    folderId,
    contentType: 'application/zip',
    type: 'zip',
  };

  // attempt to update existing document first
  const documentId = await getPMLDocument(conn, modelName);

  if (documentId !== null) {
    // update existing document
    console.log(`Updating existing PML document(${pmlDocName}) with ID: ${documentId}`);
    await updateDocument(conn, documentId, body);
    // Update ID map
    const newId = await getPm(conn, modelName);
    const meta = JSON.parse(readFileSync(`${sourcepath}/model/${modelName}/${modelName}.json`).toString()) as {
      [key: string]: string;
    };
    const oldId = meta['Id'];
    // Update ID-map
    if (oldId && newId && oldId !== newId) {
      console.log(`IDMAP: ${oldId} => ${newId}`);
      idmap[oldId] = newId;
    }
    return documentId;
  } else {
    // upload new document and link it to ProductModel
    console.log(`Create new PML document(${pmlDocName})`);

    const modelId = await uploadPM(idmap, sourcepath, conn, modelName);
    const newDocumentId = await createDocument(conn, body).then((res) => res.id);

    // link new document to product model
    const result = await conn
      .sobject('VELOCPQ__ProductModel__c')
      .update({ Id: modelId, VELOCPQ__ContentId__c: newDocumentId });

    if (result.success) {
      console.log(`New PML document attached to model with Id='${modelId}'`);
    } else {
      throw new SfdxError(`Failed to attach document to ProductModel: ${JSON.stringify(result)}`);
    }

    return newDocumentId;
  }
}

export async function pushModel(params: CommandParams): Promise<string[]> {
  const { idmap, rootPath, conn, member } = params;
  if (!member) {
    return [];
  }
  const retIDs = [];
  const allModels = findAllModels(rootPath);
  for (const name of allModels) {
    // TODO: consider parallelizing if this will be slow?
    if (member.all || member.names.includes(name)) {
      retIDs.push(await uploadModel(idmap, rootPath, conn, name));
    }
  }
  return retIDs;
}

async function getPm(conn: Connection, pm: string): Promise<string | null> {
  // deal with folder
  // Check if veloce folder exists:
  const docResult = await conn.query<ProductModel>(`Select Id, Name
                                                    from VELOCPQ__ProductModel__c
                                                    WHERE Name = '${pm}'`);
  if (docResult.totalSize > 0) {
    return docResult.records[0].Id;
  }
  return null;
}

async function uploadPM(idmap: IdMap, sourcepath: string, conn: Connection, pmName: string): Promise<string> {
  const meta = JSON.parse(readFileSync(`${sourcepath}/model/${pmName}/${pmName}.json`).toString()) as {
    [key: string]: string;
  };
  const pmId = await getPm(conn, pmName);
  if (pmId === null) {
    // inserting new product model from meta
    const result = await conn
      .sobject<{ [key: string]: string }>('VELOCPQ__ProductModel__c')
      .create(meta, {}, (err, ret) => {
        if (err || !ret.success) {
          throw new SfdxError(`Failed to insert Product Model ${pmName}, error: ${err ? err.toString() : 'no-error'}`);
        }
      });
    // update meta json with new id
    if (result.success) {
      if (!meta['Id']) {
        meta['Id'] = result.id;
      }
      const oldId = meta['Id'];
      // Update ID-map
      if (oldId && result.id && oldId !== result.id) {
        console.log(`IDMAP: ${oldId} => ${result.id}`);
        idmap[oldId] = result.id;
      }
    }
  } else {
    if (!meta['Id']) {
      meta['Id'] = pmId;
    }
    // updating existing product model from meta
    const clone = Object.assign({}, meta);
    if (idmap[meta.Id]) {
      clone['Id'] = idmap[meta.Id];
    }
    await conn.sobject<{ [key: string]: string }>('VELOCPQ__ProductModel__c').update(clone, (err, ret) => {
      if (err || !ret.success) {
        throw new SfdxError(`Failed to update Product Model ${pmName}, error: ${err ? err.toString() : 'no-error'}`);
      }
    });
    const oldId = meta['Id'];
    // Update ID-map
    if (oldId && pmId && oldId !== pmId) {
      console.log(`IDMAP: ${oldId} => ${pmId}`);
      idmap[oldId] = pmId;
    }
  }
  // Update meta on filesystem
  writeFileSync(`${sourcepath}/model/${pmName}/${pmName}.json`, JSON.stringify(meta, null, '  '), { flag: 'w+' });
  if (idmap[meta.Id]) {
    return idmap[meta.Id];
  }
  return meta.Id;
}

function findAllModels(sourcepath: string): Set<string> {
  const result = new Set<string>();
  const filenames = readdirSync(`${sourcepath}/model`);
  filenames.forEach((file) => {
    result.add(file);
  });
  return result;
}
