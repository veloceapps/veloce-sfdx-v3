import { readFileSync } from 'fs';
import * as os from 'os';
import * as path from 'path';
import { SfdxCommand } from '@salesforce/command';
import DebugSessionInfo from '../types/DebugSessionInfo';

export abstract class DebugSfdxCommand extends SfdxCommand {
  protected getDebugSession(): DebugSessionInfo | null {
    const homedir = os.homedir();
    const debugSessionFile = path.join(homedir, '.veloce-sfdx/debug.session');

    try {
      return JSON.parse(readFileSync(debugSessionFile).toString()) as DebugSessionInfo;
    } catch (e) {
      return null;
    }
  }
}
