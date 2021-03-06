
export interface Template {
  Name: string;
  VELOCPQ__FileId__c: string;
  VELOCPQ__FileName__c: string;
  VELOCPQ__Active__c: boolean;
  VELOCPQ__Description__c?: string;
  VELOCPQ__Properties__c?: string;
  VELOCPQ__Queries__c?: string;
  VELOCPQ__Script__c: string;
  VELOCPQ__ReferenceId__c?: string;
  Id?: string;
}
