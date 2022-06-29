export interface Criteria {
  key: string;
  all: boolean;
  names: string[];
}

export function splitMembers(members: string): {[key: string]: Criteria} {
  const membersArray = members.split(',')

  const result_map: {[key: string]: Criteria} = {};

  for (const m of membersArray) {
    const [key, name] = m.split(':');
    const criteria: Criteria = result_map[key] ?? {key, all: false, names: []};
    if (name) {
      criteria.names.push(name);
    } else {
      criteria.all = true;
    }
    result_map[key] = criteria;
  }

  return result_map;
}
