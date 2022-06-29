import { Member, MembersMap } from '../types/member.types';

export function splitMembers(members: string): MembersMap {
  const membersArray = members.split(',');

  const result_map: MembersMap = {};

  for (const m of membersArray) {
    const [key, name] = m.split(':');
    const member: Member = result_map[key] ?? { key, all: false, names: [] };
    if (name) {
      member.names.push(name);
    } else {
      member.all = true;
    }
    result_map[key] = member;
  }

  return result_map;
}
