import {EOL} from 'node:os';
import {flags} from '@salesforce/command';
import {Messages} from '@salesforce/core';
import {AnyJson} from '@salesforce/ts-types';
import {default as axios} from 'axios';
import {DebugSfdxCommand} from '../../../common/debug.command';
import {Criteria, splitMembers} from '../../../utils/push';
import {extractGroupsFromFolder} from '../../../utils/drools.utils';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('veloce-sfdx-v3', 'debug-push');

export default class Org extends DebugSfdxCommand {
  public static description = messages.getMessage('commandDescription');
  public static examples = messages.getMessage('examples').split(EOL);

  public static args = [];

  protected static flagsConfig = {
    members: flags.string({char: 'm', description: messages.getMessage('metaDataTypeDescription'), required: true}),
    path: flags.string({char: 'p', description: messages.getMessage('pathFlagDescription')})
  };

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

    const members = (this.flags.members) as string;
    const rootPath = ((this.flags.sourcepath || 'source') as string).replace(/\/$/, ''); // trim last slash if present

    const criteriaMap: {[key: string]: Criteria} = splitMembers(members);

    await this.sendDrools(debugSession, rootPath, criteriaMap['drl']);
    // Return an object to be displayed with --json
    return {};
  }

  private async sendDrools(debugSession: { [p: string]: any }, rootPath: string, criteria: Criteria): Promise<void> {
    if (criteria === undefined){
      return;
    }
    const sourcePath = rootPath +  '/drl';
    const params = {
      'veloceNamespace': '',
      'instanceUrl': `${debugSession.instanceUrl as string}`,
      'organizationId': `${debugSession.orgId as string}`,
      'oAuthHeaderValue': 'Dummy'
    }
    const authorization = Buffer.from(JSON.stringify(params)).toString('base64')
    console.log(debugSession.token);
    const headers = {
      'dev-token': debugSession.token,
      Authorization: authorization,
      'Content-Type': 'application/json',
    };
    const backendUrl: string | undefined = debugSession.backendUrl;

    const result = extractGroupsFromFolder(sourcePath);
    for (const group of result) {
      if (criteria.all || criteria.names.includes(group.name)) {
        try {
          await axios.post(`${backendUrl}/services/dev-override/drools/${group.priceListId}`, group, {
            headers
          })
        } catch ({data}) {
          this.ux.log(`Failed to deploy ${group.name}: ${data as string}`);
        }
      }
    }
  }
}
