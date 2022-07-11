import * as fs from 'fs';
import * as path from 'path';
import { Connection, SfdxError } from '@salesforce/core';
import { SuccessResult } from 'jsforce/record-result';
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
  SFProcedureRuleGroup,
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
  let query = `SELECT  Id,
        Name,
        VELOCPQ__RuleGroupId__r.Name,
        VELOCPQ__RuleGroupId__r.VELOCPQ__Type__c,
        VELOCPQ__RuleGroupId__r.VELOCPQ__Sequence__c,
        VELOCPQ__RuleGroupId__r.VELOCPQ__Description__c,
        VELOCPQ__RuleGroupId__r.VELOCPQ__Active__c,
        VELOCPQ__Description__c,
        VELOCPQ__Sequence__c,
        VELOCPQ__Active__c,
        VELOCPQ__RuleGroupId__c,
        (SELECT  Id,
        VELOCPQ__VariableName__c,
        VELOCPQ__ExpressionsJsonString__c,
        VELOCPQ__RuleId__c,
        VELOCPQ__ObjectType__c
        FROM    VELOCPQ__ProcedureRules_RuleConditions__r
        ),
                (SELECT  Id,
                VELOCPQ__RuleId__c,
                VELOCPQ__Sequence__c,
                VELOCPQ__ResultPath__c,
                VELOCPQ__Expression__c
        FROM    VELOCPQ__ProcedureRules_TransformationRules__r
        ),
                (SELECT  Id,
                VELOCPQ__Value__c,
                VELOCPQ__Explanation__c,
                VELOCPQ__Type__c,
                VELOCPQ__ValueType__c,
                VELOCPQ__TargetFieldName__c,
                VELOCPQ__TotalMetricName__c,
                VELOCPQ__VariableName__c,
                VELOCPQ__RuleId__c,
                VELOCPQ__Action__c
        FROM    VELOCPQ__ProcedureRules_RuleMappings__r
        )
        FROM
        VELOCPQ__ProcedureRule__c`;
  if (!dumpAll) {
    query += ` WHERE Name IN ('${ruleNames?.join("','")}')`;
  }

  const result = await conn.query<SFProcedureRule>(query);

  // get script file for transformations
  const rules = result?.records ?? [];
  const transformationIds = rules.reduce((acc, rule) => {
    return [...acc, ...(rule?.VELOCPQ__ProcedureRules_TransformationRules__r?.records || []).map(({ Id }) => Id)];
  }, [] as string[]);

  const contentLinksQuery = `Select Id, ContentDocumentId, LinkedEntityId From ContentDocumentLink Where LinkedEntityId IN ('${transformationIds.join(
    "','",
  )}')`;
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
        ...rule.VELOCPQ__ProcedureRules_TransformationRules__r,
        records: (rule?.VELOCPQ__ProcedureRules_TransformationRules__r?.records || []).map((transformation) => {
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

const saveToJSON = (procedureRules: SFProcedureRule[], pathToSave: string): any => {
  const { VELOCPQ__RuleGroupId__c, VELOCPQ__RuleGroupId__r } = procedureRules[0];
  const generatedJSON = {
    id: VELOCPQ__RuleGroupId__c,
    name: VELOCPQ__RuleGroupId__r.Name,
    type: VELOCPQ__RuleGroupId__r.VELOCPQ__Type__c,
    sequence: VELOCPQ__RuleGroupId__r.VELOCPQ__Sequence__c,
    description: VELOCPQ__RuleGroupId__r.VELOCPQ__Description__c,
    active: VELOCPQ__RuleGroupId__r.VELOCPQ__Active__c,
    rules: procedureRules.map(({ Id, Name, VELOCPQ__Description__c, VELOCPQ__Active__c }) => ({
      id: Id,
      name: Name,
      description: VELOCPQ__Description__c,
      active: VELOCPQ__Active__c,
    })),
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
      const conditions = conditionsToDSL(procedureRule.VELOCPQ__ProcedureRules_RuleConditions__r?.records);
      const transformations = transformationsToDSL(
        procedureRule.VELOCPQ__ProcedureRules_TransformationRules__r?.records,
      );
      const actions = actionsToDSL(procedureRule.VELOCPQ__ProcedureRules_RuleMappings__r?.records);
      return `rule "${procedureRule.Name}"
    sequence ${procedureRule.VELOCPQ__Sequence__c}
    ${conditions}
    ${transformations}
    ${actions}
end`;
    })
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

const conditionsToDSL = (conditions: SFProcedureRuleCondition[]): string => {
  if (!conditions?.length) {
    return '';
  }
  return `condition
        ${conditions
          .map(
            (condition) =>
              `${condition.VELOCPQ__VariableName__c}: ${RuleObjectTypes[condition.VELOCPQ__ObjectType__c]}(${
                condition.VELOCPQ__ExpressionsJsonString__c ?? ''
              })`,
          )
          .join('\n        ')}`;
};

const transformationsToDSL = (transformations: SFProcedureRuleTransformation[]): string => {
  if (!transformations?.length) {
    return '';
  }
  return `transformation
        ${transformations
          .map(
            (transformation) =>
              `${transformation.VELOCPQ__ResultPath__c}: ${
                transformation.VELOCPQ__JavaScript__c
                  ? '{{' + transformation.VELOCPQ__JavaScript__c + '}}'
                  : transformation.VELOCPQ__Expression__c
              }`,
          )
          .join('\n        ')}`;
};

const actionsToDSL = (actions: SFProcedureRuleMapping[]): string => {
  if (!actions?.length) {
    return '';
  }
  return `action
        ${actions
          .map((action) => {
            const argumentsOrder = [
              action.VELOCPQ__TargetFieldName__c,
              action.VELOCPQ__Type__c,
              action.VELOCPQ__Value__c,
              action.VELOCPQ__Explanation__c,
              action.VELOCPQ__TotalMetricName__c,
            ];
            return `${action.VELOCPQ__VariableName__c}.${camelCase(action.VELOCPQ__Action__c)}(${argumentsOrder
              .filter((arg) => !!arg)
              .join(',')})`;
          })
          .join('\n        ')}`;
};

export function getRuleGroups(directory: string): RuleGroup[] {
  const extension = '.vlrl';
  const result: RuleGroup[] = [];
  fs.readdirSync(directory).forEach((file) => {
    if (path.extname(file).toLowerCase() === extension) {
      result.push(extractRuleGroup(file, directory));
    }
  });

  return result;
}

function extractRuleGroup(file: string, directory: string): RuleGroup {
  const metadataString = fs.readFileSync(`${directory}/${file.replace('.vlrl', '.json')}`).toString();
  const ruleGroup: RuleGroup = parseJsonSafe(metadataString);

  const dslString = fs.readFileSync(`${directory}/${file}`).toString();
  const parser = createRulesParser(dslString);
  const tree = parser.compilationUnit();
  const visitor = new RuleVisitor();
  visitor.visit(tree);

  return {
    ...ruleGroup,
    rules: ruleGroup.rules.map((rule, index) => ({ ...rule, ...visitor.rules[index] })),
  };
}

export async function searchRuleGroups(conn: Connection, ruleGroup: RuleGroup): Promise<SFProcedureRuleGroup[]> {
  const query = `SELECT Id,Name,VELOCPQ__Type__c, VELOCPQ__Sequence__c, VELOCPQ__Description__c, VELOCPQ__Active__c FROM VELOCPQ__RuleGroup__c WHERE Name='${ruleGroup.name}' AND VELOCPQ__Type__c ='${ruleGroup.type}'`;

  const result = await conn.autoFetchQuery<SFProcedureRuleGroup>(query, { autoFetch: true, maxFetch: 100000 });
  return result?.records ?? [];
}

export async function createUpdateRuleGroup(conn: Connection, ruleGroup: RuleGroup): Promise<SuccessResult> {
  const body = {
    Id: ruleGroup.id,
    Name: ruleGroup.name,
    VELOCPQ__Type__c: ruleGroup.type,
    VELOCPQ__Sequence__c: ruleGroup.sequence,
    VELOCPQ__Description__c: ruleGroup.description,
    VELOCPQ__Active__c: ruleGroup.active,
  };
  const existingRuleGroup = (await searchRuleGroups(conn, ruleGroup))[0];
  let result;
  if (existingRuleGroup) {
    result = await conn.sobject('VELOCPQ__RuleGroup__c').update({ ...body, Id: existingRuleGroup.Id });
  } else {
    result = await conn.sobject('VELOCPQ__RuleGroup__c').create(body);
  }

  if (result.success) {
    if (existingRuleGroup) {
      console.log(`Rule Group ${body.Name} updated`);
    } else {
      console.log(`New Rule Group ${body.Name} created with id ${result.id}`);
    }
  } else {
    throw new SfdxError(`Failed to create document: ${JSON.stringify(result)}`);
  }

  return result;
}

export async function searchRules(conn: Connection, rule: Rule, ruleGroup: RuleGroup): Promise<SFProcedureRule[]> {
  const query = `SELECT Id FROM VELOCPQ__ProcedureRule__c WHERE Name='${rule.name}' AND VELOCPQ__RuleGroupId__r.Name ='${ruleGroup.name}'`;

  const result = await conn.autoFetchQuery<SFProcedureRule>(query, { autoFetch: true, maxFetch: 100000 });
  return result?.records ?? [];
}

export async function createUpdateRule(
  conn: Connection,
  rule: Rule,
  ruleGroupId: string,
  ruleGroup: RuleGroup,
): Promise<SuccessResult> {
  const body = {
    Id: '',
    Name: rule.name,
    VELOCPQ__Description__c: rule.description,
    VELOCPQ__Sequence__c: rule.sequence,
    VELOCPQ__Active__c: rule.active,
    VELOCPQ__RuleGroupId__c: ruleGroupId,
  };
  const existingRule = (await searchRules(conn, rule, ruleGroup))[0];
  let result;
  if (existingRule) {
    result = await conn.sobject('VELOCPQ__ProcedureRule__c').update({ ...body, Id: existingRule.Id });
  } else {
    result = await conn.sobject('VELOCPQ__ProcedureRule__c').create(body);
  }

  if (result.success) {
    if (existingRule) {
      console.log(`Procedure Rule ${body.Name} updated`);
    } else {
      console.log(`New Procedure Rule ${body.Name} created with id ${result.id}`);
    }
  } else {
    throw new SfdxError(`Failed to create document: ${JSON.stringify(result)}`);
  }

  return result;
}

export async function searchRuleConditions(
  conn: Connection,
  condition: RuleCondition,
  ruleId: string,
): Promise<SFProcedureRuleCondition[]> {
  const query = `SELECT Id FROM VELOCPQ__RuleCondition__c WHERE VELOCPQ__VariableName__c='${condition.variableName}' AND VELOCPQ__RuleId__c ='${ruleId}'`;

  const result = await conn.autoFetchQuery<SFProcedureRuleCondition>(query, { autoFetch: true, maxFetch: 100000 });
  return result?.records ?? [];
}

export async function createUpdateRuleCondition(
  conn: Connection,
  condition: RuleCondition,
  ruleId: string,
): Promise<SuccessResult> {
  const body = {
    Id: '',
    VELOCPQ__VariableName__c: condition.variableName,
    VELOCPQ__ExpressionsJsonString__c: condition.expression,
    VELOCPQ__RuleId__c: ruleId,
    VELOCPQ__ObjectType__c: condition.objectType,
  };
  const existingRuleCondition = (await searchRuleConditions(conn, condition, ruleId))[0];
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

export async function searchRuleTransformations(
  conn: Connection,
  transformation: RuleTransformation,
  ruleId: string,
): Promise<SFProcedureRuleTransformation[]> {
  const query = `SELECT Id FROM VELOCPQ__TransformationRule__c WHERE VELOCPQ__ResultPath__c='${transformation.resultPath}' AND VELOCPQ__RuleId__c ='${ruleId}'`;

  const result = await conn.autoFetchQuery<SFProcedureRuleTransformation>(query, { autoFetch: true, maxFetch: 100000 });
  return result?.records ?? [];
}

export async function createUpdateRuleTransformation(
  conn: Connection,
  transformation: RuleTransformation,
  ruleId: string,
): Promise<SuccessResult> {
  const body = {
    Id: '',
    VELOCPQ__RuleId__c: ruleId,
    VELOCPQ__ResultPath__c: transformation.resultPath,
    VELOCPQ__Expression__c: transformation.expression,
  };
  const existingRuleTransformation = (await searchRuleTransformations(conn, transformation, ruleId))[0];
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
    }
  } else {
    throw new SfdxError(`Failed to create document: ${JSON.stringify(result)}`);
  }

  return result;
}

export async function createRuleAction(conn: Connection, action: RuleAction, ruleId: string): Promise<SuccessResult> {
  const body = {
    Id: '',
    VELOCPQ__Value__c: action.value,
    VELOCPQ__Explanation__c: action.explanation,
    VELOCPQ__Type__c: action.type,
    VELOCPQ__ValueType__c: action.valueType,
    VELOCPQ__TargetFieldName__c: action.targetFieldName,
    VELOCPQ__TotalMetricName__c: action.totalMetricName,
    VELOCPQ__VariableName__c: action.variableName,
    VELOCPQ__RuleId__c: ruleId,
    VELOCPQ__Action__c: action.action,
  };

  const result = await conn.sobject('VELOCPQ__RuleMapper__c').create(body);

  if (result.success) {
    console.log(`New Procedure Rule Action ${body.VELOCPQ__Action__c} created with id ${result.id}`);
  } else {
    throw new SfdxError(`Failed to create document: ${JSON.stringify(result)}`);
  }

  return result;
}

export async function createJavaScript(conn: Connection, javaScript: string, transformationId: string): Promise<any> {
  const body = {
    Title: 'script.js',
    PathOnClient: 'script.js',
    VersionData: btoa(javaScript),
    TagCsv: 'transformationRuleScript',
  };
  const contentVersionResult = await conn.sobject('ContentVersion').create(body);

  if (contentVersionResult.success) {
    const contentVersionId = contentVersionResult.id;
    const contentVersionsQuery = `Select Id, ContentDocumentId From ContentVersion Where Id='${contentVersionId}'`;
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
