import { Action } from '@ngrx/store';
import { DocumentUploadDetails } from '../../contexts/staging-tfl';

export const enum DocumentUploadActionType {
  LOAD_DOCUMENT_UPLOAD_DETAILS_SUCCESS = '[ATCM] Load document file upload detail success'
}

export class LoadDocumentUploadDetailsSuccess implements Action {
  readonly type = DocumentUploadActionType.LOAD_DOCUMENT_UPLOAD_DETAILS_SUCCESS;

  constructor(public documentUploadDetails: DocumentUploadDetails[]) {}
}

export type DocumentUploadAction = LoadDocumentUploadDetailsSuccess;
