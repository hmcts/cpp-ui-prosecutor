import { CasesMissingSjpNoticeResult } from '../contexts/sjp';
import { TflAction, TflActionType } from './tfl.action';
import { FileUploadStatResult } from '../contexts/staging-tfl';

export interface TflState {
  casesMissingsjpNoticeResult: CasesMissingSjpNoticeResult;
  csvUploadSuccess: boolean;
  documentUploadSuccess: boolean;
  fileUploadStats: FileUploadStatResult;
}

const initialState: TflState = {
  casesMissingsjpNoticeResult: undefined,
  fileUploadStats: undefined,
  csvUploadSuccess: false,
  documentUploadSuccess: false
};

export function tflReducer(state: TflState = initialState, action: TflAction): TflState {
  switch (action.type) {
    case TflActionType.LOAD_CASES_WITH_SJP_NOTICE_COUNT_SUCCESS:
      return {
        ...state,
        casesMissingsjpNoticeResult: action.sjpNoticeCaseResult
      };
    case TflActionType.LOAD_FILE_UPLOAD_STATS_SUCCESS:
      return {
        ...state,
        fileUploadStats: action.fileUploadStatResult
      };
    case TflActionType.SUBMIT_CSV_FILES_SUCCESS:
      return {
        ...state,
        csvUploadSuccess: true
      };
    case TflActionType.RESET_CSV_UPLOAD_PAGE_STATE:
      return {
        ...state,
        csvUploadSuccess: false
      };
    case TflActionType.UPLOAD_DOCUMENTS_SUCCESS:
      return {
        ...state,
        documentUploadSuccess: true
      };
    case TflActionType.RESET_UPLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        documentUploadSuccess: false
      };

    default:
      return state;
  }
}
