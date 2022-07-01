import { Connection } from '@salesforce/core';
import { ConfigurationSetting } from '../types/configurationSetting.types';

export async function fetchConfigurationSettings(conn: Connection): Promise<ConfigurationSetting[]> {
  const query = 'SELECT Id,VELOCPQ__Key__c,VELOCPQ__Value__c FROM VELOCPQ__ConfigurationSetting__c';

  const result = await conn.autoFetchQuery<ConfigurationSetting>(query, {autoFetch: true, maxFetch: 100000});
  return result?.records ?? [];
}
