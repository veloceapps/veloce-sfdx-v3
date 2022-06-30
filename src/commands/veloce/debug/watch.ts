import { cwd } from 'process';
import { existsSync } from 'node:fs';
import { EOL } from 'node:os';
import { flags } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { watch } from 'chokidar';
import { DebugSfdxCommand } from '../../../common/debug.command';
import { exec } from '../../../utils/common.utils';
import { getPath } from '../../../utils/path.utils';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('veloce-sfdx-v3', 'debug-watch');

enum DataType {
  MODEL = 'MODEL',
}

export default class Org extends DebugSfdxCommand {
  public static description = messages.getMessage('commandDescription');
  public static examples = messages.getMessage('examples').split(EOL);

  public static args = [];

  protected static flagsConfig = {
    sourcepath: flags.string({
      char: 'p',
      required: false,
      description: messages.getMessage('sourcepathFlagDescription'),
    }),
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

  private readonly DEFAULT_SOURCE_PATH = 'source';
  private readonly PATH = {
    MODEL: 'source/models',
  };

  public async run(): Promise<AnyJson> {
    if (!existsSync('sfdx-project.json') && this.flags.noproject === false) {
      return Promise.reject('You must have sfdx-project.json while runnign this plugin.');
    }

    const debugSession = this.getDebugSession();
    if (!debugSession) {
      this.ux.log('No active debug session found, please start debug session using veloce:debug');
      return {};
    }

    const sourcePath = getPath(this.flags.sourcepath) ?? this.DEFAULT_SOURCE_PATH;
    const exists = existsSync(sourcePath);
    if (!exists) {
      throw new SfdxError(messages.getMessage('sourcepathFlagInvalid'));
    }

    return new Promise(() => {
      this.ux.log(`Watching files in "${sourcePath}" directory...`);

      const workDir = cwd();
      const watcher = watch(sourcePath);

      watcher.on('raw', (eventName, path) => {
        if (!['created', 'modified', 'moved'].includes(eventName)) {
          return;
        }

        const filePath = path.replace(`${workDir}/`, '');
        const type = this.getChangeType(filePath);

        switch (type) {
          case DataType.MODEL:
            void this.pushPML(filePath);
            break;
          default:
            break;
        }
      });
    });
  }

  private getChangeType(filePath: string): DataType | null {
    if (filePath.startsWith(this.PATH.MODEL)) {
      return DataType.MODEL;
    }

    return null;
  }

  private async pushPML(filePath: string): Promise<void> {
    const [modelName] = filePath.replace(`${this.PATH.MODEL}/`, '').split('/');
    const targetUserName = String(this.flags.targetusername);

    this.ux.log(`Pushing Model "${modelName}"`);

    return exec(`sfdx veloce:debug:push -u ${targetUserName} -m ${modelName} -p ./${this.PATH.MODEL}`)
      .then((result) => {
        this.ux.log(result);
      })
      .catch((err) => {
        this.ux.error(err);
      });
  }
}
