/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import * as os from 'os';
import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('veloce-sfdx-v3', 'source-pull');


export default class Pull extends SfdxCommand {
  public static description = messages.getMessage('commandDescription');

  public static examples = messages.getMessage('examples').split(os.EOL);

  public static args = [];

  // -u quick-guide
  // -m model:Octa
  // -p ./source/templates

  protected static flagsConfig = {
    // flag with a value (-m, --members=VALUE)
    members: flags.string({
      char: 'm',
      description: messages.getMessage('membersFlagDescription'),
    }),
    sourcepath: flags.string({
      char: 'p',
      description: messages.getMessage('sourcepathFlagDescription'),
    }),
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    const conn = this.org.getConnection();
    const members = (this.flags.members || '') as string;
    const sourcepath = ((this.flags.sourcepath || 'source') as string).replace(/\/$/, ''); // trim last slash if present

    const pmls: string[] = []
    const membersArray = members.split(',')
    for(const m of membersArray) {
      const parts = m.split(':')
      if (parts[0] === 'pml' && parts[1]) {
        pmls.push(parts[1])
      }
    }
    interface ProductModel {
      [key: string]: string;
    }
    let pmlQuery: string
    if (members === '') {
      // Dump ALL
      // PML
      pmlQuery = 'Select Id,Name,VELOCPQ__ContentId__c,VELOCPQ__Version__c from VELOCPQ__ProductModel__c';
      this.ux.log('Dumping All PMLs')
    } else if (pmls.length > 0) {
      // Dump some members only
      pmlQuery = `Select Id,Name,VELOCPQ__ContentId__c,VELOCPQ__Version__c from VELOCPQ__ProductModel__c WHERE Name IN ('${pmls.join("','")}')`;
      this.ux.log(`Dumping PMLs with names: ${pmls.join(',')}`)
    }

    // Query the org
    const pmlResult = await conn.query<ProductModel>(pmlQuery);
    this.ux.log(`PMLs result count: ${pmlResult.totalSize}`)
    for (const r of pmlResult.records) {
      mkdirSync(sourcepath)
      writeFileSync(`${sourcepath}/${r.Name}.pml.json`, JSON.stringify({
        Id: r.Id,
        Name: r.Name,
        /* eslint-disable camelcase */ VELOCPQ__ContentId__c: r.VELOCPQ__ContentId__c,
        /* eslint-disable camelcase */ VELOCPQ__Version__c: r.VELOCPQ__Version__c,
      }, null, '  '),{flag: 'w+'})
      writeFileSync(`${sourcepath}/${r.Name}.pml`, r.VELOCPQ__ContentId__c,{flag: 'w+'})
    }
    // Return an object to be displayed with --json
    return { 'pmls': pmlResult.records };
  }
}
