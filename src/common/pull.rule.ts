import { SFProcedureRule } from '../types/rule.types';
import { fetchProcedureRules, saveProcedureRules } from '../utils/rule.utils';
import { CommandParams } from '../types/command.types';

export async function pullRule(params: CommandParams): Promise<string[]> {
  const { idmap, rootPath, conn, member } = params;
  if (!member) {
    return [];
  }

  const names = member.all ? undefined : Array.from(member.names).map((ui) => ui.split(':')[0]);

  console.log(
    `Dumping ${member.all ? 'All Procedure Rules' : 'Procedure Rules with group names: ' + (names?.join() ?? '')}`,
  );
  const procedureRules: SFProcedureRule[] = await fetchProcedureRules(conn, member.all, names);
  console.log(`Dumping Rules result count: ${procedureRules.length}`);

  saveProcedureRules(procedureRules, rootPath + '/rule', idmap);

  return procedureRules.map(({ Id }) => Id);
}
