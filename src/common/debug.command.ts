import { readFileSync } from 'fs';
import * as os from 'os';
import * as path from 'path';
import { SfdxCommand } from '@salesforce/command';
import { default as axios } from 'axios';
import { Org as oorg, Org, SfdxError } from '@salesforce/core';
import DebugSessionInfo from '../types/DebugSessionInfo';
import { getDebugClientHeaders } from '../utils/auth.utils';
import { OrgInfo } from '../types/common.types';
import { logError } from './log.handler';

export abstract class DebugSfdxCommand extends SfdxCommand {
  protected getDebugSessionFromFile(): DebugSessionInfo | null {
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

  protected async getOrgInfo(orgId: string): Promise<OrgInfo> {
    try {
      return (await axios.get(`https://canvas.velocpq.com/org-info/${orgId}`)).data as OrgInfo;
    } catch (e) {
      throw new SfdxError('Failed to get org-info');
    }
  }

  protected getInstanceUrl(org: Org): string {
    const instanceUrl = org.getField(oorg.Fields.INSTANCE_URL) as string;
    return instanceUrl.replace(/\/$/, '');
  }

  protected async getDebugSession(devToken: string, org: Org): Promise<DebugSessionInfo> {
    const orgId = org.getField(oorg.Fields.ORG_ID) as string;
    const backendUrl = (await this.getOrgInfo(orgId)).BackendURL;
    const instanceUrl = this.getInstanceUrl(org);
    const accessToken = org.getConnection().accessToken;

    return {
      token: devToken,
      backendUrl,
      orgId,
      instanceUrl,
      accessToken,
    };
  }
}
