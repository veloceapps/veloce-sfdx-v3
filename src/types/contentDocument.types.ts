
export interface ContentDocument {
  Id: string;
}

export interface ContentVersion {
  Title?: string;
  PathOnClient?: string;
  SharingOption?: string;
  SharingPrivacy?: string;
  VersionData?: string;
  ContentDocumentId?: string;
  Id?: string;
}
