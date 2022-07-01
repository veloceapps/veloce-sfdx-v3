import { Connection, SfdxError } from '@salesforce/core';
import { ExecuteService } from '@salesforce/apex-node';
import { Member } from '../types/member.types';
import { extractGroupsFromFolder, Group, Rule } from '../utils/drools.utils';

export interface PushDRLParams {
  rootPath: string;
  conn: Connection;
  member: Member | undefined;
}

function addRule(rule: Rule): string {
  let code = `o.Name = '${rule.name}';\n`;
  const action = JSON.stringify(rule.action);
  code += `o.VELOCPQ__Action__c = '${action.substring(1, action.length - 1)}';\n`;
  code += `o.VELOCPQ__Active__c = ${rule.active};\n`;
  const condition = JSON.stringify(rule.condition);
  code += `o.VELOCPQ__Condition__c = '${condition.substring(1, condition.length - 1)}';\n`;
  code += `o.VELOCPQ__Description__c = '${rule.description || rule.name}';\n`;
  code += `o.VELOCPQ__Sequence__c = ${rule.sequence};\n`;
  return code;
}

async function saveRule(group: Group, rule: Rule, conn: Connection): Promise<void> {
  let code = '';
  code += `VELOCPQ__PriceRuleGroup__c[] gs = [SELECT Id FROM VELOCPQ__PriceRuleGroup__c WHERE VELOCPQ__ReferenceId__c = '${group.referenceId}' LIMIT 1];\n`;
  code += 'VELOCPQ__PriceRuleGroup__c g = gs[0];\n';
  code += `VELOCPQ__PriceRule__c[] rs = [SELECT Id, VELOCPQ__PriceRuleGroupId__c FROM VELOCPQ__PriceRule__c WHERE VELOCPQ__ReferenceId__c = '${rule.referenceId}' LIMIT 1];\n`;
  code += 'if (rs.size() > 0){\n';
  code += '    VELOCPQ__PriceRule__c oldRule = rs[0];\n';
  code += '    if (oldRule.VELOCPQ__PriceRuleGroupId__c.equals(g.Id)){\n';
  code += '        VELOCPQ__PriceRule__c o = oldRule;\n';
  code += addRule(rule);
  code += '        update o;  \n';
  code += '    } else {\n';
  code += `        VELOCPQ__PriceRule__c o = new VELOCPQ__PriceRule__c(VELOCPQ__ReferenceId__c = '${rule.referenceId}');\n`;
  code += '        o.VELOCPQ__PriceRuleGroupId__c = g.Id;\n';
  code += addRule(rule);
  code += '        insert o;\n';
  code += '        delete oldRule;\n';
  code += '    }\n';
  code += '} else {\n';
  code += `    VELOCPQ__PriceRule__c o = new VELOCPQ__PriceRule__c(VELOCPQ__ReferenceId__c = '${rule.referenceId}');\n`;
  code += addRule(rule);
  code += '    o.VELOCPQ__PriceRuleGroupId__c = g.Id;\n';
  code += '    insert o;\n';
  code += '}';
  const exec = new ExecuteService(conn);
  const execAnonOptions = Object.assign({}, { apexCode: code });
  const result = await exec.executeAnonymous(execAnonOptions);
  if (!result.success) {
    throw new SfdxError(result.logs || 'Compile Error');
  }
}

function addGroup(group: Group): string {
  let code = `o.Name = '${group.name}';\n`;
  code += `o.VELOCPQ__Active__c = ${group.active};\n`;
  code += `o.VELOCPQ__Description__c = '${group.description}';\n`;
  code += `o.VELOCPQ__Sequence__c = ${group.sequence};\n`;
  code += `o.VELOCPQ__Type__c = '${group.type}';\n`;
  return code;
}

async function saveGroup(group: Group, conn: Connection): Promise<void> {
  let code = '';
  code += `VELOCPQ__PriceRuleGroup__c[] gs = [SELECT Id, VELOCPQ__PriceListId__c FROM VELOCPQ__PriceRuleGroup__c WHERE VELOCPQ__ReferenceId__c = '${group.referenceId}' LIMIT 1];\n`;
  code += 'if (gs.size() > 0){\n';
  code += '    VELOCPQ__PriceRuleGroup__c oldGroup = gs[0];\n';
  code += `    if (oldGroup.VELOCPQ__PriceListId__c.equals('${group.priceListId}')){\n`;
  code += '        VELOCPQ__PriceRuleGroup__c o = oldGroup;\n';
  code += addGroup(group);
  code += '        update o;\n';
  code += '    } else {\n';
  code += `        VELOCPQ__PriceRuleGroup__c o = new VELOCPQ__PriceRuleGroup__c(VELOCPQ__ReferenceId__c = '${group.referenceId}');\n`;
  code += addGroup(group);
  code += `        o.VELOCPQ__PriceListId__c = '${group.priceListId}';\n`;
  code += '        insert o;\n';
  code += '        delete oldGroup;\n';
  code += '    }\n';
  code += '} else {\n';
  code += `    VELOCPQ__PriceRuleGroup__c o = gs.size() > 0 ? gs[0] : new VELOCPQ__PriceRuleGroup__c(VELOCPQ__ReferenceId__c = '${group.referenceId}');\n`;
  code += addGroup(group);
  code += `    o.VELOCPQ__PriceListId__c = '${group.priceListId}';\n`;
  code += '    insert o;    \n';
  code += '}\n';

  const exec = new ExecuteService(conn);
  const execAnonOptions = Object.assign({}, { apexCode: code });
  const result = await exec.executeAnonymous(execAnonOptions);
  if (!result.success) {
    throw new SfdxError(result.logs || 'Compile Error');
  }
}

export async function pushDRL(params: PushDRLParams): Promise<string[]> {
  const { rootPath, conn, member } = params;
  if (!member) {
    return [];
  }
  const sourcePath: string = rootPath + '/drl';
  const result = extractGroupsFromFolder(sourcePath);
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
