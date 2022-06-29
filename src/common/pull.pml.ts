import { Connection } from '@salesforce/core';
import { ProductModel } from '../shared/types/productModel.types';
import { writeFileSafe } from '../shared/utils/common.utils';
import { fetchProductModels } from '../shared/utils/productModel.utils';
import { DocumentContentReturn, fetchDocumentContent } from '../shared/utils/document.utils';

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

  console.log(`Dumping ${dumpAll ? 'All Pmls' : 'Pmls with names: ' + (Array.from(pmlsToDump)?.join() ?? '')}`);
  const pmlProductModels: ProductModel[] = await fetchProductModels(conn, dumpAll, Array.from(pmlsToDump));
  console.log(`Dumping Pmls result count: ${pmlProductModels.length}`);

  const pmlPmsToDump = new Set<string>();

  const contents: (DocumentContentReturn|undefined)[] = await Promise.all(
    pmlProductModels.map(productModel => fetchDocumentContent(conn, productModel))
  );

  contents.forEach((res) => {
    if (!res) {
      return;
    }
    const { productModel, content } = res;
    const {Name} = productModel;

    writeFileSafe(sourcepath, `${Name}.pml`, content ?? '', {flag: 'w+'});

    // mark full PM dump as a dependancy (metadata)
    pmlPmsToDump.add(Name);
  })

  return {
    pmlRecords: pmlProductModels.map(({Id}) => Id),
    pmlPmsToDump
  }
}
