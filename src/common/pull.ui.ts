import {Connection} from '@salesforce/core';

interface UiReturn {
  uiRecords: string[];
  uiPmsToDump: Set<string>;
}

export function pullUI(sourcepath: string, conn: Connection, dumpAll: boolean, pmlsToDump: Set<string>): UiReturn {
  console.log(sourcepath)
  console.log(conn.toString())
  console.log(dumpAll.toString())
  console.log(pmlsToDump.toString())

  const uiPmsToDump = new Set<string>()
  return {
    uiRecords: [],
    uiPmsToDump
  }
}
