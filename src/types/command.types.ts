import { Connection } from '@salesforce/core';
import { IdMap } from './idmap';
import { Member } from './member.types';

export interface CommandParams {
  idmap?: IdMap;
  rootPath: string;
  conn: Connection;
  member: Member | undefined;
  skipdelete?: boolean;
}
