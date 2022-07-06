import path = require('path');
import fs = require('fs');
import { SfdxError } from '@salesforce/core';
import { Connection } from '@salesforce/core';
import { PriceRuleGroup } from '../types/priceRuleGroup.types';
import { PriceRule } from '../types/priceRule.types';
import { parseJsonSafe, writeFileSafe } from './common.utils';

const ruleExtractRegex = /(rule\b)([\S\s]*?)(\nend\b)/g;
const rulePreconditionRegex = /(?<=when\b)([\S\s]*?)(?=then\b)/g;
const ruleBodyRegex = /(?<=then\b)([\S\s]*?)(?=\nend\b)/g;
const ruleSequenceRegex = /(?<=salience\b)([\S\s]*?)(?=when\b)/g;

export interface Rule {
  name: string;
  active: boolean;
  description: string;
  referenceId: string;
  action?: string;
  condition?: string;
  sequence?: number;
}

export interface Group {
  active: boolean;
  name: string;
  description: string;
  priceListId: string;
  sequence: number;
  type: string;
  priceRules: Rule[];
  referenceId: string;
}

export function extractRulesFromGroup(groupFilePath: string, rulesMeta: Rule[]): Rule[] {
  const result: Rule[] = [];
  const rulesContent = fs.readFileSync(groupFilePath, { encoding: 'utf8' }).toString();
  const rulesRegexResults = [...(rulesContent.match(ruleExtractRegex) ?? [])];

  const nameToRuleMap = rulesMeta.reduce<Record<string, Rule>>((trunk, rule) => {
    return {
      ...trunk,
      [rule.name]: rule,
    };
  }, {});

  for (const rulesRegexResult of rulesRegexResults) {
    const preconditionResult = [...(rulesRegexResult.match(rulePreconditionRegex) ?? [])];
    const ruleBodyResult = [...(rulesRegexResult.match(ruleBodyRegex) ?? [])];

    const name = getRuleName(rulesRegexResult);
    const ruleMeta = nameToRuleMap[name];
    if (!ruleMeta) {
      throw new SfdxError(`Rule in MetaFile with 'name' ${name} is missing.`);
    }
    if (!ruleMeta.referenceId) {
      throw new SfdxError(`Property 'referenceId' for rule ${ruleMeta.name} is missing.`);
    }
    const ruleRecord = {
      name,
      action: ruleBodyResult[0],
      active: ruleMeta.active ?? true,
      condition: preconditionResult[0],
      description: ruleMeta.description || name,
      referenceId: ruleMeta.referenceId,
      sequence: getSequenceNumber(rulesRegexResult),
    };
    result.push(ruleRecord);
  }
  return result;
}

export function getRuleName(rulesRegexResultElement: string): string {
  const startPosition = rulesRegexResultElement.indexOf('"');
  const endPosition = rulesRegexResultElement.indexOf('"', startPosition + 1);
  return rulesRegexResultElement.substring(startPosition + 1, endPosition);
}

export function getSequenceNumber(rulesRegexResultElement: string): number {
  const sequence = [...(rulesRegexResultElement.match(ruleSequenceRegex) ?? [])][0];
  return parseInt(sequence.toString().trim(), 10);
}

export function validateGroupMeta(groupRecord: Group, groupFile: string): void {
  if (!groupRecord.name) {
    throw new SfdxError(`Property 'name' is missing from MetaFile of group ${groupFile}`);
  }
  if (!groupRecord.priceListId) {
    throw new SfdxError(`Property 'priceListId' is missing from MetaFile of group ${groupFile}`);
  }
  if (groupRecord.sequence == null) {
    throw new SfdxError(`Property 'sequence' is missing from MetaFile of group ${groupFile}`);
  }
  if (!groupRecord.type) {
    throw new SfdxError(`Property 'type' is missing from MetaFile of group ${groupFile}`);
  }
  if (!groupRecord.referenceId) {
    throw new SfdxError(`Property 'referenceId' is missing from MetaFile of group ${groupFile}`);
  }
  if (!groupRecord.priceRules) {
    throw new SfdxError(`List 'priceRules' is missing from MetaFile of group ${groupFile}`);
  }
}

function extractGroupFromFile(groupFile: string, rulesDirectory: string): Group {
  const groupMetaFile = groupFile.replace('.drl', '.json');
  const groupMetaFilePath = rulesDirectory + '/' + groupMetaFile;
  const metadataStr = fs.readFileSync(groupMetaFilePath).toString();
  const groupMetaData: Group = parseJsonSafe(metadataStr);
  if (groupMetaData) {
    validateGroupMeta(groupMetaData, groupFile);
    const groupFilePath = rulesDirectory + '/' + groupFile;
    return {
      ...groupMetaData,
      active: groupMetaData.active ?? true,
      description: groupMetaData.description || groupMetaData.name,
      priceRules: extractRulesFromGroup(groupFilePath, groupMetaData.priceRules),
    };
  } else {
    throw new SfdxError(`MetaFile is missing for group ${groupFile}`);
  }
}

export function extractGroupsFromFolder(rulesDirectory: string): Group[] {
  const extension = '.drl';
  const groupFiles: string[] = [];
  fs.readdirSync(rulesDirectory).forEach((ruleGroupFile) => {
    if (path.extname(ruleGroupFile).toLowerCase() === extension) {
      groupFiles.push(ruleGroupFile);
    }
  });
  const result: Group[] = [];

  for (const groupFile of groupFiles) {
    result.push(extractGroupFromFile(groupFile, rulesDirectory));
  }
  return result;
}

export async function fetchDroolsByGroup(conn: Connection, groupName: string): Promise<PriceRule[]> {
  let query =
    'SELECT Id,Name, VELOCPQ__Action__c,VELOCPQ__Active__c,VELOCPQ__Condition__c,' +
    'VELOCPQ__Description__c,VELOCPQ__ReferenceId__c,VELOCPQ__PriceRuleGroupId__c,VELOCPQ__Sequence__c from VELOCPQ__PriceRule__c';
  query += ` WHERE VELOCPQ__PriceRuleGroupId__c = '${groupName}'`;

  const result = await conn.query<PriceRule>(query);
  return result?.records ?? [];
}

export async function fetchDroolGroups(conn: Connection, groupNames: string[]): Promise<PriceRuleGroup[]> {
  let query =
    'SELECT Id,Name, VELOCPQ__Active__c,VELOCPQ__Description__c,VELOCPQ__ReferenceId__c,' +
    'VELOCPQ__Sequence__c,VELOCPQ__Type__c,VELOCPQ__PriceListId__c from VELOCPQ__PriceRuleGroup__c';
  if (groupNames.length > 0) {
    query += ` WHERE Name IN ('${groupNames.join("','")}')`;
  }
  const result = await conn.query<PriceRuleGroup>(query);
  return result?.records ?? [];
}

export function saveDroolGroups(groups: Group[], savePath: string): void {
  for (const group of groups) {
    const groupToSave: Group = {
      active: group.active,
      description: group.description,
      name: group.name,
      priceListId: group.priceListId,
      referenceId: group.referenceId,
      sequence: group.sequence,
      type: group.type,
      priceRules: [],
    };
    for (const rule of group.priceRules) {
      const ruleToSave: Rule = {
        active: rule.active,
        description: rule.description,
        name: rule.name,
        referenceId: rule.referenceId,
      };
      groupToSave.priceRules.push(ruleToSave);
    }
    const fileName: string = getFileNameForGroup(group.type, group.sequence, group.name);
    writeFileSafe(savePath, `${fileName}.json`, JSON.stringify(groupToSave, null, 2) + '\n');
    let drlFileContent = '';
    for (const rule of group.priceRules) {
      drlFileContent += `
rule "${rule.name}" salience ${rule.sequence}
when
${rule.condition}
then
${rule.action}
end
`;
    }
    writeFileSafe(savePath, `${fileName}.drl`, drlFileContent);
  }
}

function getFileNameForGroup(type: string, sequence: number, name: string): string {
  return `${type}_${sequence}_${name.replaceAll(' ', '_')}`;
}

export async function getDroolGroups(conn: Connection, groupNames: string[]): Promise<Group[]> {
  const salesforceGroups: PriceRuleGroup[] = await fetchDroolGroups(conn, groupNames);
  const result: Group[] = [];
  for (const salesforceGroup of salesforceGroups) {
    const salesforceGroupId: string = salesforceGroup.Id;

    const group: Group = {
      active: salesforceGroup.VELOCPQ__Active__c,
      description: salesforceGroup.VELOCPQ__Description__c,
      name: salesforceGroup.Name,
      priceListId: salesforceGroup.VELOCPQ__PriceListId__c,
      referenceId: salesforceGroup.VELOCPQ__ReferenceId__c,
      sequence: salesforceGroup.VELOCPQ__Sequence__c,
      type: salesforceGroup.VELOCPQ__Type__c,
      priceRules: [],
    };

    const salesforceRules: PriceRule[] = await fetchDroolsByGroup(conn, salesforceGroupId);
    for (const salesforceRule of salesforceRules) {
      const rule: Rule = {
        action: salesforceRule.VELOCPQ__Action__c,
        active: salesforceRule.VELOCPQ__Active__c,
        condition: salesforceRule.VELOCPQ__Condition__c,
        description: salesforceRule.VELOCPQ__Description__c,
        name: salesforceRule.Name,
        referenceId: salesforceRule.VELOCPQ__ReferenceId__c,
        sequence: salesforceRule.VELOCPQ__Sequence__c,
      };
      group.priceRules.push(rule);
    }
    group.priceRules.sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0));
    result.push(group);
  }
  return result;
}
