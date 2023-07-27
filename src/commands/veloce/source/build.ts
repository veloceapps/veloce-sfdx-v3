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
import { saveUIElement } from '../../../common/pull.ui';
import { UiDefinition, UiMetadata } from '../../../types/ui.types';
import { writeFileSafe } from '../../../utils/common.utils';
import { getPath } from '../../../utils/path.utils';
import { isLegacyDefinition, UiDefinitionsBuilder } from '../../../utils/ui.utils';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('veloce-sfdx-v3', 'source-build');

export default class Build extends SfdxCommand {
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
  };

  // Comment this out if your command does not require an org username
  // protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  // protected static supportsDevhubUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public run(): Promise<AnyJson> {
    const memberMap = new MembersMap(this.flags.members ?? '');
    const rootPath = getPath(this.flags.sourcepath) ?? 'source';
    const outPath = getPath(this.flags.outputpath) ?? 'out';

    if (memberMap.get('config-ui')) {
      const modelName = memberMap.get('config-ui')?.names[0];
      if (modelName) {
        const uiBuilder = new UiDefinitionsBuilder(`${rootPath}/config-ui`, modelName);
        const uiDefs = uiBuilder.pack();

        for (const uiDef of uiDefs) {
          if (!isLegacyDefinition(uiDef)) {
            this.saveUiDefinition(uiDef, `${outPath}/${uiDef.name}`);
          }
        }
      }
    }

    return Promise.resolve({});
  }

  private saveUiDefinition(ui: UiDefinition, path: string): void {
    const { children, ...rest } = ui;

    // save elements recursively
    const childrenNames = children.reduce((acc, child) => {
      const elName = saveUIElement(child, `${path}/src`);
      return elName ? [...acc, elName] : acc;
    }, [] as string[]);

    // create UI Definition metadata
    const metadata: UiMetadata = {
      ...rest,
      children: childrenNames,
    };
    writeFileSafe(path, 'metadata.json', JSON.stringify(metadata, null, 2) + '\n');
  }
}
