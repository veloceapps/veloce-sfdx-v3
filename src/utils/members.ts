export interface Member {
  sobjectType: string;
  name: string;
  all: boolean;
}

export function parseMembers(membersFlag: string): Member[] {
  const members = membersFlag.split(',');
  const result: Member[] = [];
  for (const m of members) {
    const mParts = m.split(':');
    result.push({
      sobjectType: mParts[0],
      name: mParts.length > 1 ? mParts[1] : '',
      all: mParts.length === 1,
    });
  }
  return result;
}
