import { CommandParams } from '../types/command.types';
import { putIdToIdmap } from '../utils/idmap.utils';
import {
  cleanupRuleActions,
  cleanupRuleConditions,
  cleanupRuleTransformations,
  cleanupRules,
  createRuleAction,
  upsertRule,
  upsertRuleCondition,
  upsertRuleGroup,
  upsertRuleTransformation,
  getRuleGroups,
  deleteRuleActions,
} from '../utils/rule.utils';

export async function pushRule(params: CommandParams): Promise<string[]> {
  const { idmap, rootPath, conn, member, skipDelete } = params;
  if (!member) {
    return [];
  }

  const names = member.all ? undefined : Array.from(member.names).map((ui) => ui.split(':')[0]);
  const ruleGroups = getRuleGroups(rootPath + '/rule', names);

  const result = [];

  for (const ruleGroup of ruleGroups) {
    const ruleGroupResult = await upsertRuleGroup(conn, ruleGroup);

    if (ruleGroup.id && ruleGroupResult.id) {
      putIdToIdmap(ruleGroup.id, ruleGroupResult.id, idmap);
    }

    for (const rule of ruleGroup.rules) {
      if (!rule.name) {
        continue;
      }
      const ruleResult = await upsertRule(conn, rule, ruleGroupResult.id);
      result.push(ruleResult.id);

      if (rule.id && ruleResult.id) {
        putIdToIdmap(rule.id, ruleResult.id, idmap);
      }

      const conditionsResults = [];
      for (const condition of rule.conditions || []) {
        const res = await upsertRuleCondition(conn, condition, ruleResult.id);
        conditionsResults.push(res);
      }
      await cleanupRuleConditions(
        conn,
        conditionsResults.map(({ id }) => id),
        ruleResult.id,
      );

      const transformationsResults = [];
      for (const transformation of rule.transformations || []) {
        const res = await upsertRuleTransformation(conn, transformation, ruleResult.id);
        transformationsResults.push(res);
      }
      await cleanupRuleTransformations(
        conn,
        transformationsResults.map(({ id }) => id),
        ruleResult.id,
      );

      await deleteRuleActions(conn, ruleResult.id);
      const actionsResults = [];
      for (const action of rule.mappers || []) {
        const res = await createRuleAction(conn, action, ruleResult.id);
        actionsResults.push(res);
      }
    }

    if (!skipDelete) {
      console.log(`Clean up rule group with id ${ruleGroupResult.id}`);
      const rulesCleanupResult = await cleanupRules(conn, result, ruleGroup.referenceId);
      const removedRules = rulesCleanupResult.reduce(
        (ids: string[], item) => (item.success ? [...ids, item.id] : ids),
        [],
      );
      for (const ruleId of removedRules) {
        await cleanupRuleConditions(conn, [], ruleId);
        await cleanupRuleTransformations(conn, [], ruleId);
        await cleanupRuleActions(conn, [], ruleId);
      }
    } else {
      console.log(`Skipping clean up rule group with id ${ruleGroupResult.id}`);
    }
  }

  return result;
}
