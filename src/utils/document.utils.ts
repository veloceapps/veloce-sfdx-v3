import { gunzipSync } from 'zlib';
import { Connection } from '@salesforce/core';

export async function fetchDocumentAttachment(conn: Connection, documentId: string): Promise<string|undefined> {
  const query = `Select Body from Document WHERE Id='${documentId}'`

  const result = await conn.query<{ Body: string }>(query)
  const [record] = result?.records ?? []

  if (!record) {
    console.log(`Document not found: ${documentId}`);
    return;
  }

  const url: string = record?.Body;

  const res = await conn.request({url});

  const gzipped = Buffer.from(res.toString(), 'base64');
  return gunzipSync(gzipped).toString();
}
