export interface SFProcedureRule {
  Id: string;
  Name: string;
  VELOCPQ__ReferenceId__c: string;
  VELOCPQ__RuleGroupId__r: SFProcedureRuleGroup;
  VELOCPQ__Description__c: string;
  VELOCPQ__Sequence__c: number;
  VELOCPQ__Active__c: boolean;
  VELOCPQ__Default__c: boolean;
  VELOCPQ__RuleGroupId__c: string;
  VELOCPQ__ProcedureRules_RuleConditions__r: SOQLResult<SFProcedureRuleCondition[]>;
  VELOCPQ__ProcedureRules_TransformationRules__r: SOQLResult<SFProcedureRuleTransformation[]>;
  VELOCPQ__ProcedureRules_RuleMappings__r: SOQLResult<SFProcedureRuleMapping[]>;
}

export interface SFProcedureRuleGroup {
  Id: string;
  Name: string;
  VELOCPQ__ReferenceId__c: string;
  VELOCPQ__Type__c: 'GENERAL' | 'APPROVAL' | 'METRIC';
  VELOCPQ__Sequence__c: string;
  VELOCPQ__Description__c: string;
  VELOCPQ__Active__c: boolean;
}

export interface SFProcedureRuleCondition {
  Id: string;
  VELOCPQ__ReferenceId__c: string;
  VELOCPQ__Sequence__c: number;
  VELOCPQ__VariableName__c: string;
  VELOCPQ__Property__c?: string;
  VELOCPQ__ExpressionsJsonString__c: string;
  VELOCPQ__RuleId__c: string;
  VELOCPQ__ObjectType__c: string;
}

export interface SFProcedureRuleTransformation {
  Id: string;
  VELOCPQ__ReferenceId__c: string;
  VELOCPQ__Sequence__c: number;
  VELOCPQ__ResultPath__c: string;
  VELOCPQ__JavaScript__c: string;
  VELOCPQ__Expression__c: string;
  VELOCPQ__ScriptJsId__c: string;
}

export interface SFProcedureRuleMapping {
  Id: string;
  VELOCPQ__ReferenceId__c: string;
  VELOCPQ__Sequence__c: number;
  VELOCPQ__Value__c: string;
  VELOCPQ__Explanation__c: string;
  VELOCPQ__Type__c: string;
  VELOCPQ__ValueType__c: string;
  VELOCPQ__TargetFieldName__c: string;
  VELOCPQ__TotalMetricName__c: string;
  VELOCPQ__VariableName__c: string;
  VELOCPQ__RuleId__c: string;
  VELOCPQ__Action__c: string;
  VELOCPQ__Message__c: string;
  VELOCPQ__MessageValueType__c: string;
  VELOCPQ__AllowOverride__c: boolean;
  VELOCPQ__Eligible__c: boolean;
}

interface SOQLResult<T> {
  records: T;
}

export interface SFContent {
  Id: string;
  ContentDocumentId: string;
  LinkedEntityId: string;
}

export const RuleObjectTypes: { [key: string]: string } = {
  LINE_ITEM: 'PriceItem',
  CHARGE_ITEM: 'ChargeItem',
  CONTEXT: 'Header',
  PROCEDURE_CONTEXT_OBJECT: 'ProcedureContext',
  CATALOG_PRODUCT: 'CatalogProduct',
  PriceItem: 'LINE_ITEM',
  ChargeItem: 'CHARGE_ITEM',
  Header: 'CONTEXT',
  ProcedureContext: 'PROCEDURE_CONTEXT_OBJECT',
  CatalogProduct: 'CATALOG_PRODUCT',
};

export interface RuleGroup {
  referenceId: string;
  name: string;
  type: string;
  sequence: number;
  description: number;
  active: boolean;
  rules: Rule[];
}

export interface Rule {
  referenceId?: string;
  name?: string;
  sequence?: number;
  description?: string;
  ruleGroupId?: string;
  ruleGroupName?: string;
  ruleGroupType?: string;
  active?: boolean;
  isDefault?: boolean;
  conditions: RuleCondition[];
  transformations: RuleTransformation[];
  mappers: RuleAction[];
}

export interface RuleCondition {
  referenceId?: string;
  sequence?: number;
  expression?: string;
  objectType?: string;
  variableName?: string;
  property?: string;
}

export interface RuleTransformation {
  referenceId?: string;
  sequence?: number;
  expression?: string;
  javaScript?: string;
  resultPath?: string;
}

export interface RuleAction {
  referenceId?: string;
  sequence?: number;
  action?: string;
  value?: string;
  targetFieldName?: string;
  variableName?: string;
  type?: string | undefined;
  explanation?: string;
  valueType?: string;
  isCalculateTotalMetric?: boolean;
  totalMetricName?: string;
  message?: string;
  messageValueType?: string;
  allowOverride?: boolean;
  eligible?: boolean;
}
