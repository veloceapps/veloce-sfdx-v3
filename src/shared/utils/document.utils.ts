import { gunzipSync } from 'zlib';
import { Connection, SfdxError } from '@salesforce/core';
import { Document, DocumentBody } from '../types/document.types';
import { CreateResult } from '../types/common.types';

export async function fetchDocumentAttachment(conn: Connection, documentId: string): Promise<string | undefined> {
  const url: string = (await fetchDocument(conn, documentId))?.Body;
  if (!url) {
    return;
  }

  const res = await conn.request({url});

  const gzipped = Buffer.from(res.toString(), 'base64');
  return gunzipSync(gzipped).toString();
}

export async function fetchDocument(conn: Connection, documentName: string): Promise<Document | undefined> {
  const query = `Select Id, Body, FolderId from Document WHERE Name='${documentName}' Limit 1`;

  const result = await conn.query<Document>(query);
  const [record] = result?.records ?? [];

  if (!record) {
    console.log(`Document not found: ${documentName}`);
    return;
  }

  return record;
}

export async function updateDocument(conn: Connection, documentId: string, data: DocumentBody): Promise<any> {
  console.log(`Patching existing document ${data.name} with id ${documentId}`);

  return await conn.request({
    url: `/services/data/v${conn.getApiVersion()}/sobjects/Document/${documentId}`,
    body: JSON.stringify(data),
    method: 'PATCH'
  });
}

export async function createDocument(conn: Connection, data: DocumentBody): Promise<CreateResult> {
  const result = await conn.request<CreateResult>({
    url: `/services/data/v${conn.getApiVersion()}/sobjects/Document`,
    body: JSON.stringify(data),
    method: 'POST'
  });

  if (result.success) {
    this.ux.log(`New Document ${result.name} created with id ${result.id}`)
  } else {
    throw new SfdxError(`Failed to create document: ${JSON.stringify(result)}`)
  }

  return result;
}
