import { DocumentUploadDetails } from '../../contexts/staging-tfl';
import { DocumentUploadReportAction, DocumentUploadReportActionType } from './view-document-upload-report.action';

export type DocumentUploadReportState = DocumentUploadDetails;

export function documentUploadReportReducer(
  state: DocumentUploadReportState,
  action: DocumentUploadReportAction
): DocumentUploadReportState {
  if (action.type === DocumentUploadReportActionType.LOAD_DOCUMENT_UPLOAD_REPORT_SUCCESS) {
    return action.documentUploadReport;
  }

  return state;
}
