import { promisify } from 'node:util';
import {exec as plainExec} from 'node:child_process';

// import { writeFileSync } from 'node:fs'

const exec = promisify(plainExec);

describe('veloce:data:pull', () => {
  it('should pull veloce sources from org', async () => {
    //     var name = `HugeCorp-${Date.now()}`
    //     const dataCSV = `Id,Name,VELOCPQ__Active__c,VELOCPQ__BundleProduct__c,VELOCPQ__Comment__c,VELOCPQ__ContentId__c,VELOCPQ__EndDate__c,VELOCPQ__Pml__c,VELOCPQ__PropertyMapId__c,VELOCPQ__ReferenceId__c,VELOCPQ__StartDate__c,VELOCPQ__UiDefinitionsId__c,VELOCPQ__Version__c
    // aBQ040000008RMfGAM,${name},false,false,"Super cool company",01504000000ISZRAA4,,,,aBQ040000008RMfDAM,,01504000000ISZWAA4,
    // `
    //    writeFileSync("/tmp/VELOCPQ__ProductModel__c.csv", dataCSV)
    const cmdResult = await exec('sfdx veloce:data:pull -u sfdx-test -m model:Octa -p /tmp/');
    console.log(cmdResult.stdout);
    // var check = await exec(`sfdx force:data:soql:query  -u sfdx-test -q "select fields(all) from VELOCPQ__ProductModel__c where Name = '${name}' limit 10" --json`)
    // var checkParsed = JSON.parse(check.stdout)
    // console.log(checkParsed)
  });
});
