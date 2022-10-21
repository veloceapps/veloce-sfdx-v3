import { Connection } from '@salesforce/core';
import { Member } from './member.types';
import { IdMap } from './idmap';

export interface CommandParams {
  idmap: IdMap;
  rootPath: string;
  conn: Connection;
  member: Member | undefined;
  skipdelete?: boolean;
}
