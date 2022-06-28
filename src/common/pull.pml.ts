import { Connection } from '@salesforce/core';
import { ProductModel } from '../shared/types/productModel.types';
import { writeFileSafe } from '../shared/utils/common.utils';
import { fetchProductModels } from '../shared/utils/productModel.utils';
import { fetchDocumentAttachment } from '../shared/utils/document.utils';

interface PmlReturn {
  pmlRecords: string[];
  pmlPmsToDump: Set<string>;
}

export interface PullPmlParams {
  sourcepath: string;
  conn: Connection;
  dumpAll: boolean;
  pmlsToDump: Set<string>;
}

export async function pullPml(params: PullPmlParams): Promise<PmlReturn> {
  const { sourcepath, conn, dumpAll, pmlsToDump } = params;

  const pmlProductModels: ProductModel[] = await fetchProductModels(conn, dumpAll, Array.from(pmlsToDump));
  const pmlPmsToDump = new Set<string>();

  const contents: [ProductModel, string|undefined][] = await Promise.all(pmlProductModels.map(productModel => Promise.all([
    Promise.resolve(productModel),
    fetchDocumentAttachment(conn, productModel.VELOCPQ__ContentId__c)
  ])));

  contents.forEach(([{Name}, content]) => {
    writeFileSafe(sourcepath, `${Name}.pml`, content ?? '', {flag: 'w+'});

    // mark full PM dump as a dependancy (metadata)
    pmlPmsToDump.add(Name);
  })

  return {
    pmlRecords: pmlProductModels.map(({Id}) => Id),
    pmlPmsToDump
  }
}
