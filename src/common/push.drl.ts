import { Connection } from '@salesforce/core';
import { Member } from '../types/member.types';

export interface PushDRLParams {
  rootPath: string;
  conn: Connection;
  member: Member | undefined;
}

export async function pushDRL(params: PushDRLParams): Promise<string[]> {
  const { rootPath, conn, member } = params;
  if (!member) {
    return [];
  }
  const sourcePath: string = rootPath + '/drl';
  console.log(sourcePath);
  console.log(conn.toString());
  console.log(member.toString());
  await Promise.resolve(); // todo remove, added for eslint error
  return [];
}
