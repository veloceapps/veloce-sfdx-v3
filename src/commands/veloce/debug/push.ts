import { EOL } from 'node:os';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { flags } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { default as axios } from 'axios';
import { DebugSfdxCommand } from '../../../common/debug.command';
import { extractGroupsFromFolder } from '../../../utils/drools.utils';
import { getDebugClientHeaders } from '../../../utils/auth.utils';
import DebugSessionInfo from '../../../types/DebugSessionInfo';
import { getPath } from '../../../utils/path.utils';
import { Member } from '../../../types/member.types';
import { MembersMap } from '../../../common/members.map';
import { logError } from '../../../common/log.handler';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('veloce-sfdx-v3', 'debug-push');

export default class Push extends DebugSfdxCommand {
  public static description = messages.getMessage('commandDescription');
  public static examples = messages.getMessage('examples').split(EOL);

  public static args = [];

  protected static flagsConfig = {
    members: flags.string({ char: 'm', description: messages.getMessage('membersFlagDescription'), required: true }),
    sourcepath: flags.string({ char: 'p', description: messages.getMessage('sourcepathFlagDescription') }),
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

    const debugSession = this.getDebugSession();
    if (!debugSession) {
      this.ux.log('No active debug session found, please start debug session using veloce:debug');
      return {};
    }

    const members = this.flags.members as string;
    const rootPath = getPath(this.flags.sourcepath) ?? 'source';
    const memberMap = new MembersMap(members);

    await this.sendModel(debugSession, rootPath, memberMap.get('model'));
    await this.sendDrools(debugSession, rootPath, memberMap.get('drl'));
    // Return an object to be displayed with --json
    return {};
  }

  private findAllModels(sourcepath: string): Set<string> {
    const result = new Set<string>();
    const filenames = readdirSync(`${sourcepath}/model`);
    filenames.forEach((file) => {
      result.add(file);
    });
    return result;
  }

  private async sendModel(debugSession: DebugSessionInfo, rootPath: string, member: Member | undefined): Promise<void> {
    if (!member) {
      return;
    }
    const headers = getDebugClientHeaders(debugSession);
    const backendUrl: string = debugSession.backendUrl;
    const models = this.findAllModels(rootPath);
    for (const name of models) {
      // TODO: consider parallelizing if this will be slow?
      if (member.all || member.names.includes(name)) {
        // load PML
        const pml = readFileSync(`${rootPath}/model/${name}/${name}.pml`, 'utf8').toString();
        try {
          await axios.post(
            `${backendUrl}/services/dev-override/model/${name}/pml`,
            { content: pml },
            {
              headers,
            },
          );
        } catch (error) {
          logError('Failed to deploy', error);
        }
        this.ux.log('PML Successfully Loaded!');
      }
    }
  }

  private async sendDrools(
    debugSession: DebugSessionInfo,
    rootPath: string,
    member: Member | undefined,
  ): Promise<void> {
    if (!member) {
      return;
    }
    const sourcePath = rootPath + '/drl';
    const headers = getDebugClientHeaders(debugSession);
    const result = extractGroupsFromFolder(sourcePath);
    for (const group of result) {
      if (member.all || member.names.includes(group.name)) {
        try {
          await axios.post(`${debugSession.backendUrl}/services/dev-override/drools/${group.priceListId}`, group, {
            headers,
          });
        } catch (error) {
          logError('Failed to deploy', error);
        }
      }
    }
  }
}
