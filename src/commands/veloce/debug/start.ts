import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { EOL, homedir } from 'node:os';
import { join } from 'node:path';
import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, Org as oorg } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import axios from 'axios';
import * as open from 'open';
import { v4 as uuidv4 } from 'uuid';
import DebugSessionInfo from '../../../types/DebugSessionInfo';
import { getDebugClientHeaders } from '../../../utils/auth.utils';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('veloce-sfdx-v3', 'debug-start');

export default class Start extends SfdxCommand {
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
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    if (!this.org) {
      return Promise.reject('Org is not defined');
    }
    if (!existsSync('sfdx-project.json') && this.flags.noproject === false) {
      return Promise.reject('You must have sfdx-project.json while runnign this plugin.');
    }

    await this.org.refreshAuth(); // we need a live accessToken for the frontdoor url
    const conn = this.org.getConnection();
    const accessToken = conn.accessToken;
    const instanceUrl = this.org.getField(oorg.Fields.INSTANCE_URL) as string;
    const orgId = this.org.getField(oorg.Fields.ORG_ID) as string;

    const instanceUrlClean = instanceUrl.replace(/\/$/, '');
    const devToken = (uuidv4 as () => string)();

    const sfUrl = `${instanceUrlClean}/apex/VELOCPQ__VeloceStudioEmbedded?dev-token=${devToken.toString()}`;
    this.ux.log(sfUrl);
    void open(sfUrl, { wait: false });

    let orgInfo: { data: { [key: string]: string } };
    try {
      orgInfo = await axios.get(`https://canvas.velocpq.com/org-info/${orgId}`);
    } catch (e) {
      this.ux.log('Failed to get org-info');
      return {};
    }

    const backendUrl = orgInfo.data['BackendURL'];
    this.ux.log(`Starting debug of backend: ${backendUrl}`);

    const debugSession: DebugSessionInfo = {
      token: devToken,
      backendUrl,
      orgId,
      instanceUrl: instanceUrlClean,
      accessToken,
    };
    const headers = getDebugClientHeaders(debugSession);
    try {
      await axios.post(`${backendUrl}/services/dev-override/auth`, {}, { headers });
    } catch (e: any) {
      this.ux.log(`Failed to start debug session: ${e as string}`);
      return {};
    }

    const home = homedir();
    const veloceHome = join(home, '.veloce-sfdx');

    try {
      mkdirSync(veloceHome);
    } catch (e) {
      /* eslint no-empty: "error"*/
    }

    const debugSessionFile = join(veloceHome, 'debug.session');

    try {
      writeFileSync(debugSessionFile, JSON.stringify(debugSession), {
        encoding: 'utf8',
        flag: 'w+',
        mode: '600',
      });
    } catch (e) {
      this.ux.log(`failed to save session: ${e as string}`);
    }

    // Return an object to be displayed with --json
    return { orgId };
  }
}
