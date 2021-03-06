import { EOL } from 'node:os';
import { existsSync } from 'node:fs';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { default as axios } from 'axios';
import { flags } from '@salesforce/command';
import { getDebugClientHeaders } from '../../../utils/auth.utils';
import { DebugSfdxCommand } from '../../../common/debug.command';
import { logError } from '../../../common/log.handler';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('veloce-sfdx-v3', 'debug-list');

export default class Org extends DebugSfdxCommand {
  public static description = messages.getMessage('commandDescription');
  public static examples = messages.getMessage('examples').split(EOL);

  public static args = [];

  protected static flagsConfig = {
    noproject: flags.boolean({
      char: 'P',
      description: messages.getMessage('noprojectFlagDescription'),
    }),
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    if (!existsSync('sfdx-project.json') && this.flags.noproject === false) {
      return Promise.reject('You must have sfdx-project.json while runnign this plugin.');
    }

    const debugSession = this.getDebugSessionFromFile();
    if (!debugSession) {
      this.ux.log('No active debug session found, please start debug session using veloce:debug');
      return {};
    }
    const headers = getDebugClientHeaders(debugSession);
    const backendUrl: string | undefined = debugSession.backendUrl;

    try {
      const result = await axios.post<string[]>(
        `${backendUrl}/services/dev-override/list`,
        {},
        {
          headers,
        },
      );
      console.log(result.data.join('\n'));
    } catch (error) {
      logError('Failed to list debug sessions', error);
      return {};
    }
    // Return an object to be displayed with --json
    return {};
  }
}
