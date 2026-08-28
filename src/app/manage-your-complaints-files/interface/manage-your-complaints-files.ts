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
  PENDING_COURT_DECISION = 'PENDING_COURT_DECISION',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  SUCCESS = 'SUCCESS'
}

export const COMPLAINTS_FILE_STATUS_LABELS: Record<ComplaintsFileStatus, string> = {
  [ComplaintsFileStatus.PENDING]: 'File processing',
  [ComplaintsFileStatus.FAILED]: 'Upload failed',
  [ComplaintsFileStatus.PENDING_COURT_DECISION]: 'Pending court decision',
  [ComplaintsFileStatus.ACCEPTED]: 'Accepted by court',
  [ComplaintsFileStatus.REJECTED]: 'Rejected by court',
  [ComplaintsFileStatus.SUCCESS]: 'Case Created Successfully'
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
  summonsApplicationId: string;
}

export const APPLICATION_DOCUMENT_CATEGORY = 'Applications';
