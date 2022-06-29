import {Connection} from '@salesforce/core';

export interface PushPmlParams {
  sourcepath: string;
  conn: Connection;
  pushAll: boolean;
  uisToUpload: Set<string>;
}

export async function pushUI(params: PushPmlParams): Promise<string[]> {
  const { sourcepath, conn, pushAll, uisToUpload } = params;
  console.log(sourcepath)
  console.log(conn.toString())
  console.log(pushAll.toString())
  console.log(uisToUpload.toString())
  await Promise.resolve(); // todo remove, added for eslint error
  return []
}
