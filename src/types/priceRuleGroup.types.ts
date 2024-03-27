export interface PriceRuleGroup {
  Id: string;
  Name: string;
  VELOCPQ__Active__c: boolean;
  VELOCPQ__Description__c: string;
  VELOCPQ__ReferenceId__c: string;
  VELOCPQ__Sequence__c: number;
  VELOCPQ__Type__c: string;
  VELOCPQ__PriceListId__c: string;
  script__c?: string;
}
