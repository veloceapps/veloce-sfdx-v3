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
  console.log(`Dumping ConfigurationSettings result count: ${settings.length}`);

  settings.forEach(({ VELOCPQ__Key__c, VELOCPQ__Value__c }) => {
    const isObject = typeof parseJsonSafe(VELOCPQ__Value__c) === 'object';
    writeFileSafe(dir, `${VELOCPQ__Key__c}.${isObject ? 'json' : 'js'}`, VELOCPQ__Value__c, { flag: 'w+' });
  });

  return settings.map(({Id}) => Id);
}
