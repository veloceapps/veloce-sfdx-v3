import { Connection, SfdxError } from '@salesforce/core';
import { ExecuteService } from '@salesforce/apex-node';
import { extractGroupsFromFolder, Group, Rule, setIdFromReferenceId } from '../utils/drools.utils';
import { CommandParams } from '../types/command.types';
import { isFieldExists } from '../utils/common.utils';

async function saveRule(group: Group, rule: Rule, conn: Connection): Promise<void> {
  const action = JSON.stringify(rule.action).replaceAll("'", "\\'");
  const actionWithoutQuotes = action.substring(1, action.length - 1);
  const condition = JSON.stringify(rule.condition).replaceAll("'", "\\'");
  const conditionWithoutQuotes = condition.substring(1, condition.length - 1);
  const code = `
    String action = '${actionWithoutQuotes}';
    String condition = '${conditionWithoutQuotes}';

    VELOCPQ__PriceRuleGroup__c[] gs = [SELECT Id FROM VELOCPQ__PriceRuleGroup__c WHERE VELOCPQ__ReferenceId__c = '${
      group.referenceId
    }' LIMIT 1];
    VELOCPQ__PriceRuleGroup__c g = gs[0];
    VELOCPQ__PriceRule__c[] rs = [SELECT Id, VELOCPQ__PriceRuleGroupId__c FROM VELOCPQ__PriceRule__c WHERE VELOCPQ__ReferenceId__c = '${
      rule.referenceId
    }' LIMIT 1];
    if (rs.size() > 0){
        VELOCPQ__PriceRule__c oldRule = rs[0];
        if (oldRule.VELOCPQ__PriceRuleGroupId__c.equals(g.Id)){
            VELOCPQ__PriceRule__c o = oldRule;
            o.Name = '${rule.name}';
            o.VELOCPQ__Action__c = action;
            o.VELOCPQ__Active__c = ${rule.active};
            o.VELOCPQ__Condition__c = condition;
            o.VELOCPQ__Description__c = '${rule.description || rule.name}';
            o.VELOCPQ__Sequence__c = ${rule.sequence};
            update o;
        } else {
            VELOCPQ__PriceRule__c o = new VELOCPQ__PriceRule__c(VELOCPQ__ReferenceId__c = '${rule.referenceId}');
            o.VELOCPQ__PriceRuleGroupId__c = g.Id;
            o.Name = '${rule.name}';
            o.VELOCPQ__Action__c = action;
            o.VELOCPQ__Active__c = ${rule.active};
            o.VELOCPQ__Condition__c = condition;
            o.VELOCPQ__Description__c = '${rule.description || rule.name}';
            o.VELOCPQ__Sequence__c = ${rule.sequence};
            insert o;
            delete oldRule;
        }
    } else {
        VELOCPQ__PriceRule__c o = new VELOCPQ__PriceRule__c(VELOCPQ__ReferenceId__c = '${rule.referenceId}');
        o.Name = '${rule.name}';
        o.VELOCPQ__Action__c = action;
        o.VELOCPQ__Active__c = ${rule.active};
        o.VELOCPQ__Condition__c = condition;
        o.VELOCPQ__Description__c = '${rule.description || rule.name}';
        o.VELOCPQ__Sequence__c = ${rule.sequence};
        o.VELOCPQ__PriceRuleGroupId__c = g.Id;
        insert o;
    }`;

  const exec = new ExecuteService(conn);
  const execAnonOptions = { apexCode: code };
  const result = await exec.executeAnonymous(execAnonOptions);
  if (!result.success) {
    throw new SfdxError(result.logs || 'Command Compile Error');
  }
}

async function saveGroup(group: Group, conn: Connection): Promise<void> {
  const isScriptExists = await isFieldExists(conn, 'VELOCPQ__PriceRuleGroup__c', 'script__c');
  const code = `
    VELOCPQ__PriceRuleGroup__c[] gs = [SELECT Id, VELOCPQ__PriceListId__c FROM VELOCPQ__PriceRuleGroup__c WHERE VELOCPQ__ReferenceId__c = '${group.referenceId}' LIMIT 1];
    if (gs.size() > 0){
        VELOCPQ__PriceRuleGroup__c oldGroup = gs[0];
        if (oldGroup.VELOCPQ__PriceListId__c.equals('${group.priceListId}')){
            VELOCPQ__PriceRuleGroup__c o = oldGroup;
            o.Name = '${group.name}';
            o.VELOCPQ__Active__c = ${group.active};
            o.VELOCPQ__Description__c = '${group.description}';
            o.VELOCPQ__Sequence__c = ${group.sequence};
            o.VELOCPQ__Type__c = '${group.type}';
            if ('${isScriptExists}'.equals('true')) {
              o.script__c = '${group.script}'.equals('null') || '${group.script}'.equals('undefined') ? null : '${group.script}';
            }
            update o;
        } else {
            VELOCPQ__PriceRuleGroup__c o = new VELOCPQ__PriceRuleGroup__c(VELOCPQ__ReferenceId__c = '${group.referenceId}');
            o.Name = '${group.name}';
            o.VELOCPQ__Active__c = ${group.active};
            o.VELOCPQ__Description__c = '${group.description}';
            o.VELOCPQ__Sequence__c = ${group.sequence};
            o.VELOCPQ__Type__c = '${group.type}';
            o.VELOCPQ__PriceListId__c = '${group.priceListId}';
            if ('${isScriptExists}'.equals('true')) {
              o.script__c = '${group.script}'.equals('null') || '${group.script}'.equals('undefined') ? null : '${group.script}';
            }
            insert o;
            delete oldGroup;
        }
    } else {
        VELOCPQ__PriceRuleGroup__c o = gs.size() > 0 ? gs[0] : new VELOCPQ__PriceRuleGroup__c(VELOCPQ__ReferenceId__c = '${group.referenceId}');
        o.Name = '${group.name}';
        o.VELOCPQ__Active__c = ${group.active};
        o.VELOCPQ__Description__c = '${group.description}';
        o.VELOCPQ__Sequence__c = ${group.sequence};
        o.VELOCPQ__Type__c = '${group.type}';
        o.VELOCPQ__PriceListId__c = '${group.priceListId}';
        if ('${isScriptExists}'.equals('true')) {
          o.script__c = '${group.script}'.equals('null') || '${group.script}'.equals('undefined') ? null : '${group.script}';
        }
        insert o;
    }`;
  const exec = new ExecuteService(conn);
  const execAnonOptions = { apexCode: code };
  const result = await exec.executeAnonymous(execAnonOptions);
  if (!result.success) {
    console.error(result.diagnostic);
    throw new SfdxError(result.logs || 'Command Compile Error');
  }
}

export async function pushDRL(params: CommandParams): Promise<string[]> {
  const { rootPath, conn, member } = params;
  if (!member) {
    return [];
  }
  const sourcePath: string = rootPath + '/drl';
  const result = extractGroupsFromFolder(sourcePath);
  await setIdFromReferenceId(result, conn);

  for (const group of result) {
    if (member.all || member.names.includes(group.name)) {
      await saveGroup(group, conn);
      for (const rule of group.priceRules) {
        await saveRule(group, rule, conn);
      }
    }
  }

  return [];
}
