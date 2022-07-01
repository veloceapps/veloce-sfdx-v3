import { Connection, SfdxError } from '@salesforce/core';
import { readdirSync, readFileSync } from 'fs';
import { createConfigurationSetting, fetchConfigurationSettings } from '../utils/configurationSetting.utils';
import { ConfigurationSetting } from '../types/configurationSetting.types';
import { Member } from '../types/member.types';

export interface PushSettingsParams {
  rootPath: string;
  conn: Connection;
  member: Member | undefined;
}

export async function pushSettings(params: PushSettingsParams): Promise<string[]> {
  const { rootPath, conn, member } = params;
  if (!member) {
    return [];
  }

  const dir: string = `${rootPath}/settings`;
  const existingSettings: ConfigurationSetting[] = await fetchConfigurationSettings(conn);
  const files = readdirSync(dir);
  const ids = [];

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
      ids.push(existingSetting.Id);
    } else {
      const result = await createConfigurationSetting(conn, body);
      ids.push(result.id);
    }
  }

  const settingsToDelete = existingSettings.reduce((acc, {Id}) => {
    if (!ids.includes(Id)) {
      acc.push(Id);
    }
    return acc;
  }, []);
  const deleteResult = await conn.sobject('VELOCPQ__ConfigurationSetting__c').delete(settingsToDelete);
  deleteResult.forEach((result) => {
    if (result.success) {
      console.log(`ConfigurationSetting with id ${result.id} is deleted`);
    } else {
      throw new SfdxError(`Failed to delete ConfigurationSetting: ${JSON.stringify(result)}`);
    }
  });

  return ids;
}
