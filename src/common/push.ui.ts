import { Connection } from '@salesforce/core';
import { gzipSync } from 'node:zlib';
import { UiDefinitionsBuilder } from '../shared/utils/ui.utils';
import { createDocument, fetchDocument, updateDocument } from '../shared/utils/document.utils';
import { createFolder, fetchFolder } from '../shared/utils/folder.utils';
import { DocumentBody } from '../shared/types/document.types';
import { fetchProductModels } from '../shared/utils/productModel.utils';
import { ProductModel } from '../shared/types/productModel.types';

interface UiReturn {
  uiRecords: string[];
  uiPmsToUpload: Set<string>;
}

export interface PushUIParams {
  sourcepath: string;
  conn: Connection;
  pushAll: boolean;
  uisToUpload: Set<string>;
}

const FOLDER_NAME = 'velo_product_models';

export async function pushUI(params: PushUIParams): Promise<UiReturn> {
  const {sourcepath, conn, pushAll, uisToUpload} = params;

  const modelNames: string[] = Array.from(uisToUpload);
  console.log(`Dumping ${pushAll ? 'All Uis' : 'Uis with names: ' + modelNames.join()}`);
  const productModels: ProductModel[] = await fetchProductModels(conn, pushAll, modelNames);
  console.log(`Dumping Uis result count: ${productModels.length}`);

  // Check if veloce folder exists:
  let folderId = (await fetchFolder(conn, FOLDER_NAME))?.Id;
  if (!folderId) {
    folderId = (await createFolder(conn, FOLDER_NAME))?.id;
  }

  const result: {modelName: string; documentId: string}[] = await Promise.all(productModels.map(({VELOCPQ__UiDefinitionsId__c, Name}) => {

    // pack all Ui Definitions
    const uiBuilder = new UiDefinitionsBuilder(sourcepath, Name);
    const uiDefinitions = uiBuilder.pack();
    const output = JSON.stringify(uiDefinitions, null, 2);
    const gzipped = gzipSync(output);
    // Encode to base64 TWICE!, first time is requirement of POST/PATCH, and it will be decoded on reads automatically by SF.
    const b64Data = Buffer.from(gzipped.toString('base64')).toString('base64');

    const documentBody: DocumentBody = { folderId: folderId as string, body: b64Data, name: Name };

    return fetchDocument(conn, VELOCPQ__UiDefinitionsId__c).then(document => document?.Id
      ? updateDocument(conn, document.Id, documentBody).then(() => ({modelName: Name, documentId: document.Id}))
      : createDocument(conn, documentBody).then((res) => ({modelName: Name, documentId: res.id})));
  }));

  // Return an object to be displayed with --json
  return {
    uiRecords: result.map(({documentId}) => documentId),
    uiPmsToUpload: new Set(result.map(({modelName}) => modelName))
  }
}
