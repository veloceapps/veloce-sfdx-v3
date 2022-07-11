import {
  createRuleAction,
  createUpdateRule,
  createUpdateRuleCondition,
  createUpdateRuleGroup,
  createUpdateRuleTransformation,
  getRuleGroups,
} from '../utils/rule.utils';
import { CommandParams } from '../types/command.types';

export async function pushRule(params: CommandParams): Promise<string[]> {
  const { rootPath, conn, member } = params;
  if (!member) {
    return [];
  }

  const names = member.all ? undefined : Array.from(member.names).map((ui) => ui.split(':')[0]);
  const ruleGroups = getRuleGroups(rootPath + '/rule', names);

  const result = [];

  for (const ruleGroup of ruleGroups) {
    const ruleGroupResult = await createUpdateRuleGroup(conn, ruleGroup);

    for (const rule of ruleGroup.rules) {
      const ruleResult = await createUpdateRule(conn, rule, ruleGroupResult.id, ruleGroup);
      result.push(ruleResult.id);

      for (const condition of rule.conditions || []) {
        await createUpdateRuleCondition(conn, condition, ruleResult.id);
      }

      for (const transformation of rule.transformations || []) {
        await createUpdateRuleTransformation(conn, transformation, ruleResult.id);
      }

      for (const action of rule.mappers || []) {
        await createRuleAction(conn, action, ruleResult.id);
      }
    }
  }

  return result;
}
