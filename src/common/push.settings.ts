import { Connection } from '@salesforce/core';
import { readdirSync } from 'fs';

export interface PushSettingsParams {
  sourcepath: string;
  conn: Connection;
}

export async function pushSettings(params: PushSettingsParams): Promise<string[]> {
  const { sourcepath, conn } = params;

  const dir: string = `${sourcepath}/settings`;

  readdirSync(dir).forEach((file) => {


  });

  return [];
}
