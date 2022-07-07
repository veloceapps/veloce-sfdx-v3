import { readFileSync } from 'fs';
import * as os from 'os';
import * as path from 'path';
import { SfdxCommand } from '@salesforce/command';
import { default as axios } from 'axios';
import DebugSessionInfo from '../types/DebugSessionInfo';
import { getDebugClientHeaders } from '../utils/auth.utils';
import { logError } from './log.handler';

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

  protected async stopDebugSession(debugSession: DebugSessionInfo): Promise<void> {
    const headers = getDebugClientHeaders(debugSession);
    const backendUrl: string | undefined = debugSession.backendUrl;

    try {
      await axios.post(
        `${backendUrl}/services/dev-override/stop`,
        {},
        {
          headers,
        },
      );
    } catch (error) {
      logError('Failed to stop session', error);
    }
  }
}
