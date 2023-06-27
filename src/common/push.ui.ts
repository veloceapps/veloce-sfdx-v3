import { gzipSync } from 'node:zlib';
import { SfdxError } from '@salesforce/core';
import { RecordResult, SuccessResult } from 'jsforce/record-result';
import { CommandParams } from '../types/command.types';
import { DocumentBody } from '../types/document.types';
import { ProductModel } from '../types/productModel.types';
import { SfUIDefinition } from '../types/ui.types';
import { createDocument, updateDocument } from '../utils/document.utils';
import { createFolder, fetchFolder } from '../utils/folder.utils';
import { fetchProductModels } from '../utils/productModel.utils';
import { fetchUiDefinitions, UiDefinitionsBuilder } from '../utils/ui.utils';

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

  const results: string[] = (
    await Promise.all(
      productModels.map(async ({ Id, VELOCPQ__Version__c, Name }) => {
        const existingUiDefs = await fetchUiDefinitions(conn, Id, VELOCPQ__Version__c);
        // pack all Ui Definitions
        const uiBuilder = new UiDefinitionsBuilder(sourcepath, Name);
        const uiDefinitions = uiBuilder.pack();
        const toDelete = existingUiDefs
          .filter(
            ({ VELOCPQ__ReferenceId__c }) =>
              !uiDefinitions.some(({ referenceId }) => VELOCPQ__ReferenceId__c === referenceId),
          )
          .map(({ Id: exUiDefId }) => exUiDefId as string);
        const toUpsert = await Promise.all(
          uiDefinitions.map(async (uiDef) => {
            const uiDocName = `${Name}_uiDefinition`;
            const output = JSON.stringify(uiDef, null, 2);
            const gzipped = gzipSync(output);
            // Encode to base64 TWICE!, first time is requirement of POST/PATCH, and it will be decoded on reads automatically by SF.
            const b64Data = Buffer.from(gzipped.toString('base64')).toString('base64');

            const documentBody: DocumentBody = {
              folderId,
              body: b64Data,
              name: uiDocName,
              contentType: 'application/zip',
              type: 'zip',
            };

            const existingUiDef = existingUiDefs.find(
              ({ VELOCPQ__ReferenceId__c }) => VELOCPQ__ReferenceId__c === uiDef.referenceId,
            );
            const documentId = existingUiDef
              ? await updateDocument(conn, existingUiDef.VELOCPQ__SourceDocumentId__c, documentBody).then(
                  () => existingUiDef.VELOCPQ__SourceDocumentId__c,
                )
              : await createDocument(conn, documentBody).then((r) => r.id);

            return {
              Id: existingUiDef?.Id,
              VELOCPQ__ModelId__c: Id,
              VELOCPQ__Default__c: false,
              VELOCPQ__SourceDocumentId__c: documentId,
              VELOCPQ__ModelVersion__c: VELOCPQ__Version__c,
              VELOCPQ__ReferenceId__c: uiDef.referenceId,
            } as SfUIDefinition;
          }),
        );

        await conn.delete('VELOCPQ__UiDefinition__c', toDelete);
        const result = [
          ...((await conn.create(
            'VELOCPQ__UiDefinition__c',
            toUpsert.filter(({ Id: uiDefId }) => !uiDefId),
          )) as RecordResult[]),
          ...((await conn.update(
            'VELOCPQ__UiDefinition__c',
            toUpsert.filter(({ Id: uiDefId }) => uiDefId),
          )) as RecordResult[]),
        ];
        for (const r of result) {
          if (!r.success) {
            throw new SfdxError(`Failed to upsert ui definition:\n ${JSON.stringify(r.errors, null, '  ')}`);
          }
        }
        return result.map((r) => (r as SuccessResult).id);
      }),
    )
  ).flat();

  // Return an object to be displayed with --json
  return results;
}
