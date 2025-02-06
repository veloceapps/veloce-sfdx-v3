/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import * as os from 'os';
import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { MembersMap } from '../../../common/members.map';
import { writeFileSafe } from '../../../utils/common.utils';
import { initContext } from '../../../utils/context';
import { getPath } from '../../../utils/path.utils';
import { UiDefinitionsBuilder } from '../../../utils/ui.utils';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('veloce-sfdx-v3', 'source-pack');

export default class Pack extends SfdxCommand {
  public static description = messages.getMessage('commandDescription');

  public static examples = messages.getMessage('examples').split(os.EOL);

  public static args = [];

  protected static flagsConfig = {
    members: flags.string({
      char: 'm',
      description: messages.getMessage('membersFlagDescription'),
      required: true,
    }),
    sourcepath: flags.string({
      char: 'p',
      description: messages.getMessage('sourcepathFlagDescription'),
    }),
    outputpath: flags.string({
      char: 'o',
      description: messages.getMessage('outputpathFlagDescription'),
    }),
    idmap: flags.string({
      char: 'I',
      description: messages.getMessage('idmapFlagDescription'),
    }),
  };

  // Comment this out if your command does not require an org username
  // protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  // protected static supportsDevhubUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    const ctx = initContext(this);

    const memberMap = new MembersMap(this.flags.members ?? '');
    const rootPath = getPath(this.flags.sourcepath) ?? 'source';
    const outputPath = getPath(this.flags.outputpath);
    const idmapPath = getPath(this.flags.idmap);

    if (memberMap.get('config-ui')) {
      const definitionName = memberMap.get('config-ui')?.names[0];

      if (!definitionName) {
        return null;
      }

      ctx.initIdmap(idmapPath);

      const uiBuilder = new UiDefinitionsBuilder();
      const uiDef = uiBuilder.packv2(`${rootPath}/config-ui`, definitionName);

      if (outputPath) {
        writeFileSafe(`${outputPath}/${definitionName}`, 'definition.json', JSON.stringify(uiDef, null, 2) + '\n');
      }

      return Promise.resolve({});
    }

    return Promise.resolve({});
  }
}
