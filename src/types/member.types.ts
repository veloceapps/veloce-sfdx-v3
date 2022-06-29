export interface Member {
  key: string;
  all: boolean;
  names: string[];
}

export type MembersMap = { [key: string]: Member };
