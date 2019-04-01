import { SjpNoticeCasesCountResult } from '../contexts/sjp';
import { TflAction, TflActionType } from './tfl.action';

export interface TflState {
  sjpNoticeCaseResult: SjpNoticeCasesCountResult;
}

const initialState: TflState = {
  sjpNoticeCaseResult: undefined
};

export function tflReducer(state: TflState = initialState, action: TflAction): TflState {
  switch (action.type) {
    case TflActionType.LOAD_CASES_WITH_SJP_NOTICE_COUNT_SUCCESS:
      return {
        ...state,
        sjpNoticeCaseResult: action.sjpNoticeCaseResult
      };

    default:
      return state;
  }
}
