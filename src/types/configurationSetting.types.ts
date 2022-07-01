
export interface ConfigurationSettingNew {
  VELOCPQ__Key__c: string;
  VELOCPQ__Value__c: string;
}

export type ConfigurationSetting = {
  Id: string;
} & ConfigurationSettingNew;
