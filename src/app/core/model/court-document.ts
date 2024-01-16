export interface FormListOption {
  value: any;
  label: string;
}

export interface NowDocument {
  defendantId: string;
  orderHearingId: string;
  prosecutionCases: string[];
}

export interface DefendantDocument {
  defendants: string[];
  prosecutionCaseId: string;
}

export interface CaseDocument {
  prosecutionCaseId: string;
}

export interface ApplicationDocument {
  applicationId: string;
  prosecutionCaseId?: string;
}

export interface DocumentCategory {
  applicationDocument?: ApplicationDocument;
  defendantDocument?: DefendantDocument;
  caseDocument?: CaseDocument;
  nowDocument?: NowDocument;
}

export interface Material {
  id: string;
  generationStatus?: string;
  name: string;
  uploadDateTime: string;
  userGroups: string[];
  receivedDateTime?: string;
  printedDateTime?: string;
}

export interface CourtDocument {
  courtDocumentId: string;
  documentCategory?: DocumentCategory;
  name: string;
  oldName?: string;
  documentTypeId: string;
  documentTypeDescription: string;
  mimeType: string;
  isRemoved: boolean;
  materials: Material[];
  containsFinancialMeans: boolean;
  sendToCps: boolean;
}

export interface CourtDocumentFileCategory {
  courtDocument: CourtDocument;
  file: any;
  documentLevel?: string;
}

export interface DocumentStatus {
  courtDocumentId: string;
  materialId: string;
  isRemoved: boolean;
}

export interface CourtDocumentObject {
  courtDocument: CourtDocument;
}

export enum DocumentLevelType {
  applications = 'applications',
  case = 'caselevel',
  defendant = 'defendantlevel',
  nows = 'nowdocuments'
}

export interface DocumentFormValues {
  selectedFile: string;
  documentName: string;
  containsFinancialMeans: boolean;
  documentType?: string;
  documentDefendants?: string[];
}
