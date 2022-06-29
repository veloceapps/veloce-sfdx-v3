import {EOL} from 'node:os';
import {flags} from '@salesforce/command';
import {Messages} from '@salesforce/core';
import {AnyJson} from '@salesforce/ts-types';
import {default as axios} from 'axios';
import {DebugSfdxCommand} from '../../../common/debug.command';
import {extractGroupsFromFolder} from '../../../utils/drools.utils';
import {getAuthToken} from '../../../utils/auth.utils';
import DebugSessionInfo from '../../../types/DebugSessionInfo';
import {splitMembers} from '../../../utils/push';
import {getPath} from '../../../utils/path.utils';
import {Member} from '../../../types/member.types';

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
    const rootPath = getPath(this.flags.sourcepath) ?? 'source';

    const memberMap = splitMembers(members);

    await this.sendDrools(debugSession, rootPath, memberMap['drl']);
    // Return an object to be displayed with --json
    return {};
  }

  private async sendDrools(debugSession: DebugSessionInfo, rootPath: string, member: Member): Promise<void> {
    if (member === undefined){
      return;
    }
    const sourcePath = rootPath +  '/drl';
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

    const result = extractGroupsFromFolder(sourcePath);
    for (const group of result) {
      if (member.all || member.names.includes(group.name)) {
        try {
          await axios.post(`${debugSession.backendUrl}/services/dev-override/drools/${group.priceListId}`, group, {
            headers
          })
        } catch ({data}) {
          this.ux.log(`Failed to deploy ${group.name}: ${data as string}`);
        }
      }
    }
  }
}
