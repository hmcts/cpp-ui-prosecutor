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
