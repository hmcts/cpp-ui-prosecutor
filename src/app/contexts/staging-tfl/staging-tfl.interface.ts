export interface FileUploadStat {
  uploadId: string;
  uploadStatus: string;
  errorCount: number;
}

export interface CsvFileUploadStatResult {
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
}
