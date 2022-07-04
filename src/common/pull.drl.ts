import { Connection } from '@salesforce/core';
import { Member } from '../types/member.types';
import { getDroolGroups, Group, saveDroolGroups } from '../utils/drools.utils';

export interface PullDRLParams {
  sourcepath: string;
  conn: Connection;
  member: Member | undefined;
}

export async function pullDRL(params: PullDRLParams): Promise<string[]> {
  const { sourcepath, conn, member } = params;
  if (!member) {
    return [];
  }
  const groups: Group[] = await getDroolGroups(conn, member.names);
  saveDroolGroups(groups, sourcepath + '/drl');

  return [];
}
