import { SjpNoticeCasesCountResult } from '../contexts/sjp';
import { TflAction, TflActionType } from './tfl.action';
import { FileUploadStatResult } from '../contexts/staging-tfl';

export interface TflState {
  sjpNoticeCaseResult: SjpNoticeCasesCountResult;
  csvUploadSuccess: boolean;
  fileUploadStats: FileUploadStatResult;
}

const initialState: TflState = {
  sjpNoticeCaseResult: undefined,
  fileUploadStats: undefined,
  csvUploadSuccess: false
};

export function tflReducer(state: TflState = initialState, action: TflAction): TflState {
  switch (action.type) {
    case TflActionType.LOAD_CASES_WITH_SJP_NOTICE_COUNT_SUCCESS:
      return {
        ...state,
        sjpNoticeCaseResult: action.sjpNoticeCaseResult
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
      return initialState;

    default:
      return state;
  }
}
