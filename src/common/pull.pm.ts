import { Connection } from '@salesforce/core';
import { ProductModel } from '../shared/types/productModel.types';
import { writeFileSafe } from '../shared/utils/common.utils';
import { fetchProductModels } from '../shared/utils/productModel.utils';

export async function pullPM(sourcepath: string, conn: Connection, dumpAll: boolean, pmsToDump: Set<string>): Promise<string[]> {
  const productModels: ProductModel[] = await fetchProductModels(conn, dumpAll, Array.from(pmsToDump));

  productModels.forEach(({
                           Id,
                           Name,
                           VELOCPQ__ContentId__c,
                           VELOCPQ__ReferenceId__c,
                           VELOCPQ__Version__c,
                           VELOCPQ__UiDefinitionsId__c
                         }) => {
    const dir = `${sourcepath}/${Name}`;
    const productModelJson = JSON.stringify({
      Id, Name, VELOCPQ__ContentId__c, VELOCPQ__ReferenceId__c, VELOCPQ__Version__c, VELOCPQ__UiDefinitionsId__c
      // TODO: add more
    }, null, '  ');
    writeFileSafe(dir, `${Name}.json`, productModelJson, {flag: 'w+'});
  });

  return productModels.map(({Id}) => Id);
}
