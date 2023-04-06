export interface MaterialType {
  id: string;
  documentCategory: string;
  section: string;
  courtDocumentTypeRBAC: DocumentTypeRBAC;
  seqNum: number;
  sentToCps: boolean;
}

export interface DocumentTypeRBAC {
  uploadUserGroups: UserGroup[];
}

export interface UserGroup {
  cppGroup: CPPGroup;
  validFrom: string;
  validTo: string;
}

export interface CPPGroup {
  id: string;
  groupName: string;
}
