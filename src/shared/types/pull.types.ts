export enum MemberType {
  ui = 'config-ui',
  pml = 'pml',
}

export interface MembersMap {
  [MemberType]: Array<{ modelName: string; defName?: string }>;
}
