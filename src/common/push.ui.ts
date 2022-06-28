import {Connection} from '@salesforce/core';

interface UiReturn {
  uiRecords: string[];
  uiPmsToUpload: Set<string>;
}

export async function pushUI(sourcepath: string, conn: Connection, dumpAll: boolean, uisToUpload: Set<string>): Promise<UiReturn> {
  console.log(sourcepath)
  console.log(conn.toString())
  console.log(dumpAll.toString())
  console.log(uisToUpload.toString())
  await Promise.resolve(); // todo remove, added for eslint error
  return {
    uiRecords: [],
    uiPmsToUpload: new Set<string>()
  }
}
