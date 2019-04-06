import { SjpNoticeCasesCountResult } from '../contexts/sjp';
import { TflAction, TflActionType } from './tfl.action';
import { FileUploadStatResult } from '../contexts/staging-tfl';

export interface TflState {
  sjpNoticeCaseResult: SjpNoticeCasesCountResult;
  fileUploadStats: FileUploadStatResult;
}

const initialState: TflState = {
  sjpNoticeCaseResult: undefined,
  fileUploadStats: undefined
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
        fileUploadStats: action.fileUploaStatResult
      };

    default:
      return state;
  }
}
