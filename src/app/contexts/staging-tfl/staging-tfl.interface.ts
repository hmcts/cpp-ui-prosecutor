export interface FileUploadStat {
  uploadId: string;
  uploadStatus: string;
  errorCount: number;
}

export interface FileUploadStatResult {
  csvUpload: FileUploadStat;
  documentsUpload: FileUploadStat;
}

export interface CsvFileUploadDetails {
  headerFileReference: string;
  headerFilename: string;
  offenceFileReference: string;
  offenceFilename: string;
  timestamp: string;
  uploadId: string;
  uploadStatus: UploadStatus;
}

export interface UploadStatus {
  status: string;
  timestamp: string;
  reason?: string;
}

export interface CsvFileUploadReport {
  headerErrors: CsvError[];
  headerFileReference: string;
  headerFilename: string;
  offenceErrors: CsvError[];
  offenceFileReference: string;
  offenceFilename: string;
  timestamp: string;
  uploadId: string;
  uploadStatus: UploadStatus;
}

export interface CsvError {
  csvColumn: string;
  csvRow: number;
  tflCaseUrn: string;
  validationMessageKey: string;
}

export interface DocumentUploadDetails {
  bundleUploadId: string;
  timestamp: string;
  zipFilename: string;
  uploadStatus: UploadStatus;
  documentCount?: number;
  documentErrors?: DocumentUploadError[];
}

export interface DocumentUploadError {
  documentFilename: string;
  documentType: string;
  validationMessageKey: string;
}
