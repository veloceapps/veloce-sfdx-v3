import { gzipSync } from 'node:zlib';
import { SfdxError } from '@salesforce/core';
import { CommandParams } from '../types/command.types';
import { DocumentBody } from '../types/document.types';
import { ProductModel } from '../types/productModel.types';
import { SfConfigurationProcessor, SfUIDefinition } from '../types/ui.types';
import { createDocument, updateDocument } from '../utils/document.utils';
import { createFolder, fetchFolder } from '../utils/folder.utils';
import { fetchProductModels } from '../utils/productModel.utils';
import { fetchConfigurationProcessors, fetchUiDefinitions, UiDefinitionsBuilder } from '../utils/ui.utils';

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
  const results: string[] = [];

  for (const productModel of productModels) {
    const { Id: modelId, VELOCPQ__Version__c: modelVersion, Name: modelName } = productModel;

    const existingUiDefs = await fetchUiDefinitions(conn, modelId, modelVersion);
    // pack all Ui Definitions
    const uiBuilder = new UiDefinitionsBuilder();
    const uiDefinitions = uiBuilder.pack(sourcepath, modelName);
    const sfUiDefinitions = uiBuilder.getSfUiDefinitions();
    const processors = uiBuilder.getConfigurationProcessors();

    const toDelete = existingUiDefs
      .filter((existingUiDef) => {
        return !sfUiDefinitions.some((meta) => meta.VELOCPQ__ReferenceId__c === existingUiDef.VELOCPQ__ReferenceId__c);
      })
      .map((ui) => ui.Id)
      .filter((id): id is string => Boolean(id));

    const toUpsert = await Promise.all(
      uiDefinitions.map(async (uiDef) => {
        const documentBody = getDocumentBody(folderId, `${modelName}_uiDefinition`, JSON.stringify(uiDef, null, 2));

        const sfUiDef = sfUiDefinitions.find((meta) => meta.Name === uiDef.name);
        const existingUiDef = existingUiDefs.find(
          ({ Name, VELOCPQ__ReferenceId__c }) =>
            VELOCPQ__ReferenceId__c === sfUiDef?.VELOCPQ__ReferenceId__c || Name === uiDef.name,
        );
        const documentId = existingUiDef
          ? await updateDocument(conn, existingUiDef.VELOCPQ__SourceDocumentId__c, documentBody).then(
              () => existingUiDef.VELOCPQ__SourceDocumentId__c,
            )
          : await createDocument(conn, documentBody).then((r) => r.id);

        const existingProcessors = existingUiDef?.Id
          ? await fetchConfigurationProcessors(conn, [existingUiDef?.Id])
          : [];
        const localProcessors = processors[uiDef.name] ?? [];
        const processorsToDelete = existingProcessors
          .filter((ex) => {
            return !localProcessors.some((local) => local.VELOCPQ__ReferenceId__c === ex.VELOCPQ__ReferenceId__c);
          })
          .map((p) => p.Id ?? '')
          .filter(Boolean);

        if (processorsToDelete.length) {
          console.log(
            `Deleting obsolete ConfigurationProcessors for '${uiDef.name}' (${JSON.stringify(processorsToDelete)})`,
          );
          await conn.delete('VELOCPQ__ConfigurationProcessor__c', processorsToDelete);
        }

        const processorsToCreate: Partial<SfConfigurationProcessor>[] = [];
        const processorsToUpdate: Partial<SfConfigurationProcessor>[] = [];
        for (const processor of localProcessors) {
          const existingMeta = existingProcessors.find(
            (ex) =>
              ex.VELOCPQ__Type__c === processor.VELOCPQ__Type__c &&
              ex.VELOCPQ__ApiNameField__c === processor.VELOCPQ__ApiNameField__c,
          );

          processor['VELOCPQ__OwnerId__c'] = existingUiDef?.Id;

          if (!existingMeta) {
            processorsToCreate.push(processor);
          } else {
            processor['VELOCPQ__ReferenceId__c'] = existingMeta?.VELOCPQ__ReferenceId__c;
            processor['Id'] = existingMeta?.Id;

            if (existingMeta.VELOCPQ__ScriptDocumentId__c) {
              const processorName = processor.Name || existingMeta.Name;
              const processorBody = getDocumentBody(
                folderId,
                `${processorName}_ConfigurationProcessorScript`,
                processor.VELOCPQ__Script__c ?? '',
              );
              await updateDocument(conn, existingMeta.VELOCPQ__ScriptDocumentId__c, processorBody);
              existingMeta['VELOCPQ__Script__c'] = '';
            }

            processorsToUpdate.push(processor);
          }
        }

        await conn.create('VELOCPQ__ConfigurationProcessor__c', processorsToCreate);
        await conn.update('VELOCPQ__ConfigurationProcessor__c', processorsToUpdate);

        return {
          Id: existingUiDef?.Id,
          Name: uiDef.name,
          VELOCPQ__ModelId__c: modelId,
          VELOCPQ__Default__c: false,
          VELOCPQ__SourceDocumentId__c: documentId,
          VELOCPQ__ModelVersion__c: modelVersion,
          VELOCPQ__ReferenceId__c: existingUiDef?.VELOCPQ__ReferenceId__c ?? sfUiDef?.VELOCPQ__ReferenceId__c,
        } as SfUIDefinition;
      }),
    );

    if (toDelete.length) {
      console.log(`Deleting Uis with IDs: ${JSON.stringify(toDelete)}`);
      await conn.delete('VELOCPQ__UiDefinition__c', toDelete);
    }

    const createdRecords = await conn.create(
      'VELOCPQ__UiDefinition__c',
      toUpsert.filter(({ Id: uiDefId }) => !uiDefId),
    );
    const updatedRecords = await conn.update(
      'VELOCPQ__UiDefinition__c',
      toUpsert.filter(({ Id: uiDefId }) => uiDefId),
    );

    for (const r of [createdRecords, updatedRecords].flat()) {
      if (r.success) {
        results.push(r.id);
      } else {
        throw new SfdxError(`Failed to upsert ui definition:\n ${JSON.stringify(r.errors, null, '  ')}`);
      }
    }
  }

  // Return an object to be displayed with --json
  return results;
}

function getDocumentBody(folderId: string, documentName: string, body: string): DocumentBody {
  const gzipped = gzipSync(body);
  // Encode to base64 TWICE!, first time is requirement of POST/PATCH, and it will be decoded on reads automatically by SF.
  const b64Data = Buffer.from(gzipped.toString('base64')).toString('base64');

  return {
    folderId,
    body: b64Data,
    name: documentName,
    contentType: 'application/zip',
    type: 'zip',
  };
}
