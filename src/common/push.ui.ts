import {Connection} from '@salesforce/core';
import {Criteria} from '../utils/push';

export interface PushPmlParams {
  rootPath: string;
  conn: Connection;
  criteria: Criteria | undefined;
}

export async function pushUI(params: PushPmlParams): Promise<string[]> {
  const { rootPath, conn, criteria } = params;
  if (criteria === undefined){
    return []
  }
  const sourcePath: string = rootPath + '/config-ui';
  console.log(sourcePath)
  console.log(conn.toString())
  console.log(criteria.toString())
  await Promise.resolve(); // todo remove, added for eslint error
  return []
}
