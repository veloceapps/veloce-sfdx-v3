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
