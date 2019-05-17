import { Action } from '@ngrx/store';
import { DocumentUploadDetails } from '../../contexts/staging-tfl';

export const enum DocumentUploadReportActionType {
  LOAD_DOCUMENT_UPLOAD_REPORT_SUCCESS = '[ATCM] Load document upload report success'
}

export class LoadDocumentUploadReportSuccess implements Action {
  readonly type = DocumentUploadReportActionType.LOAD_DOCUMENT_UPLOAD_REPORT_SUCCESS;

  constructor(public documentUploadReport: DocumentUploadDetails) {}
}

export type DocumentUploadReportAction = LoadDocumentUploadReportSuccess;
