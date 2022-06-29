export type UiDef = UiDefinition | LegacyUiDefinition;

export type UiMetadata = Omit<UiDefinition, 'children'> & {
  children: string[];
};

export interface UiDefinition {
  name: string;
  version: number;
  children: UiElement[];
  properties?: {
    priceList?: string;
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
