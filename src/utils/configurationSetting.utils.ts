import { Connection, SfdxError } from '@salesforce/core';
import { ConfigurationSetting, ConfigurationSettingNew } from '../types/configurationSetting.types';
import { SuccessResult } from 'jsforce/record-result';

export async function fetchConfigurationSettings(conn: Connection): Promise<ConfigurationSetting[]> {
  const query = 'SELECT Id,VELOCPQ__Key__c,VELOCPQ__Value__c FROM VELOCPQ__ConfigurationSetting__c';

  const result = await conn.autoFetchQuery<ConfigurationSetting>(query, {autoFetch: true, maxFetch: 100000});
  return result?.records ?? [];
}

export async function createConfigurationSetting(conn: Connection, body: ConfigurationSettingNew): Promise<SuccessResult> {
  const result = await conn.sobject('VELOCPQ__ConfigurationSetting__c').create(body);

  if (result.success) {
    console.log(`New ConfigurationSetting ${body.VELOCPQ__Key__c} created with id ${result.id}`);
  } else {
    throw new SfdxError(`Failed to create document: ${JSON.stringify(result)}`);
  }

  return result;
}
