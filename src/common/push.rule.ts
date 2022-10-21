import {
  createUpdateRule,
  createUpdateRuleAction,
  createUpdateRuleCondition,
  createUpdateRuleGroup,
  createUpdateRuleTransformation,
  getRuleGroups,
  deleteRuleActions,
  deleteRuleTransformations,
  deleteRuleConditions,
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
      if (!rule.name) {
        continue;
      }
      const ruleResult = await createUpdateRule(conn, rule, ruleGroupResult.id, ruleGroup);
      result.push(ruleResult.id);

      const conditionsResults = [];
      for (const condition of rule.conditions || []) {
        const res = await createUpdateRuleCondition(conn, condition, ruleResult.id);
        conditionsResults.push(res);
      }
      await deleteRuleConditions(
        conn,
        conditionsResults.map(({ id }) => id),
        ruleResult.id,
      );

      const transformationsResults = [];
      for (const transformation of rule.transformations || []) {
        const res = await createUpdateRuleTransformation(conn, transformation, ruleResult.id);
        transformationsResults.push(res);
      }
      await deleteRuleTransformations(
        conn,
        transformationsResults.map(({ id }) => id),
        ruleResult.id,
      );

      const actionsResults = [];
      for (const action of rule.mappers || []) {
        const res = await createUpdateRuleAction(conn, action, ruleResult.id);
        actionsResults.push(res);
      }
      await deleteRuleActions(
        conn,
        actionsResults.map(({ id }) => id),
        ruleResult.id,
      );
    }
  }

  return result;
}
