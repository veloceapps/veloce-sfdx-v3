/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import * as os from 'os';
import { existsSync } from 'node:fs';
import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { pushModel } from '../../../common/push.model';
import { pushUI } from '../../../common/push.ui';
import { pushDRL } from '../../../common/push.drl';
import { MembersMap } from '../../../common/members.map';
import { pushSettings } from '../../../common/push.settings';
import { pushRule } from '../../../common/push.rule';
import { pushDocTemplates } from '../../../common/push.docTemplate';
import { loadIdMap, saveIdMap } from '../../../common/idmap';
import { initContext } from '../../../utils/context';
import { getPath } from '../../../utils/path.utils';

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
    noproject: flags.boolean({
      char: 'P',
      description: messages.getMessage('noprojectFlagDescription'),
    }),
    skipdelete: flags.boolean({
      char: 'd',
      description: messages.getMessage('skipdeleteFlagDescription'),
    }),
    idmap: flags.string({
      char: 'I',
      description: messages.getMessage('idmapFlagDescription'),
    }),
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    if (!this.org) {
      return Promise.reject('Org is not defined');
    }
    if (!existsSync('sfdx-project.json') && this.flags.noproject === false) {
      return Promise.reject('You must have sfdx-project.json while runnign this plugin.');
    }

    const ctx = initContext(this);
    const idmapPath = getPath(this.flags.idmap);
    ctx.initIdmap(idmapPath);
    const conn = this.org.getConnection();

    const members = (this.flags.members || '') as string;
    const rootPath = ((this.flags.sourcepath || 'source') as string).replace(/\/$/, ''); // trim last slash if present

    const idmap = await loadIdMap(conn);
    const memberMap = new MembersMap(members);

    const drlRecords = await pushDRL({ idmap, rootPath, conn, member: memberMap.get('drl') });

    const rule = await pushRule({ idmap, rootPath, conn, member: memberMap.get('rule') });

    const pmlRecords = await pushModel({ idmap, rootPath, conn, member: memberMap.get('model') });

    const uiRecords = await pushUI({ idmap, rootPath, conn, member: memberMap.get('config-ui') });

    const configSettingRecords = await pushSettings({
      idmap,
      rootPath,
      conn,
      member: memberMap.get('config-settings'),
      skipdelete: this.flags.skipdelete,
    });

    const docTemplateRecords = await pushDocTemplates({ idmap, rootPath, conn, member: memberMap.get('doc-template') });

    await saveIdMap(conn, idmap);

    // Return an object to be displayed with --json
    return {
      pml: pmlRecords,
      ui: uiRecords,
      drl: drlRecords,
      rule,
      'config-settings': configSettingRecords,
      'doc-template': docTemplateRecords,
    };
  }
}
