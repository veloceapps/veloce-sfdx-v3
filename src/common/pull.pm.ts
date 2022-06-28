import { Connection } from '@salesforce/core';
import { ProductModel } from '../shared/types/productModel.types';
import { writeFileSafe } from '../shared/utils/common.utils';
import { fetchProductModels } from '../shared/utils/productModel.utils';

export interface PullPMParams {
  sourcepath: string;
  conn: Connection;
  dumpAll: boolean;
  pmsToDump: Set<string>;
}

export async function pullPM(params: PullPMParams): Promise<string[]> {
  const { sourcepath, conn, dumpAll, pmsToDump } = params;

  console.log(`Dumping ${dumpAll ? 'All Product Models' : 'Product Models with names: ' + (Array.from(pmsToDump)?.join() ?? '')}`);
  const productModels: ProductModel[] = await fetchProductModels(conn, dumpAll, Array.from(pmsToDump));
  console.log(`Dumping Product Models result count: ${productModels.length}`);

  productModels.forEach(({
                           Id,
                           Name,
                           VELOCPQ__ContentId__c,
                           VELOCPQ__ReferenceId__c,
                           VELOCPQ__Version__c,
                           VELOCPQ__UiDefinitionsId__c
                         }) => {
    const productModelJson = JSON.stringify({
      Id, Name, VELOCPQ__ContentId__c, VELOCPQ__ReferenceId__c, VELOCPQ__Version__c, VELOCPQ__UiDefinitionsId__c
      // TODO: add more
    }, null, '  ');
    writeFileSafe(sourcepath, `${Name}.json`, productModelJson, {flag: 'w+'});
  });

  return productModels.map(({Id}) => Id);
}
