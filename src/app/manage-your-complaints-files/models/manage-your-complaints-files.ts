import { HttpErrorResponse } from '@angular/common/http';

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

export const columns: { key: keyof ComplaintsFileRecord | 'action'; label: string }[] = [
  { key: 'id', label: 'Reference' },
  { key: 'receivedAt', label: 'Date uploaded' },
  { key: 'filename', label: 'File name' },
  { key: 'username', label: 'Uploaded by' },
  { key: 'status', label: 'Status' },
  { key: 'action', label: 'Action' }
];

export interface ComplaintsFileRecord {
  id: string;
  status: ComplaintsFileStatus;
  warnings: string[];
  errors: string[];
  type: string;
  receivedAt: string;
  filename: string;
  username: string;
  caseErrors: string[];
  defendantErrors: string[];
}
