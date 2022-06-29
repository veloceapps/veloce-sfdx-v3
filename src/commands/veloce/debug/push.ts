import { EOL } from 'node:os';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { default as axios } from 'axios';
import { DebugSfdxCommand } from '../../../common/debug.command';
import { getAuthToken } from '../../../utils/auth.utils';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('veloce-sfdx-v3', 'debug-push');

export default class Org extends DebugSfdxCommand {
  public static description = messages.getMessage('commandDescription');
  public static examples = messages.getMessage('examples').split(EOL);

  public static args = [];

  protected static flagsConfig = {};

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    const debugSession = this.getDebugSession();
    if (!debugSession) {
      this.ux.log('No active debug session found, please start debug session using veloce:debug');
      return {};
    }

    const authorization = getAuthToken({
      veloceNamespace: '',
      instanceUrl: debugSession.instanceUrl,
      organizationId: debugSession.orgId,
      oAuthHeaderValue: 'Dummy',
    });
    const headers = {
      'dev-token': debugSession.token,
      Authorization: authorization,
      'Content-Type': 'application/json',
    };
    const backendUrl: string | undefined = debugSession.backendUrl;

    try {
      await axios.post(
        `${backendUrl}/services/dev-override/push`,
        {},
        {
          headers,
        },
      );
    } catch ({ data }) {
      this.ux.log(`Failed to list debug sessions: ${data as string}`);
      return {};
    }
    // Return an object to be displayed with --json
    return {};
  }
}
