import {Connection} from '@salesforce/core';
import {Criteria} from '../utils/push';

export interface PushDRLParams {
  rootPath: string;
  conn: Connection;
  criteria: Criteria | undefined;
}

export async function pushDRL(params: PushDRLParams): Promise<string[]> {
  const {rootPath, conn, criteria} = params;
  if (criteria === undefined) {
    return []
  }
  const sourcePath: string = rootPath + '/drl';
  console.log(sourcePath)
  console.log(conn.toString())
  console.log(criteria.toString())
  await Promise.resolve(); // todo remove, added for eslint error
  return []
}
