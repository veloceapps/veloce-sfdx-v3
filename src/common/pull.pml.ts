import { Connection } from '@salesforce/core';
import { ProductModel } from '../shared/types/productModel.types';
import { fetchDocumentAttachment, fetchProductModels } from '../shared/utils/query.utils';
import { writeFileSafe } from '../shared/utils/common.utils';

interface PmlReturn {
  pmlRecords: ProductModel[];
  pmlPmsToDump: Set<string>;
}

export async function pullPml(sourcepath: string, conn: Connection, dumpAll: boolean, pmlsToDump: Set<string>): Promise<PmlReturn> {
  const pmlProductModels: ProductModel[] = await fetchProductModels(conn, dumpAll, Array.from(pmlsToDump));
  const pmlPmsToDump = new Set<string>();

  const contents: [ProductModel, string][] = await Promise.all(pmlProductModels.map(productModel => Promise.all([
    Promise.resolve(productModel),
    fetchDocumentAttachment(conn, productModel.VELOCPQ__ContentId__c)
  ])));

  contents.forEach(([{Name}, content]) => {
    const dir = `${sourcepath}/${Name}`;
    writeFileSafe(dir, `${Name}.pml`, content, {flag: 'w+'});

    // mark full PM dump as a dependancy (metadata)
    pmlPmsToDump.add(Name);
  })

  return {
    pmlRecords: pmlProductModels,
    pmlPmsToDump
  }
}
