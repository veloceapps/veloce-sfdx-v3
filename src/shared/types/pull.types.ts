export enum MemberType {
  ui = 'config-ui',
  pml = 'pml',
}

export interface MembersMap {
  [MemberType]: { modelName: string; defName?: string; }[]
}
