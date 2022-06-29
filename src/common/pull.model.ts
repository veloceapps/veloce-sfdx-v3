import { Connection } from '@salesforce/core';
import { ProductModel } from '../types/productModel.types';
import { writeFileSafe } from '../utils/common.utils';
import { fetchProductModels } from '../utils/productModel.utils';
import { fetchDocumentContent } from '../utils/document.utils';

export interface PullModelParams {
  sourcepath: string;
  conn: Connection;
  dumpAll: boolean;
  modelsToDump: Set<string>;
}

async function pullPM(sourcepath: string, conn: Connection, dumpAll: boolean, pmsToDump: Set<string>): Promise<void> {
  console.log(
    `Dumping ${dumpAll ? 'All Product Models' : 'PMs with names: ' + (Array.from(pmsToDump)?.join() ?? '')}`,
  );
  const productModels: ProductModel[] = await fetchProductModels(conn, dumpAll, Array.from(pmsToDump));
  productModels.forEach(
    ({
      Id,
      Name,
      VELOCPQ__ReferenceId__c,
      VELOCPQ__Version__c,
      VELOCPQ__Active__c,
      VELOCPQ__BundleProduct__c,
      VELOCPQ__Comment__c,
    }) => {
      const productModelJson = JSON.stringify(
        {
          Id,
          Name,
          VELOCPQ__ReferenceId__c,
          VELOCPQ__Version__c,
          VELOCPQ__Active__c,
          VELOCPQ__BundleProduct__c,
          VELOCPQ__Comment__c,
        },
        null,
        '  ',
      );
      writeFileSafe(`${sourcepath}/model/${Name}`, `${Name}.json`, productModelJson, { flag: 'w+' });
    },
  );
}

export async function pullModel(params: PullModelParams): Promise<string[]> {
  const { sourcepath, conn, dumpAll, modelsToDump } = params;

  console.log(
    `Dumping ${dumpAll ? 'All Product Models' : 'Models with names: ' + (Array.from(modelsToDump)?.join() ?? '')}`,
  );
  const productModels: ProductModel[] = await fetchProductModels(conn, dumpAll, Array.from(modelsToDump));
  const pmsToDump = new Set<string>();

  const contents: {productModel: ProductModel; content: string|undefined}[] = await Promise.all(
    productModels.map(
      (productModel) => fetchDocumentContent(conn, productModel.VELOCPQ__ContentId__c)
        .then((content) => ({content, productModel}))
    ),
  );

  contents.forEach(({ productModel, content }) => {
    const { Name } = productModel;

    writeFileSafe(`${sourcepath}/model/${Name}`, `${Name}.pml`, content ?? '', { flag: 'w+' });

    // mark full PM dump as a dependancy (metadata)
    pmsToDump.add(Name);
  });

  void pullPM(sourcepath, conn, dumpAll, pmsToDump);

  return productModels.map(({ Id }) => Id);
}
