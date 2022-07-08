import { getDroolGroups, Group, saveDroolGroups } from '../utils/drools.utils';
import { CommandParams } from '../types/command.types';

export async function pullDRL(params: CommandParams): Promise<string[]> {
  const { rootPath, conn, member } = params;
  if (!member) {
    return [];
  }
  const groups: Group[] = await getDroolGroups(conn, member.names);
  saveDroolGroups(groups, rootPath + '/drl');

  return [];
}
