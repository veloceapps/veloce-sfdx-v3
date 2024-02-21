export interface CreateResult {
  id: string;
  success: boolean;
  errors: string[];
  name: string;
  message: string;
}

export interface OrgInfo {
  BackendURL: string;
}

export interface SubscriberPackage {
  Id: string;
  Name: string;
  NamespacePrefix: string;
}

export interface SubscriberPackageVersion {
  Id: string;
  Name: string;
  MajorVersion: number;
  MinorVersion: number;
  PatchVersion: number;
}

export interface InstalledSubscriberPackage {
  Id: string;
  SubscriberPackageId: string;
  SubscriberPackage: SubscriberPackage;
  SubscriberPackageVersionId: string;
  SubscriberPackageVersion: SubscriberPackageVersion;
}
