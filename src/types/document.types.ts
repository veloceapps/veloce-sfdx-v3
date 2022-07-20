export interface Document {
  Id: string;
  Body: string;
  FolderId: string;
}

export interface DocumentBody {
  body: string;
  name: string;
  folderId: string;
  contentType: string;
  type: string;
}
