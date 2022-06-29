import {Connection} from '@salesforce/core';
import {Member} from '../types/member.types';

export interface PushPmlParams {
  rootPath: string;
  conn: Connection;
  member: Member | undefined;
}

export async function pushUI(params: PushPmlParams): Promise<string[]> {
  const { rootPath, conn, member } = params;
  if (member === undefined){
    return []
  }
  const sourcePath: string = rootPath + '/config-ui';
  console.log(sourcePath)
  console.log(conn.toString())
  console.log(member.toString())
  await Promise.resolve(); // todo remove, added for eslint error
  return []
}
