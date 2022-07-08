import { Connection } from '@salesforce/core';
import { Member } from './member.types';

export interface CommandParams {
  rootPath: string;
  conn: Connection;
  member: Member | undefined;
  skipdelete?: boolean;
}
