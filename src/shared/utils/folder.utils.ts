import { Connection, SfdxError } from '@salesforce/core';
import { SuccessResult } from 'jsforce/record-result';
import { Folder, NewFolder } from '../types/folder.types';

export async function fetchFolder(conn: Connection, foldername: string): Promise<Folder | undefined> {
  const query = `Select Id, Name, Type from Folder WHERE Name = '${foldername}' Limit 1`;

  const result = await conn.query<Folder>(query);
  const [record] = result?.records ?? [];

  if (!record) {
    console.log('Folder not found');
    return;
  }

  return record;
}

export async function createFolder(conn: Connection, foldername: string): Promise<SuccessResult> {
  const folder: NewFolder = {
    Name: foldername,
    DeveloperName: foldername,
    Type: 'Document',
    AccessType: 'Public'
  };
  const result = await conn.sobject('Folder').create(folder);

  if (result.success) {
    console.log(`New folder created ${foldername} with id ${result.id}`);
  } else {
    throw new SfdxError(`Failed to create folder: ${JSON.stringify(result)}`);
  }

  return result;
}
