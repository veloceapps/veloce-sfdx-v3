import { Connection } from '@salesforce/core';
import { parseJsonSafe, writeFileSafe } from '../utils/common.utils';
import { fetchConfigurationSettings } from '../utils/configurationSetting.utils';
import { ConfigurationSetting } from '../types/configurationSetting.types';
import { Member } from '../types/member.types';

export interface PullSettingsParams {
  sourcepath: string;
  conn: Connection;
  member: Member | undefined;
}

export async function pullSettings(params: PullSettingsParams): Promise<string[]> {
  const {sourcepath, conn, member} = params;
  if (!member) {
    return [];
  }

  const dir = `${sourcepath}/settings`;

  const settings: ConfigurationSetting[] = await fetchConfigurationSettings(conn);
  console.log(`Pulling ConfigurationSettings result count: ${settings.length}`);

  settings.forEach(({ VELOCPQ__Key__c, VELOCPQ__Value__c }) => {
    const parsedValue = parseJsonSafe(VELOCPQ__Value__c);
    const isObject = typeof parsedValue === 'object';
    const valueToWrite = isObject ? JSON.stringify(parsedValue ?? '', null, 2) : VELOCPQ__Value__c;

    writeFileSafe(dir, `${VELOCPQ__Key__c}.${isObject ? 'json' : 'js'}`, valueToWrite, { flag: 'w+' });
  });

  return settings.map(({Id}) => Id);
}
