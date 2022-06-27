import {existsSync, mkdirSync, writeFileSync} from 'node:fs';
import {Connection} from '@salesforce/core';

export async function pullPM(sourcepath: string, conn: Connection, dumpAll: boolean, pmsToDump: Set<string>): Promise<ProductModel[]> {
  // and LAST ONE ProductModel handlings
  let pmQuery = ''
  if (dumpAll) {
    // Dump ALL PM
    pmQuery = 'Select Id,Name,VELOCPQ__ContentId__c,VELOCPQ__UiDefinitionsId__c,VELOCPQ__Version__c,VELOCPQ__ReferenceId__c from VELOCPQ__ProductModel__c';
    console.log('Dumping All PMs')
  } else if (pmsToDump.size === 0) {
    return []
  } else {
    // Dump some members only
    pmQuery = `Select Id,Name,VELOCPQ__ContentId__c,VELOCPQ__UiDefinitionsId__c,VELOCPQ__Version__c,VELOCPQ__ReferenceId__c from VELOCPQ__ProductModel__c WHERE Name IN ('${Array.from(pmsToDump.values()).join("','")}')`;
    console.log(`Dumping PMs with names: ${Array.from(pmsToDump.values()).join(',')}`)
  }
  // Query ProductModels
  const pmResult = await conn.query<ProductModel>(pmQuery);
  console.log(`PMs result count: ${pmResult.totalSize}`)
  for (const r of pmResult.records) {
    if (!existsSync(sourcepath)) {
      mkdirSync(sourcepath, { recursive: true })
    }

    writeFileSync(`${sourcepath}/${r.Name}.json`, JSON.stringify({
      Id: r.Id,
      Name: r.Name,
      /* eslint-disable camelcase */ VELOCPQ__ContentId__c: r.VELOCPQ__ContentId__c,
      /* eslint-disable camelcase */ VELOCPQ__UiDefinitionsId__c: r.VELOCPQ__UiDefinitionsId__c,
      /* eslint-disable camelcase */ VELOCPQ__Version__c: r.VELOCPQ__Version__c,
      /* eslint-disable camelcase */ VELOCPQ__ReferenceId__c: r.VELOCPQ__ReferenceId__c, // TODO: add more
    }, null, '  '),{flag: 'w+'})
  }
  return pmResult.records
}
