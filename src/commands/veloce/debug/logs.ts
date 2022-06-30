import { readFileSync } from 'fs';
import * as os from 'os';
import * as path from 'path';
import { SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { AxiosError, default as axios } from 'axios';
import { getDebugClientHeaders } from '../../../utils/auth.utils';
import { EOL } from 'node:os';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('veloce-sfdx-v3', 'debug-logs');

export default class Org extends SfdxCommand {
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
    const homedir = os.homedir();
    const debugSessionFile = path.join(homedir, '.veloce-sfdx/debug.session');
    let debugSession: { [key: string]: any };
    try {
      debugSession = JSON.parse(readFileSync(debugSessionFile).toString());
    } catch (e) {
      this.ux.log('No active debug session found, please start debug session using veloce:debug');
      return {};
    }

    const headers = getDebugClientHeaders(debugSession);
    const backendUrl: string | undefined = debugSession.backendUrl;

    this.ux.log('Following the backend logs...');

    await new Promise(() => void this.callToGetLogs(backendUrl, headers));

    return {};
  }

  private async callToGetLogs(
    backendUrl: string | undefined,
    headers: { Authorization: string; 'dev-token': any },
  ): Promise<void> {
    try {
      const response = await axios.get(`${backendUrl}/services/dev-override/logs`, { headers });
      if (response.data !== '') {
        this.ux.log(response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        this.ux.log(`Failed to get logs: ${error.response?.data} code ${error.response?.status}`);
      } else {
        this.ux.log(`Failed to get logs: ${JSON.stringify(error)}`);
      }
    } finally {
      setTimeout(() => void this.callToGetLogs(backendUrl, headers), 1000);
    }
  }
}
