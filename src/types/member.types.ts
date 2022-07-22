export type MemberKey = 'any' | 'model' | 'config-ui' | 'drl' | 'rule' | 'config-settings' | 'doc-template';

export interface Member {
  key: MemberKey;
  all: boolean;
  names: string[];
}
