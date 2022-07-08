import { gzipSync } from 'node:zlib';
import { UiDefinitionsBuilder } from '../utils/ui.utils';
import { createDocument, fetchDocument, updateDocument } from '../utils/document.utils';
import { createFolder, fetchFolder } from '../utils/folder.utils';
import { DocumentBody } from '../types/document.types';
import { fetchProductModels } from '../utils/productModel.utils';
import { ProductModel } from '../types/productModel.types';
import { CommandParams } from '../types/command.types';

const FOLDER_NAME = 'velo_product_models';

export async function pushUI(params: CommandParams): Promise<string[]> {
  const { rootPath, conn, member } = params;
  if (!member) {
    return [];
  }
  const sourcepath: string = rootPath + '/config-ui';

  const modelNames: string[] = Array.from(member.names).map((ui) => ui.split(':')[0]);
  console.log(`Uploading ${member.all ? 'All Uis' : 'Uis with names: ' + modelNames.join()}`);
  const productModels: ProductModel[] = await fetchProductModels(conn, member.all, modelNames);
  console.log(`Uploading Uis result count: ${productModels.length}`);

  Array.from(member.names).forEach((ui) => {
    const [modelName, uiDefName] = ui.split(':');
    if (uiDefName) {
      console.log(
        `Push for separate UI Definition '${uiDefName}' is not supported. Pushing All UI Definitions for '${modelName}'.`,
      );
    }
  });
  // Check if veloce folder exists:
  const folderId: string = (await fetchFolder(conn, FOLDER_NAME))?.Id ?? (await createFolder(conn, FOLDER_NAME)).id;

  const result: string[] = await Promise.all(
    productModels.map(({ VELOCPQ__UiDefinitionsId__c, Name }) => {
      // pack all Ui Definitions
      const uiBuilder = new UiDefinitionsBuilder(sourcepath, Name);
      const uiDefinitions = uiBuilder.pack();
      const output = JSON.stringify(uiDefinitions, null, 2);
      const gzipped = gzipSync(output);
      // Encode to base64 TWICE!, first time is requirement of POST/PATCH, and it will be decoded on reads automatically by SF.
      const b64Data = Buffer.from(gzipped.toString('base64')).toString('base64');

      const documentBody: DocumentBody = { folderId, body: b64Data, name: Name };

      return fetchDocument(conn, VELOCPQ__UiDefinitionsId__c).then((document) =>
        document?.Id
          ? updateDocument(conn, document.Id, documentBody).then(() => document.Id)
          : createDocument(conn, documentBody).then((res) => res.id),
      );
    }),
  );

  // Return an object to be displayed with --json
  return result;
}
