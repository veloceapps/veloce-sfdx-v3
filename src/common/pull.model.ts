import { Connection } from '@salesforce/core';
import { ProductModel } from '../types/productModel.types';
import { writeFileSafe } from '../utils/common.utils';
import { fetchProductModels } from '../utils/productModel.utils';
import { fetchDocumentContent } from '../utils/document.utils';
import { CommandParams } from '../types/command.types';

async function pullPM(rootPath: string, conn: Connection, dumpAll: boolean, pmsToDump: Set<string>): Promise<void> {
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
      writeFileSafe(`${rootPath}/model/${Name}`, `${Name}.json`, productModelJson, { flag: 'w+' });
    },
  );
}

export async function pullModel(params: CommandParams): Promise<string[]> {
  const { rootPath, conn, member } = params;
  if (!member) {
    return [];
  }
  console.log(
    `Pulling ${member.all ? 'All Product Models' : 'Models with names: ' + (Array.from(member.names)?.join() ?? '')}`,
  );
  const productModels: ProductModel[] = await fetchProductModels(conn, member.all, Array.from(member.names));
  const pmsToDump = new Set<string>();

  const contents: { productModel: ProductModel; content: string | undefined }[] = await Promise.all(
    productModels.map((productModel) =>
      fetchDocumentContent(conn, productModel.VELOCPQ__ContentId__c).then((content) => ({ content, productModel })),
    ),
  );

  contents.forEach(({ productModel, content }) => {
    const { Name } = productModel;

    writeFileSafe(`${rootPath}/model/${Name}`, `${Name}.pml`, content ?? '', { flag: 'w+' });

    // mark full PM dump as a dependancy (metadata)
    pmsToDump.add(Name);
  });

  void pullPM(rootPath, conn, member.all, pmsToDump);

  return productModels.map(({ Id }) => Id);
}
