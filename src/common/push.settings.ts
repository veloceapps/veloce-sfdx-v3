import { readdirSync, readFileSync } from 'fs';
import { Connection, SfdxError } from '@salesforce/core';
import { createConfigurationSetting, fetchConfigurationSettings } from '../utils/configurationSetting.utils';
import { ConfigurationSetting } from '../types/configurationSetting.types';
import { Member } from '../types/member.types';

export interface PushSettingsParams {
  rootPath: string;
  conn: Connection;
  member?: Member;
  skipdelete?: boolean;
}

export async function pushSettings(params: PushSettingsParams): Promise<string[]> {
  const { rootPath, conn, member, skipdelete } = params;
  if (!member) {
    return [];
  }

  const dir = `${rootPath}/settings`;
  const existingSettings: ConfigurationSetting[] = await fetchConfigurationSettings(conn);
  const files = readdirSync(dir);
  const ids: string[] = [];

  for (const file of files) {
    const content = readFileSync(`${dir}/${file}`, 'utf8');
    const name = file.split('.')[0].trim();
    const existingSetting: ConfigurationSetting|undefined = existingSettings.find(({VELOCPQ__Key__c}) => VELOCPQ__Key__c.trim() === name);
    const body = {
      VELOCPQ__Value__c: content,
      VELOCPQ__Key__c: name
    };
    if (existingSetting) {
      await conn.request({
        url: `/services/data/v${conn.getApiVersion()}/sobjects/VELOCPQ__ConfigurationSetting__c/${existingSetting.Id}`,
        body: JSON.stringify(body),
        method: 'PATCH'
      });
      console.log(`ConfigurationSetting ${body.VELOCPQ__Key__c} with id ${existingSetting.Id} is updated`);
      ids.push(existingSetting.Id);
    } else {
      const result = await createConfigurationSetting(conn, body);
      ids.push(result.id);
    }
  }

  if (!skipdelete) {
    const settingsToDelete = existingSettings.reduce((acc, {Id}) => {
      if (!ids.includes(Id)) {
        acc.push(Id);
      }
      return acc;
    }, [] as string[]);
    const deleteResult = await conn.sobject('VELOCPQ__ConfigurationSetting__c').delete(settingsToDelete);
    deleteResult.forEach((result) => {
      if (result.success) {
        console.log(`ConfigurationSetting with id ${result.id} is deleted`);
      } else {
        throw new SfdxError(`Failed to delete ConfigurationSetting: ${JSON.stringify(result)}`);
      }
    });
  }

  return ids;
}
