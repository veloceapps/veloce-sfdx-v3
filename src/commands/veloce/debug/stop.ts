import { EOL } from 'node:os';
import { existsSync } from 'node:fs';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { flags } from '@salesforce/command';
import { DebugSfdxCommand } from '../../../common/debug.command';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('veloce-sfdx-v3', 'debug-stop');

export default class Org extends DebugSfdxCommand {
  public static description = messages.getMessage('commandDescription');
  public static examples = messages.getMessage('examples').split(EOL);

  public static args = [];

  protected static flagsConfig = {
    noproject: flags.boolean({
      char: 'P',
      description: messages.getMessage('noprojectFlagDescription'),
    }),
    'dev-token': flags.string({
      description: messages.getMessage('devtokenFlagDescription'),
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
    const devToken = this.flags['dev-token'];
    let debugSession = this.getDebugSessionFromFile();
    if (!debugSession?.token && !devToken) {
      this.ux.log('No active debug session found, please start debug session using veloce:debug Or provide token as command parameter');
      return {};
    }

    if (!debugSession) {
      debugSession = await this.getDebugSession(devToken, this.org);
    }

    if (devToken) {
      debugSession = {...debugSession, token: devToken};
    }

    await this.stopDebugSession(debugSession);
    // Return an object to be displayed with --json
    return {};
  }
}
