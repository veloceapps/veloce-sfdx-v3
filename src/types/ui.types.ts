export type UiDef = UiDefinition | LegacyUiDefinition;

export interface SfUIDefinition {
  Id?: string;
  Name: string;
  VELOCPQ__ModelId__c: string;
  VELOCPQ__Default__c: boolean;
  VELOCPQ__SourceBlob__c?: string;
  VELOCPQ__SourceDocumentId__c: string;
  VELOCPQ__ModelVersion__c: string;
  VELOCPQ__ReferenceId__c?: string;
}

export interface SfConfigurationProcessor {
  Id?: string;
  Name: string;
  VELOCPQ__ApiNameField__c: string;
  VELOCPQ__OwnerId__c: string;
  VELOCPQ__ReferenceId__c?: string;
  VELOCPQ__Script__c?: string;
  VELOCPQ__ScriptDocumentId__c?: string;
  VELOCPQ__Type__c: string;
}

export interface UiDefinitionContainerDto {
  uiDef: UiDef;
  sfMetadata: SfUIDefinition;
}

export type UiMetadata = Omit<UiDefinition, 'children'> & {
  children: string[];
};

export interface UiDefinition {
  name: string;
  version: number;
  primary?: boolean;
  children: UiElement[];
  properties?: {
    priceListId?: string;
    quoteId?: string;
    productId?: string;
  };
}

export interface UiElementMetadata {
  name: string;
  children?: string[];
}

export interface UiElement {
  children: UiElement[];
  template?: string;
  script?: string;
  styles?: string;
}

export interface LegacyUiDefinition {
  name: string;
  tabs: LegacyTab[];
  sections: LegacySection[];
  priceList?: string;
}

export interface LegacyTab {
  id: string;
  name: string;
}

export interface LegacySection {
  id: string;
  label: string;
  page: string;
  parentId?: string;
  template?: string;
  templateUrl?: string;
  styles?: string;
  stylesUrl?: string;
  script?: string;
  scriptUrl?: string;
  properties?: { [key: string]: unknown };
  propertiesUrl?: string;
}
