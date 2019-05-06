import { DocumentUploadDetails } from '../../contexts/staging-tfl';
import { DocumentUploadAction, DocumentUploadActionType } from './document-upload.action';

export type DocumentUploadState = DocumentUploadDetails[];

export function documentUploadReducer(state: DocumentUploadState, action: DocumentUploadAction): DocumentUploadState {
  if (action.type === DocumentUploadActionType.LOAD_DOCUMENT_UPLOAD_DETAILS_SUCCESS) {
    return action.documentUploadDetails;
  }

  return state;
}
