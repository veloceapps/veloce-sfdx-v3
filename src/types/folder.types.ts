export interface NewFolder {
  Name: string;
  DeveloperName: string;
  AccessType: string;
  Type: string;
}

export type Folder = {
  Id: string;
} & NewFolder;
