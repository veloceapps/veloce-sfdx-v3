/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import * as os from 'os';
import {flags, SfdxCommand} from '@salesforce/command';
import {Messages} from '@salesforce/core';
import {AnyJson} from '@salesforce/ts-types';
import {pushPml} from '../../../common/push.pml';
import {pushUI} from '../../../common/push.ui';
import {pushPM} from '../../../common/push.pm';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('veloce-sfdx-v3', 'source-push');

export default class Push extends SfdxCommand {
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

  private static splitMembers(members: string): { pmlsToUpload: Set<string>; uisToUpload: Set<string> } {
    const pmlsToUpload = new Set<string>()
    const uisToUpload = new Set<string>()
    const membersArray = members.split(',')
    for(const m of membersArray) {
      const parts = m.split(':')
      switch (parts[0]) {
        case 'pml':
          pmlsToUpload.add(parts[1])
          break
        case 'config-ui':
          // Todo support Ui Definition Names: -m config-ui:Cato:Default\ UI
          uisToUpload.add(parts[1])
          break
      }
    }
    return {pmlsToUpload, uisToUpload}
  }

  public async run(): Promise<AnyJson> {
    if(!this.org) {
      return Promise.reject('Org is not defined');
    }

    const conn = this.org.getConnection();
    const members = (this.flags.members || '') as string;
    const pushAll = members === '';
    const sourcepath = ((this.flags.sourcepath || 'source') as string).replace(/\/$/, ''); // trim last slash if present

    const {pmlsToUpload, uisToUpload} = Push.splitMembers(members)
    const pmsToUpload = new Set<string>() // PM entities to uplaod

    const {pmlPmsToUpload, pmlRecords} = await pushPml({sourcepath, conn, pushAll, pmlsToUpload})
    // each uploaded pml record adds pm record to set of to be uploaded
    pmlPmsToUpload.forEach(item => pmsToUpload.add(item))

    const {uiPmsToUpload, uiRecords} = await pushUI({sourcepath, conn, pushAll, uisToUpload})
    // each uploaded pml record adds pm record to set of to be uploaded
    uiPmsToUpload.forEach(item => pmsToUpload.add(item))

    const pmRecords = await pushPM({sourcepath, conn, pushAll, pmsToUpload})

    // Return an object to be displayed with --json
    return {'pml': pmlRecords, 'ui': uiRecords, 'pm': pmRecords};
  }
}
