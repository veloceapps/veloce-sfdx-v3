import {Connection} from '@salesforce/core';

interface UiReturn {
  uiRecords: string[];
  uiPmsToUpload: Set<string>;
}

export interface PushPmlParams {
  sourcepath: string;
  conn: Connection;
  pushAll: boolean;
  uisToUpload: Set<string>;
}

export async function pushUI(params: PushPmlParams): Promise<UiReturn> {
  const { sourcepath, conn, pushAll, uisToUpload } = params;
  console.log(sourcepath)
  console.log(conn.toString())
  console.log(pushAll.toString())
  console.log(uisToUpload.toString())
  await Promise.resolve(); // todo remove, added for eslint error
  return {
    uiRecords: [],
    uiPmsToUpload: new Set<string>()
  }
}
