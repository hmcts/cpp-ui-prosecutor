import { State } from '../../reducers';
import { DocumentUploadReportState } from './view-document-upload-report.reducer';

export interface FeatureState extends State {
  documentUploadReport: DocumentUploadReportState;
}

export const getDocumentUploadReport = (state: FeatureState) => state.documentUploadReport;
