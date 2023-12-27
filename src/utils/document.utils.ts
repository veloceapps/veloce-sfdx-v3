import { brotliDecompress, gunzipSync } from 'zlib';
import { Connection, SfdxError } from '@salesforce/core';
import { Document, DocumentBody } from '../types/document.types';
import { CreateResult } from '../types/common.types';

// https://stackoverflow.com/questions/71868696/check-if-file-is-compressed-browser-side
const checkSequence = (sequence: number[], bytes: Uint8Array): boolean => {
  if (sequence.length > bytes.length) {
    throw new Error(`bytes.size ${bytes.length} sequence.length ${sequence.length}`);
  }
  for (let index = 0; index < sequence.length; index++) {
    const byte = bytes[index];
    if (byte !== sequence[index]) {
      return false;
    }
  }
  return true;
};

export async function fetchDocumentContent(conn: Connection, documentId: string): Promise<string | undefined> {
  const url: string | undefined = (await fetchDocument(conn, documentId))?.Body;
  if (!url) {
    console.log(`Document Body not found: ${documentId}`);
    return;
  }

  const res = await conn.request({ url });

  const gzipped = Buffer.from(res.toString(), 'base64');
  // GZIP compressed file
  if (checkSequence([0x1f, 0x8b], gzipped)) {
    return gunzipSync(gzipped).toString();
  }
  return new Promise((resolve, reject) => {
    brotliDecompress(gzipped, (err, data) => {
      if (err) {
        reject(err);
        console.error('brotliDecompress: An error occurred:', err);
      } else {
        resolve(data.toString('utf8'));
      }
    });
  });
}

export async function fetchDocument(conn: Connection, documentId: string): Promise<Document | undefined> {
  if (!documentId) {
    console.debug('DocumentId is null');
    return;
  }
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
    console.log(`New Document ${data.name} created with id ${result.id}`);
  } else {
    throw new SfdxError(`Failed to create document: ${JSON.stringify(result)}`);
  }

  return result;
}
