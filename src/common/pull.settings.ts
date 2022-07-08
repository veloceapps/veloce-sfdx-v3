import { parseJsonSafe, writeFileSafe } from '../utils/common.utils';
import { fetchConfigurationSettings } from '../utils/configurationSetting.utils';
import { ConfigurationSetting } from '../types/configurationSetting.types';
import { CommandParams } from '../types/command.types';

export async function pullSettings(params: CommandParams): Promise<string[]> {
  const { rootPath, conn, member } = params;
  if (!member) {
    return [];
  }

  const dir = `${rootPath}/settings`;

  const settings: ConfigurationSetting[] = await fetchConfigurationSettings(conn);
  console.log(`Pulling ConfigurationSettings result count: ${settings.length}`);

  settings.forEach(({ VELOCPQ__Key__c, VELOCPQ__Value__c }) => {
    const parsedValue = parseJsonSafe(VELOCPQ__Value__c);
    const isObject = typeof parsedValue === 'object';
    const valueToWrite = isObject ? JSON.stringify(parsedValue ?? '', null, 2) : VELOCPQ__Value__c;

    writeFileSafe(dir, `${VELOCPQ__Key__c}.${isObject ? 'json' : 'js'}`, valueToWrite, { flag: 'w+' });
  });

  return settings.map(({ Id }) => Id);
}
