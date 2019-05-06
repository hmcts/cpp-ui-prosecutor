import { State } from '../../reducers';
import { DocumentUploadState } from './check-document-upload.reducer';

export interface FeatureState extends State {
  documentUploadDetails: DocumentUploadState;
}

export const getDocumentUploadDetails = (state: FeatureState) => state.documentUploadDetails || [];
