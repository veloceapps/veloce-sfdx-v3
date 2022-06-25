export type IdMap = { [key: string]: string }

export interface CreateResult {
  id: string;
  success: boolean;
  errors: string[];
  name: string;
  message: string;
}

export interface Folder {
  Id: string;
  Name: string;
  DeveloperName: string;
  AccessType: string;
  Type: string;
}
