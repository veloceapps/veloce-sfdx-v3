import { gunzipSync } from 'zlib';
import { Connection, SfdxError } from '@salesforce/core';
import { Document, DocumentBody } from '../types/document.types';
import { CreateResult } from '../types/common.types';
import { ProductModel } from '../types/productModel.types';

export interface DocumentContentReturn {
  productModel: ProductModel;
  content: string;
}

export async function fetchDocumentContent(
  conn: Connection,
  productModel: ProductModel,
): Promise<DocumentContentReturn | undefined> {
  const documentId: string = productModel.VELOCPQ__ContentId__c;
  const url: string | undefined = (await fetchDocument(conn, documentId))?.Body;
  if (!url) {
    console.log(`Document Body not found: ${documentId}`);
    return;
  }

  const res = await conn.request({ url });

  const gzipped = Buffer.from(res.toString(), 'base64');
  const content = gunzipSync(gzipped).toString();

  return {
    productModel,
    content,
  };
}

export async function fetchDocument(conn: Connection, documentId: string): Promise<Document | undefined> {
  const query = `Select Id, Body, FolderId from Document WHERE Id='${documentId}'`;

  const result = await conn.query<Document>(query);
  const [record] = result?.records ?? [];

  if (!record) {
    console.log(`Document not found: ${documentId}`);
    return;
  }

  return record;
}

export async function updateDocument(conn: Connection, documentId: string, data: DocumentBody): Promise<any> {
  console.log(`Patching existing document ${data.name} with id ${documentId}`);

  return await conn.request({
    url: `/services/data/v${conn.getApiVersion()}/sobjects/Document/${documentId}`,
    body: JSON.stringify(data),
    method: 'PATCH',
  });
}

export async function createDocument(conn: Connection, data: DocumentBody): Promise<CreateResult> {
  const result = await conn.request<CreateResult>({
    url: `/services/data/v${conn.getApiVersion()}/sobjects/Document`,
    body: JSON.stringify(data),
    method: 'POST',
  });

  if (result.success) {
    console.log(`New Document ${result.name} created with id ${result.id}`);
  } else {
    throw new SfdxError(`Failed to create document: ${JSON.stringify(result)}`);
  }

  return result;
}
