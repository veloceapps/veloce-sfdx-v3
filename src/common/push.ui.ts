import { Connection } from '@salesforce/core';
import { readIdMap } from '../shared/utils/common.utils';
import { IdMap } from '../shared/types/common.types';
import { UiDefinitionsBuilder } from '../shared/utils/ui.utils';
import { OutputFlags } from '@oclif/parser';
import { gzipSync } from 'node:zlib';
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

// sfdx veloce:packui -n AM_TelcoModel -i ./models -o output.json -I .
// sfdx veloce:loaddoc -u studio-dev -i 01556000001AnWOAA0 -F velo_product_models -n CPQ_UiDefinitions -f /Users/amankevics/Documents/work_tmp/ui.json -I /Users/amankevics/Documents/work_tmp/idmap.json
export async function pushUI(params: PushUIParams): Promise<UiReturn> {
  const { sourcepath, conn, pushAll, uisToUpload } = params;

  Array.from(uisToUpload);

  const modelNames: string[] = Array.from(uisToUpload);
  console.log(`Dumping ${pushAll ? 'All Uis' : 'Uis with names: ' + modelNames.join()}`);
  const productModels: ProductModel[] = await fetchProductModels(conn, pushAll, modelNames);

  // todo get documentId and by modelname
  const documentName: string = this.flags.name;

  const uiBuilder = new UiDefinitionsBuilder(sourcepath, documentName);
  const uiDefinitions = uiBuilder.pack();
  const output = JSON.stringify(uiDefinitions, null, 2);
  const gzipped = gzipSync(output);
  // Encode to base64 TWICE!, first time is requirement of POST/PATCH, and it will be decoded on reads automatically by SF.
  const b64Data = Buffer.from(gzipped.toString('base64')).toString('base64');

  // Check if veloce folder exists:
  let folderId = (await fetchFolder(this.conn, 'velo_product_models'))?.Id;
  if (!folderId) {
    folderId = (await createFolder(this.conn, 'velo_product_models'))?.id;
  }

  const documentBody: DocumentBody = { folderId, body: b64Data, name: documentName };
  let documentId = (await fetchDocument(this.conn, documentName))?.Id;
  if (!documentId) {
    await createDocument(this.conn, documentBody);
  } else {
    await updateDocument(this.conn, documentId, documentBody);
  }

  // Return an object to be displayed with --json
  return {
    uiRecords: [],
    uiPmsToUpload: new Set<string>()
  }
}
