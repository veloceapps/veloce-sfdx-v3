import { SfdxError } from '@salesforce/core';
import { isEmpty } from 'lodash';
import { Member, MemberKey } from '../types/member.types';

const VALID_MEMBER_KEYS: MemberKey[] = ['any', 'config-settings', 'config-ui', 'doc-template', 'drl', 'model', 'rule'];

export class MembersMap {
  private readonly result_map: { [key in MemberKey]?: Member };
  private readonly any_member: Member = { key: 'any', all: true, names: [] };

  public constructor(members: string) {
    this.result_map = {};
    if (members === '') {
      return;
    }
    const membersArray = members.split(',');
    for (const m of membersArray) {
      const data = m.split(':');
      const name = data.slice(1).join(':');
      const key = data[0] as MemberKey;
      this.assertValidMemberKey(key);
      const member: Member = this.result_map[key] ?? { key, all: false, names: [] };
      if (name) {
        member.names.push(name);
      } else {
        member.all = true;
      }
      this.result_map[key] = member;
    }
  }

  public get(key: MemberKey): Member | undefined {
    if (isEmpty(this.result_map)) {
      return this.any_member;
    } else {
      return this.result_map[key];
    }
  }

  private assertValidMemberKey(key: string): void {
    if (!VALID_MEMBER_KEYS.includes(key as MemberKey)) {
      throw new SfdxError(`Invalid member: ${key}`, 'ApexError');
    }
  }
}
