import { DocumentTypeRBAC } from '../';

export interface DocumentTypeAccess {
  id: string;
  section: string;
  documentCategory: string;
  documentType?: string;
  documentAccess?: string[];
  actionRequired: boolean;
  courtDocumentTypeRBAC: DocumentTypeRBAC;
}
