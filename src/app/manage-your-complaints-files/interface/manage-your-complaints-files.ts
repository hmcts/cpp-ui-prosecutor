import { HttpErrorResponse } from '@angular/common/http';

export interface ComplaintsTile {
  testId: string;
  title: string;
  description: string;
  link?: string;
  action?: () => void;
}

export interface UploadCsvFileResponse {
  statusURL: string;
  submissionId: string;
}

export interface UploadCsvFileRequest {
  file: File;
  onUploadSuccess: (referenceNumber: string) => void;
  onUploadError: (error: HttpErrorResponse) => void;
}

export interface UploadSupportingDocumentRequest {
  file: File;
  onUploadSuccess: () => void;
  onUploadError: (error: HttpErrorResponse) => void;
}

export interface CourtDocumentMaterial {
  id: string;
  receivedDateTime: string;
}

export interface CourtDocument {
  courtDocumentId: string;
  documentCategory: {
    applicationDocument: {
      applicationId: string;
    };
  };
  name: string;
  documentTypeId: string;
  documentTypeDescription: string;
  mimeType: string;
  containsFinancialMeans: boolean;
  sendToCps: boolean;
  materials: CourtDocumentMaterial[];
}

export interface AddCourtDocumentRequest {
  courtDocument: CourtDocument;
}

export enum ComplaintsFileStatus {
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  AWAITING_APPROVAL = 'AWAITING_APPROVAL',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export const COMPLAINTS_FILE_STATUS_LABELS: Record<ComplaintsFileStatus, string> = {
  [ComplaintsFileStatus.PENDING]: 'File processing',
  [ComplaintsFileStatus.FAILED]: 'Upload failed',
  [ComplaintsFileStatus.AWAITING_APPROVAL]: 'Awaiting court decision',
  [ComplaintsFileStatus.ACCEPTED]: 'Accepted by court',
  [ComplaintsFileStatus.REJECTED]: 'Rejected by court'
};

export interface ComplaintsFileRecord {
  id: string;
  status: ComplaintsFileStatus;
  warnings: string[];
  errors: string[];
  type: string;
  receivedAt: string;
  fileName: string;
  username: string;
  caseErrors: string[];
  defendantErrors: string[];
  completedAt: string;
  prosecutingAuthority: string;
}

export const APPLICATION_DOCUMENT_CATEGORY = 'Applications';
