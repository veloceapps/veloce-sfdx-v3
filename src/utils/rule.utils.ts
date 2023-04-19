import * as fs from 'fs';
import * as path from 'path';
import { Connection, SfdxError } from '@salesforce/core';
import { SuccessResult, RecordResult } from 'jsforce/record-result';
import { camelCase, groupBy } from 'lodash';
import {
  Rule,
  RuleAction,
  RuleCondition,
  RuleGroup,
  RuleObjectTypes,
  RuleTransformation,
  SFContent,
  SFProcedureRule,
  SFProcedureRuleCondition,
  SFProcedureRuleMapping,
  SFProcedureRuleTransformation,
} from '../types/rule.types';
import { createRulesParser, RuleVisitor } from '../grammar/src';
import { parseJsonSafe, writeFileSafe } from './common.utils';

export async function fetchProcedureRules(
  conn: Connection,
  dumpAll: boolean,
  ruleNames?: string[],
): Promise<SFProcedureRule[]> {
  let query = `SELECT Id,
                      Name,
                      VELOCPQ__RuleGroupId__r.Name,
                      VELOCPQ__RuleGroupId__r.VELOCPQ__Type__c,
                      VELOCPQ__RuleGroupId__r.VELOCPQ__Sequence__c,
                      VELOCPQ__RuleGroupId__r.VELOCPQ__Description__c,
                      VELOCPQ__RuleGroupId__r.VELOCPQ__Active__c,
                      VELOCPQ__RuleGroupId__r.VELOCPQ__ReferenceId__c,
                      VELOCPQ__Description__c,
                      VELOCPQ__Sequence__c,
                      VELOCPQ__Active__c,
                      VELOCPQ__Default__c,
                      VELOCPQ__RuleGroupId__c,
                      VELOCPQ__ReferenceId__c,
                      (SELECT Id,
                              VELOCPQ__VariableName__c,
                              VELOCPQ__ExpressionsJsonString__c,
                              VELOCPQ__RuleId__c,
                              VELOCPQ__ObjectType__c,
                              VELOCPQ__ReferenceId__c,
                              VELOCPQ__Sequence__c
                       FROM VELOCPQ__ProcedureRules_RuleConditions__r),
                      (SELECT Id,
                              VELOCPQ__RuleId__c,
                              VELOCPQ__Sequence__c,
                              VELOCPQ__ResultPath__c,
                              VELOCPQ__Expression__c,
                              VELOCPQ__ReferenceId__c
                       FROM VELOCPQ__ProcedureRules_TransformationRules__r),
                      (SELECT Id,
                              VELOCPQ__Value__c,
                              VELOCPQ__Explanation__c,
                              VELOCPQ__Type__c,
                              VELOCPQ__ValueType__c,
                              VELOCPQ__TargetFieldName__c,
                              VELOCPQ__TotalMetricName__c,
                              VELOCPQ__VariableName__c,
                              VELOCPQ__RuleId__c,
                              VELOCPQ__Action__c,
                              VELOCPQ__Message__c,
                              VELOCPQ__MessageValueType__c,
                              VELOCPQ__AllowOverride__c,
                              VELOCPQ__ReferenceId__c,
                              VELOCPQ__Sequence__c
                       FROM VELOCPQ__ProcedureRules_RuleMappings__r)
               FROM VELOCPQ__ProcedureRule__c`;
  if (!dumpAll) {
    query += ` WHERE VELOCPQ__RuleGroupId__r.Name IN ('${ruleNames?.join("','")}')`;
  }

  const result = await conn.query<SFProcedureRule>(query);

  // get script file for transformations
  const rules = result?.records ?? [];
  const transformationIds = rules.reduce((acc, rule) => {
    return [...acc, ...(rule?.VELOCPQ__ProcedureRules_TransformationRules__r?.records || []).map(({ Id }) => Id)];
  }, [] as string[]);

  const contentLinksQuery = `Select Id, ContentDocumentId, LinkedEntityId
                             From ContentDocumentLink
                             Where LinkedEntityId IN ('${transformationIds.join("','")}')`;
  const contentLinks = await conn.query<SFContent>(contentLinksQuery);
  const contentLinksRecords = contentLinks?.records || [];
  const javaScripts: { id: string; javaScript: string }[] = [];
  for (const record of contentLinksRecords) {
    const javaScript = await conn.request<string>({ url: `/connect/files/${record.ContentDocumentId}/content` });
    javaScripts.push({ id: record.LinkedEntityId, javaScript });
  }
  return rules.map((rule) => {
    return {
      ...rule,
      VELOCPQ__ProcedureRules_TransformationRules__r: {
        ...(rule.VELOCPQ__ProcedureRules_TransformationRules__r ?? {}),
        records: (rule.VELOCPQ__ProcedureRules_TransformationRules__r?.records || []).map((transformation) => {
          const javaScript = javaScripts.find((o) => o.id === transformation.Id);
          if (javaScript) {
            return { ...transformation, VELOCPQ__JavaScript__c: javaScript.javaScript };
          }
          return transformation;
        }),
      },
    };
  });
}

export function saveProcedureRules(procedureRules: SFProcedureRule[], pathToSave: string): void {
  const groups = groupBy(procedureRules, 'VELOCPQ__RuleGroupId__c');
  Object.keys(groups).forEach((key) => {
    const procedureRulesGroup = groups[key];
    saveToJSON(procedureRulesGroup, pathToSave);
    saveToDSL(procedureRulesGroup, pathToSave);
  });
}

const saveToJSON = (procedureRules: SFProcedureRule[], pathToSave: string): void => {
  const { VELOCPQ__RuleGroupId__c, VELOCPQ__RuleGroupId__r } = procedureRules[0];
  const generatedJSON = {
    id: VELOCPQ__RuleGroupId__c,
    name: VELOCPQ__RuleGroupId__r.Name,
    type: VELOCPQ__RuleGroupId__r.VELOCPQ__Type__c,
    sequence: VELOCPQ__RuleGroupId__r.VELOCPQ__Sequence__c,
    description: VELOCPQ__RuleGroupId__r.VELOCPQ__Description__c,
    active: VELOCPQ__RuleGroupId__r.VELOCPQ__Active__c,
    referenceId: VELOCPQ__RuleGroupId__r.VELOCPQ__ReferenceId__c,
    rules: procedureRules.map(
      ({
        Id,
        Name,
        VELOCPQ__Description__c,
        VELOCPQ__Active__c,
        VELOCPQ__Default__c,
        VELOCPQ__ReferenceId__c,
        VELOCPQ__Sequence__c,
      }) => ({
        id: Id,
        name: Name,
        description: VELOCPQ__Description__c,
        active: VELOCPQ__Active__c,
        isDefault: VELOCPQ__Default__c,
        referenceId: VELOCPQ__ReferenceId__c,
        sequence: VELOCPQ__Sequence__c,
      }),
    ),
  };

  writeFileSafe(
    pathToSave,
    `${VELOCPQ__RuleGroupId__r.VELOCPQ__Type__c}_${VELOCPQ__RuleGroupId__r.Name}.json`,
    JSON.stringify(generatedJSON),
    {
      flag: 'w+',
    },
  );
};

const saveToDSL = (procedureRules: SFProcedureRule[], pathToSave: string): any => {
  const { VELOCPQ__RuleGroupId__r } = procedureRules[0];
  const result = procedureRules
    .map((procedureRule) => {
      const conditions = conditionsToDSL(
        procedureRule.VELOCPQ__ProcedureRules_RuleConditions__r?.records,
        VELOCPQ__RuleGroupId__r.VELOCPQ__Type__c,
      );
      const transformations = transformationsToDSL(
        procedureRule.VELOCPQ__ProcedureRules_TransformationRules__r?.records,
      );
      const actions = actionsToDSL(
        procedureRule.VELOCPQ__ProcedureRules_RuleMappings__r?.records,
        VELOCPQ__RuleGroupId__r.VELOCPQ__Type__c,
      );
      if (VELOCPQ__RuleGroupId__r.VELOCPQ__Type__c === 'METRIC') {
        if (!actions.length || !transformations.length) {
          return '';
        }
      } else {
        if (!actions.length || !conditions.length) {
          return '';
        }
      }

      return `rule "${procedureRule.Name}"
    sequence ${procedureRule.VELOCPQ__Sequence__c}${conditions}${transformations}${actions}
end`;
    })
    .filter((dslRule) => !!dslRule)
    .join('\n');
  writeFileSafe(
    pathToSave,
    `${VELOCPQ__RuleGroupId__r.VELOCPQ__Type__c}_${VELOCPQ__RuleGroupId__r.Name}.vlrl`,
    result,
    {
      flag: 'w+',
    },
  );
};

const conditionsToDSL = (conditions: SFProcedureRuleCondition[], type: string): string => {
  if (!conditions?.length) {
    return '';
  }
  return `\n    condition
        ${conditions
          .sort((a, b) => a.VELOCPQ__Sequence__c - b.VELOCPQ__Sequence__c)
          .map(
            (condition) =>
              `${type === 'METRIC' ? 'chargeItem' : condition.VELOCPQ__VariableName__c}: ${
                type === 'METRIC' ? 'ChargeItem' : RuleObjectTypes[condition.VELOCPQ__ObjectType__c]
              }(${condition.VELOCPQ__ExpressionsJsonString__c ?? ''})`,
          )
          .join('\n        ')}`;
};

const transformationsToDSL = (transformations: SFProcedureRuleTransformation[]): string => {
  if (!transformations?.length) {
    return '';
  }
  return `\n    transformation
        ${transformations
          .sort((a, b) => a.VELOCPQ__Sequence__c - b.VELOCPQ__Sequence__c)
          .map(
            (transformation) =>
              `${transformation.VELOCPQ__ResultPath__c}: ${
                transformation.VELOCPQ__JavaScript__c
                  ? '```' + transformation.VELOCPQ__JavaScript__c + '```'
                  : transformation.VELOCPQ__Expression__c
              }`,
          )
          .join('\n        ')}`;
};

const actionsToDSL = (actions: SFProcedureRuleMapping[], type: string): string => {
  if (!actions?.length) {
    return '';
  }
  return `\n    action
        ${actions
          .sort((a, b) => a.VELOCPQ__Sequence__c - b.VELOCPQ__Sequence__c)
          .map((action) => {
            const isAdjustPriceAction = ['ADJUST_PRICE', 'ADJUST_LIST_PRICE', 'ADJUST_COST'].includes(
              action.VELOCPQ__Action__c,
            );
            const argumentsOrder = [
              isAdjustPriceAction ? '' : action.VELOCPQ__TargetFieldName__c,
              action.VELOCPQ__Type__c,
              action.VELOCPQ__ValueType__c === 'VALUE' ? `"${action.VELOCPQ__Value__c}"` : action.VELOCPQ__Value__c,
              action.VELOCPQ__Explanation__c ? `"${action.VELOCPQ__Explanation__c}"` : '',
              action.VELOCPQ__MessageValueType__c === 'VALUE'
                ? `"${action.VELOCPQ__Message__c}"`
                : action.VELOCPQ__Message__c,
              action.VELOCPQ__TotalMetricName__c,
              isAdjustPriceAction ? `${action.VELOCPQ__AllowOverride__c}` : null,
            ];
            return `${type === 'METRIC' ? 'chargeItem' : action.VELOCPQ__VariableName__c}.${camelCase(
              action.VELOCPQ__Action__c,
            )}(${argumentsOrder.filter((arg) => !!arg).join(',')})`;
          })
          .join('\n        ')}`;
};

export function getRuleGroups(directory: string, names: string[] | undefined): RuleGroup[] {
  const extension = '.vlrl';
  const result: RuleGroup[] = [];
  fs.readdirSync(directory).forEach((file) => {
    if (path.extname(file).toLowerCase() === extension) {
      const ruleGroup = extractRuleGroup(file, directory, names);
      if (ruleGroup) {
        result.push(ruleGroup);
      }
    }
  });

  return result;
}

function extractRuleGroup(file: string, directory: string, names: string[] | undefined): RuleGroup | undefined {
  const metadataString = fs.readFileSync(`${directory}/${file.replace('.vlrl', '.json')}`).toString();
  const ruleGroup: RuleGroup = parseJsonSafe(metadataString);

  if (names && !names.includes(ruleGroup.name)) {
    return;
  }

  const dslString = fs.readFileSync(`${directory}/${file}`).toString();
  const parser = createRulesParser(dslString);
  const tree = parser.compilationUnit();
  const visitor = new RuleVisitor();
  visitor.visit(tree);

  return {
    ...ruleGroup,
    rules: ruleGroup.rules
      .map((rule) => {
        const ruleDetails = visitor.rules.find(({ name }) => name === rule.name);
        const combinedRule = { ...rule, ...ruleDetails };
        if (ruleGroup.type === 'METRIC') {
          return normalizeMetricRule(combinedRule);
        }
        return combinedRule;
      })
      .map((rule) => setSequences(rule)),
  };
}

export async function upsertRuleGroup(conn: Connection, ruleGroup: RuleGroup): Promise<SuccessResult> {
  const body = {
    Name: ruleGroup.name,
    VELOCPQ__ReferenceId__c: ruleGroup.referenceId,
    VELOCPQ__Type__c: ruleGroup.type,
    VELOCPQ__Sequence__c: ruleGroup.sequence,
    VELOCPQ__Description__c: ruleGroup.description,
    VELOCPQ__Active__c: ruleGroup.active,
  };
  const result = await conn.sobject('VELOCPQ__RuleGroup__c').upsert(body, 'VELOCPQ__ReferenceId__c');

  if (result.success) {
    console.log(`Rule Group ${body.Name} upserted`);
  } else {
    throw new SfdxError(`Failed to create document: ${JSON.stringify(result)}`);
  }

  return result;
}

export async function cleanupRules(
  conn: Connection,
  ruleIdsToKeep: string[],
  fromRuleGroupId: string,
): Promise<RecordResult[]> {
  const query =
    `SELECT Id
     FROM VELOCPQ__ProcedureRule__c
     WHERE VELOCPQ__RuleGroupId__r.VELOCPQ__ReferenceId__c = '${fromRuleGroupId}'` +
    (ruleIdsToKeep.length > 0 ? ` AND Id NOT IN (${"'" + ruleIdsToKeep.join("','") + "'"})` : '');

  const { records = [] } = await conn.autoFetchQuery<SFProcedureRule>(query, {
    autoFetch: true,
    maxFetch: 100000,
  });
  const idsToBeDeleted = records.map(({ Id }) => Id);
  const results = (await conn.sobject('VELOCPQ__ProcedureRule__c').delete(idsToBeDeleted)) ?? [];
  const successResults = results.filter(({ success }) => success).map((res) => (res as SuccessResult).id);
  const errorResults = results.filter(({ success }) => !success);
  if (successResults.length) {
    console.log(`Deleted rules with ids ${successResults.join(',')} from rule group with id ${fromRuleGroupId}`);
  }
  if (errorResults.length) {
    console.log(`Errors occurred while deletion rules: ${errorResults.join('\n')}`);
  }
  return results;
}

export async function upsertRule(conn: Connection, rule: Rule, ruleGroupId: string): Promise<SuccessResult> {
  const body = {
    Name: rule.name,
    VELOCPQ__ReferenceId__c: rule.referenceId,
    VELOCPQ__Description__c: rule.description,
    VELOCPQ__Sequence__c: rule.sequence,
    VELOCPQ__Active__c: rule.active,
    VELOCPQ__Default__c: rule.isDefault,
    VELOCPQ__RuleGroupId__c: ruleGroupId,
  };
  const result = await conn.sobject('VELOCPQ__ProcedureRule__c').upsert(body, 'VELOCPQ__ReferenceId__c');

  if (result.success) {
    console.log(`Procedure Rule ${body.Name} upserted`);
  } else {
    throw new SfdxError(`Failed to create document: ${JSON.stringify(result)}`);
  }

  return result;
}

export async function findRuleCondition(
  conn: Connection,
  condition: RuleCondition,
  ruleId: string,
): Promise<SFProcedureRuleCondition | undefined> {
  const query = `SELECT Id FROM VELOCPQ__RuleCondition__c WHERE VELOCPQ__VariableName__c='${condition.variableName}' AND VELOCPQ__RuleId__c ='${ruleId}'`;

  const result = await conn.autoFetchQuery<SFProcedureRuleCondition>(query, { autoFetch: true, maxFetch: 1 });
  return result?.records?.[0] ?? undefined;
}

export async function cleanupRuleConditions(
  conn: Connection,
  conditionIdsToKeep: string[],
  fromRuleId: string,
): Promise<RecordResult[]> {
  const query =
    `SELECT Id
     FROM VELOCPQ__RuleCondition__c
     WHERE VELOCPQ__RuleId__c = '${fromRuleId}'` +
    (conditionIdsToKeep.length > 0 ? ` AND Id NOT IN (${"'" + conditionIdsToKeep.join("','") + "'"})` : '');

  const { records = [] } = await conn.autoFetchQuery<SFProcedureRuleCondition>(query, {
    autoFetch: true,
    maxFetch: 100000,
  });
  const idsToBeDeleted = records.map(({ Id }) => Id);
  const results = (await conn.sobject('VELOCPQ__RuleCondition__c').delete(idsToBeDeleted)) ?? [];
  const successResults = results.filter(({ success }) => success).map((res) => (res as SuccessResult).id);
  const errorResults = results.filter(({ success }) => !success);
  if (successResults.length) {
    console.log(`Deleted rule conditions with ids ${successResults.join(',')} from rule with id ${fromRuleId}`);
  }
  if (errorResults.length) {
    console.log(`Errors occurred while deletion rule conditions: ${errorResults.join('\n')}`);
  }
  return results;
}

export async function upsertRuleCondition(
  conn: Connection,
  condition: RuleCondition,
  ruleId: string,
): Promise<SuccessResult> {
  const body = {
    VELOCPQ__ReferenceId__c: condition.referenceId,
    VELOCPQ__Sequence__c: condition.sequence,
    VELOCPQ__VariableName__c: condition.variableName,
    VELOCPQ__ExpressionsJsonString__c: condition.expression,
    VELOCPQ__RuleId__c: ruleId,
    VELOCPQ__ObjectType__c: condition.objectType,
  };
  const existingRuleCondition = await findRuleCondition(conn, condition, ruleId);
  let result;
  if (existingRuleCondition) {
    result = await conn.sobject('VELOCPQ__RuleCondition__c').update({ ...body, Id: existingRuleCondition.Id });
  } else {
    result = await conn.sobject('VELOCPQ__RuleCondition__c').create(body);
  }

  if (result.success) {
    if (existingRuleCondition) {
      console.log(`Procedure Rule Condition ${body.VELOCPQ__VariableName__c} updated`);
    } else {
      console.log(`New Procedure Rule Condition ${body.VELOCPQ__VariableName__c} created with id ${result.id}`);
    }
  } else {
    throw new SfdxError(`Failed to create document: ${JSON.stringify(result)}`);
  }

  return result;
}

export async function findRuleTransformations(
  conn: Connection,
  transformation: RuleTransformation,
  ruleId: string,
): Promise<SFProcedureRuleTransformation | undefined> {
  const query = `SELECT Id FROM VELOCPQ__TransformationRule__c WHERE VELOCPQ__ResultPath__c='${transformation.resultPath}' AND VELOCPQ__RuleId__c ='${ruleId}'`;

  const result = await conn.autoFetchQuery<SFProcedureRuleTransformation>(query, { autoFetch: true, maxFetch: 1 });
  return result?.records?.[0] ?? undefined;
}

export async function cleanupRuleTransformations(
  conn: Connection,
  transformationIdsToKeep: string[],
  fromRuleId: string,
): Promise<RecordResult[]> {
  const query =
    `SELECT Id
     FROM VELOCPQ__TransformationRule__c
     WHERE VELOCPQ__RuleId__c = '${fromRuleId}'` +
    (transformationIdsToKeep.length > 0 ? ` AND Id NOT IN (${"'" + transformationIdsToKeep.join("','") + "'"})` : '');

  const { records = [] } = await conn.autoFetchQuery<SFProcedureRuleTransformation>(query, {
    autoFetch: true,
    maxFetch: 100000,
  });
  const idsToBeDeleted = records.map(({ Id }) => Id);
  const results = (await conn.sobject('VELOCPQ__TransformationRule__c').delete(idsToBeDeleted)) ?? [];
  const successResults = results.filter(({ success }) => success).map((res) => (res as SuccessResult).id);
  const errorResults = results.filter(({ success }) => !success);
  if (successResults.length) {
    console.log(`Deleted rule transformations with ids ${successResults.join(',')} from rule with id ${fromRuleId}`);
  }
  if (errorResults.length) {
    console.log(`Errors occurred while deletion rule transformations: ${errorResults.join('\n')}`);
  }
  return results;
}

export async function upsertRuleTransformation(
  conn: Connection,
  transformation: RuleTransformation,
  ruleId: string,
): Promise<SuccessResult> {
  const body = {
    VELOCPQ__ReferenceId__c: transformation.referenceId,
    VELOCPQ__Sequence__c: transformation.sequence,
    VELOCPQ__RuleId__c: ruleId,
    VELOCPQ__ResultPath__c: transformation.resultPath,
    VELOCPQ__Expression__c: transformation.expression ?? null,
  };
  const existingRuleTransformation = await findRuleTransformations(conn, transformation, ruleId);
  let result;
  if (existingRuleTransformation) {
    result = await conn
      .sobject('VELOCPQ__TransformationRule__c')
      .update({ ...body, Id: existingRuleTransformation.Id });
  } else {
    result = await conn.sobject('VELOCPQ__TransformationRule__c').create(body);
  }

  if (result.success) {
    if (existingRuleTransformation) {
      console.log(`Procedure Rule Transformation ${body.VELOCPQ__ResultPath__c} updated`);
    } else {
      console.log(`New Procedure Rule Transformation ${body.VELOCPQ__ResultPath__c} created with id ${result.id}`);
    }
    if (transformation.javaScript) {
      await createJavaScript(conn, transformation.javaScript, result.id);
    } else {
      await deleteJavaScript(conn, result.id);
    }
  } else {
    throw new SfdxError(`Failed to create document: ${JSON.stringify(result)}`);
  }

  return result;
}

export async function cleanupRuleActions(
  conn: Connection,
  actionIdsToKeep: string[],
  fromRuleId: string,
): Promise<RecordResult[]> {
  const query =
    `SELECT Id
     FROM VELOCPQ__RuleMapper__c
     WHERE VELOCPQ__RuleId__c = '${fromRuleId}'` +
    (actionIdsToKeep.length > 0 ? ` AND Id NOT IN (${"'" + actionIdsToKeep.join("','") + "'"})` : '');

  const { records = [] } = await conn.autoFetchQuery<SFProcedureRuleMapping>(query, {
    autoFetch: true,
    maxFetch: 100000,
  });
  const idsToBeDeleted = records.map(({ Id }) => Id);
  const results = (await conn.sobject('VELOCPQ__RuleMapper__c').delete(idsToBeDeleted)) ?? [];
  const successResults = results.filter(({ success }) => success).map((res) => (res as SuccessResult).id);
  const errorResults = results.filter(({ success }) => !success);
  if (successResults.length) {
    console.log(`Deleted rule actions with ids ${successResults.join(',')} from rule with id ${fromRuleId}`);
  }
  if (errorResults.length) {
    console.log(`Errors occurred while deletion rule actions: ${errorResults.join('\n')}`);
  }
  return results;
}

export async function deleteRuleActions(conn: Connection, fromRuleId: string): Promise<RecordResult[]> {
  const query = `SELECT Id
     FROM VELOCPQ__RuleMapper__c
     WHERE VELOCPQ__RuleId__c = '${fromRuleId}'`;

  const { records = [] } = await conn.autoFetchQuery<SFProcedureRuleMapping>(query, {
    autoFetch: true,
    maxFetch: 100000,
  });
  const idsToBeDeleted = records.map(({ Id }) => Id);
  const results = (await conn.sobject('VELOCPQ__RuleMapper__c').delete(idsToBeDeleted)) ?? [];
  const successResults = results.filter(({ success }) => success).map((res) => (res as SuccessResult).id);
  const errorResults = results.filter(({ success }) => !success);
  if (successResults.length) {
    console.log(`Deleted rule actions with ids ${successResults.join(',')} from rule with id ${fromRuleId}`);
  }
  if (errorResults.length) {
    console.log(`Errors occurred while deletion rule actions: ${errorResults.join('\n')}`);
  }
  return results;
}

export async function createRuleAction(conn: Connection, action: RuleAction, ruleId: string): Promise<SuccessResult> {
  const body = {
    Id: '',
    VELOCPQ__Sequence__c: action.sequence,
    VELOCPQ__Value__c: action.value,
    VELOCPQ__Explanation__c: action.explanation,
    VELOCPQ__Type__c: action.type,
    VELOCPQ__ValueType__c: action.valueType,
    VELOCPQ__TargetFieldName__c: action.targetFieldName,
    VELOCPQ__TotalMetricName__c: action.totalMetricName,
    VELOCPQ__VariableName__c: action.variableName,
    VELOCPQ__IsCalculateTotalMetric__c: action.isCalculateTotalMetric,
    VELOCPQ__RuleId__c: ruleId,
    VELOCPQ__Action__c: action.action,
    VELOCPQ__Message__c: action.message,
    VELOCPQ__MessageValueType__c: action.messageValueType,
    VELOCPQ__AllowOverride__c: action.allowOverride === true,
  };
  const result = await conn.sobject('VELOCPQ__RuleMapper__c').create(body);

  if (result.success) {
    console.log(`Procedure Rule Action ${body.VELOCPQ__Action__c} upserted`);
  } else {
    throw new SfdxError(`Failed to create document: ${JSON.stringify(result)}`);
  }

  return result;
}

export async function createJavaScript(conn: Connection, javaScript: string, transformationId: string): Promise<any> {
  const body = {
    Title: 'script.js',
    PathOnClient: 'script.js',
    VersionData: Buffer.from(javaScript, 'binary').toString('base64'),
    TagCsv: 'transformationRuleScript',
  };
  const contentVersionResult = await conn.sobject('ContentVersion').create(body);

  if (contentVersionResult.success) {
    const contentVersionId = contentVersionResult.id;
    const contentVersionsQuery = `Select Id, ContentDocumentId
                                  From ContentVersion
                                  Where Id = '${contentVersionId}'`;
    const contentResults = await conn.query<SFContent>(contentVersionsQuery);
    const contentDocumentId = contentResults.records[0]?.ContentDocumentId;
    if (contentDocumentId) {
      const linkBody = {
        ContentDocumentId: contentDocumentId,
        LinkedEntityId: transformationId,
      };
      await conn.sobject('ContentDocumentLink').create(linkBody);
    }
  }

  return contentVersionResult;
}

export async function deleteJavaScript(conn: Connection, transformationId: string): Promise<any> {
  const query = `select Id, ContentDocumentId
                 from ContentDocumentLink
                 where LinkedEntityId = '${transformationId}'`;
  const queryResults = await conn.query<SFContent>(query);

  for (const record of queryResults.records) {
    await conn.sobject('ContentDocument').delete(record.ContentDocumentId);
  }
}

const normalizeMetricRule = (rule: Rule): Rule => {
  return {
    ...rule,
    conditions: rule.conditions?.map((condition) => ({ ...condition, objectType: undefined, variableName: undefined })),
    mappers: rule.mappers?.map((action) => ({ ...action, variableName: undefined })),
  };
};

const setSequences = (rule: Rule): Rule => {
  return {
    ...rule,
    conditions: rule.conditions?.map((condition, index) => ({ ...condition, sequence: index })),
    transformations: rule.transformations?.map((transformation, index) => ({ ...transformation, sequence: index })),
    mappers: rule.mappers?.map((mapper, index) => ({ ...mapper, sequence: index })),
  };
};

export const getStringContent = (value: string): string => {
  return /^"(.*)"$/.exec(value)?.[1] || '';
};
