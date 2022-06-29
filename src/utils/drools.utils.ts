import path = require('path');
import fs = require('fs');
import {parseJsonSafe} from './common.utils';

const ruleExtractRegex = /(rule\b)([\S\s]*?)(end\b)/g
const rulePreconditionRegex = /(?<=when\b)([\S\s]*?)(?=then\b)/g
const ruleBodyRegex = /(?<=then\b)([\S\s]*?)(?=end\b)/g
const ruleSequenceRegex = /(?<=salience\b)([\S\s]*?)(?=when\b)/g

interface Rule {
  Name: string;
  action: string;
  active: boolean;
  condition: string;
  sequence: number;
}

interface Group {
  active: boolean;
  name: string;
  description: string;
  priceListId: string;
  sequence: number;
  type: string;
  priceRules: Rule[];
  referenceId: string;
}

export function extractRulesFromGroup(groupFilePath: string): Rule[] {
  const result: Rule[] = [];
  const rulesContent = fs.readFileSync(groupFilePath, {encoding: 'utf8'}).toString()
  const rulesRegexResults = [...rulesContent.match(ruleExtractRegex) ?? []]
  for (const rulesRegexResult of rulesRegexResults) {
    const preconditionResult = [...rulesRegexResult.match(rulePreconditionRegex) ?? []]
    const ruleBodyResult = [...rulesRegexResult.match(ruleBodyRegex) ?? []]

    const ruleRecord = {
      'Name': getRuleName(rulesRegexResult),
      'action': ruleBodyResult[0],
      'active': true,
      'condition': preconditionResult[0],
      'sequence': getSequenceNumber(rulesRegexResult)
    }
    result.push(ruleRecord)
  }
  return result;
}


export function getRuleName(rulesRegexResultElement: string): string {
  const startPosition = rulesRegexResultElement.indexOf('"')
  const endPosition = rulesRegexResultElement.indexOf('"', startPosition + 1)
  return rulesRegexResultElement.substring(startPosition + 1, endPosition)
}

export function getSequenceNumber(rulesRegexResultElement: string): number {
  const sequence = [...rulesRegexResultElement.match(ruleSequenceRegex) ?? []][0]
  return parseInt(sequence.toString().trim(), 10)
}

function extracted(groupFile: string, rulesDirectory: string): Group | undefined {
  const groupMetaFile = groupFile.replace('.drl', '.json')
  const groupMetaFilePath = rulesDirectory + '/' + groupMetaFile;
  const metadataStr = fs.readFileSync(groupMetaFilePath).toString()
  const groupRecord = parseJsonSafe(metadataStr)
  let group: Group;
  if (groupRecord) {
    const groupFilePath = rulesDirectory + '/' + groupFile;
    group = {...groupRecord, priceRules: extractRulesFromGroup(groupFilePath)};
    return group;
  }
  return undefined
}

export function extractGroupsFromFolder(rulesDirectory: string): Group[] {
  const extension = '.drl'
  const groupFiles: string[] = []
  console.log('reading files')
  fs.readdirSync(rulesDirectory).forEach(ruleGroupFile => {
    if (path.extname(ruleGroupFile).toLowerCase() === extension) {
      groupFiles.push(ruleGroupFile)
    }
  })
  const result: Group[] = [];

  for (const groupFile of groupFiles) {
    console.log('Processing rules file', groupFile)
    const items = extracted(groupFile, rulesDirectory);
    if (items){
      result.push(items)
    }
  }
  return result;
}
