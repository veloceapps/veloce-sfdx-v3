import path = require('path');
import fs = require('fs');
import { SfdxError } from '@salesforce/core';
import { parseJsonSafe } from './common.utils';

const ruleExtractRegex = /(rule\b)([\S\s]*?)(end\b)/g;
const rulePreconditionRegex = /(?<=when\b)([\S\s]*?)(?=then\b)/g;
const ruleBodyRegex = /(?<=then\b)([\S\s]*?)(?=end\b)/g;
const ruleSequenceRegex = /(?<=salience\b)([\S\s]*?)(?=when\b)/g;

export interface Rule {
  name: string;
  action: string;
  active: boolean;
  condition: string;
  description: string;
  sequence: number;
  referenceId: string;
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
  if (!groupRecord.sequence) {
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
