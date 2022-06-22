import {Connection} from '@salesforce/core';

interface UiReturn {
  uiRecords: string[]
  uiPmsToDump: Set<string>
}

export async function pullUI(sourcepath: string, conn: Connection, dumpAll: boolean, pmlsToDump: Set<string>): Promise<UiReturn> {
  const uiPmsToDump = new Set<string>()
  return {
    uiRecords: [],
    uiPmsToDump
  }
}
