import { Connection } from '@salesforce/core';
import { ProductModel } from '../types/productModel.types';

export async function fetchProductModels(
  conn: Connection,
  dumpAll: boolean,
  modelNames?: string[],
): Promise<ProductModel[]> {
  let query =
    'SELECT Id,Name,VELOCPQ__Version__c,VELOCPQ__ReferenceId__c,VELOCPQ__Active__c,VELOCPQ__BundleProduct__c,VELOCPQ__Comment__c,VELOCPQ__ContentId__c,VELOCPQ__UiDefinitionsId__c from VELOCPQ__ProductModel__c';
  if (!dumpAll) {
    query += ` WHERE Name IN ('${modelNames?.join("','")}')`;
  }

  const result = await conn.query<ProductModel>(query);
  return result?.records ?? [];
}
