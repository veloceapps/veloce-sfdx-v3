import { Connection, SfdxError } from '@salesforce/core';
import { CreateResult } from '../types/common.types';
import { ContentVersion, ContentDocument } from '../types/contentDocument.types';

export async function fetchContentDocument(conn: Connection, documentId: string): Promise<ContentDocument|undefined> {
  const query = `Select Id from ContentDocument WHERE Id='${documentId}'`;

  const result = await conn.query<ContentDocument>(query);
  const [record] = result?.records ?? [];

  if (!record) {
    console.log(`Content Document not found: ${documentId}`);
    return;
  }

  return record;
}

export async function fetchContentVersion(conn: Connection, contentVersionId?: string, documentId?: string): Promise<ContentVersion|undefined> {
  if (!contentVersionId && !documentId) {
    console.debug('ContentVersionId and documentId is null');
    return;
  }

  let query = 'Select VersionData,Id,ContentDocumentId from ContentVersion WHERE IsLatest = true';
  if (documentId) {
    query += ` AND ContentDocumentId='${documentId}'`;
  }
  if (contentVersionId) {
    query += ` AND Id='${contentVersionId}'`;
  }

  const result = await conn.query<ContentVersion>(query);
  const [record] = result?.records ?? [];

  if (!record) {
    console.log('Failed to query ContentVersion record, no results');
    return;
  }

  return record;
}

export async function createContentVersion(conn: Connection, data: ContentVersion): Promise<CreateResult> {
  const result = await conn.request<CreateResult>({
    url: `/services/data/v${conn.getApiVersion()}/sobjects/ContentVersion`,
    body: JSON.stringify(data),
    method: 'POST',
  });

  if (result.success) {
    console.log(`New ContentVersion ${result.name} created with id ${result.id}`);
  } else {
    throw new SfdxError(`Failed to create ContentVersion: ${JSON.stringify(result)}`);
  }

  return result;
}

export async function updateContentVersion(conn: Connection, id: string, data: ContentVersion): Promise<void> {
  console.log(`Patching existing ContentVersion with id ${id}`);

  return await conn.request({
    url: `/services/data/v${conn.getApiVersion()}/sobjects/ContentVersion/${id}`,
    body: JSON.stringify(data),
    method: 'PATCH',
  });
}

export async function createOrUpdateContentDocument(conn: Connection, data: ContentVersion, fileData?: Buffer, docId?: string): Promise<string> {
  const isDocExists = Boolean(docId && await fetchContentDocument(conn, docId));

  if (docId && isDocExists) {
    const contentVersion = await fetchContentVersion(conn, undefined, docId);
    if (!contentVersion) {
      throw new SfdxError(`Failed to fetch ContentVersion with ContentDocumentId: ${docId}`);
    }
    if (!contentVersion.Id) {
      throw new SfdxError(`Fetched ContentVersion is missing Id property: ${docId}`);
    }

    const res = ((await conn.request({ url: contentVersion.VersionData, encoding: null } as any)) as unknown) as Buffer;
    if (fileData && res.compare(fileData) === 0) {
      console.log(`Identical document is already uploaded: ${docId}, skipping patching of ContentVersion!`);
      return docId;
    }

    await updateContentVersion(conn, contentVersion.Id, {
      ...data,
      ContentDocumentId: docId,
      VersionData: fileData && fileData.toString('base64'),
    });
    return docId;
  } else {
    const contentVersionId = (await createContentVersion(conn, {
      ...data,
      VersionData: fileData && fileData.toString('base64'),
    }))?.id;
    const contentVersion = await fetchContentVersion(conn, contentVersionId);
    if (!contentVersion) {
      throw new SfdxError(`Failed to fetch ContentVersion with Id: ${contentVersionId}`);
    }
    if (!contentVersion.ContentDocumentId) {
      throw new SfdxError(`Fetched ContentVersion is missing ContentDocumentId property: ${contentVersionId}`);
    }
    return contentVersion.ContentDocumentId;
  }
}

