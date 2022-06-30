import { isEmpty } from 'lodash';
import { Member } from '../types/member.types';

export class MembersMap {
  private readonly result_map: { [key: string]: Member };
  private readonly any_member: Member = { key: 'any', all: true, names: [] };

  public constructor(members: string) {
    this.result_map = {};
    if (members === '') {
      return;
    }
    const membersArray = members.split(',');
    for (const m of membersArray) {
      const [key, name] = m.split(':');
      const member: Member = this.result_map[key] ?? { key, all: false, names: [] };
      if (name) {
        member.names.push(name);
      } else {
        member.all = true;
      }
      this.result_map[key] = member;
    }
  }

  public get(key: string): Member | undefined {
    if (isEmpty(this.result_map)) {
      return this.any_member;
    } else {
      return this.result_map[key];
    }
  }
}
