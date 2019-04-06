export interface FileUploadStat {
  uploadId: string;
  uploadStatus: string;
  errorCount: number;
}

export interface FileUploadStatResult {
  csvUpload: FileUploadStat;
  documentsUpload: FileUploadStat;
}
