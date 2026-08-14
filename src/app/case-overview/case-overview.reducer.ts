import { CaseOverviewAction, CaseOverviewActionType } from './case-overview.action';
import { DefendantOnlinePlea } from '../contexts/sjp';

export interface CaseOverviewState {
  withdrawOffencesSuccess: boolean;
  withdrawOffencesFailed: boolean;
  datesToAvoidSuccess: boolean;
  datesToAvoidFailed: boolean;
  onlinePlea: DefendantOnlinePlea;
}

const initialState: CaseOverviewState = {
  withdrawOffencesSuccess: false,
  withdrawOffencesFailed: false,
  datesToAvoidSuccess: false,
  datesToAvoidFailed: false,
  onlinePlea: undefined
};

export function caseOverviewReducer(
  state: CaseOverviewState = initialState,
  action: CaseOverviewAction
): CaseOverviewState {
  switch (action.type) {
    case CaseOverviewActionType.WITHDRAW_OFFENCES_SUCCESS: {
      return {
        ...state,
        withdrawOffencesSuccess: true
      };
    }

    case CaseOverviewActionType.WITHDRAW_OFFENCES_FAILED: {
      return {
        ...state,
        withdrawOffencesFailed: true
      };
    }

    case CaseOverviewActionType.RESET_CASE_OVERVIEW_STATE: {
      return {
        ...initialState,
        onlinePlea: state.onlinePlea
      };
    }

    case CaseOverviewActionType.RESET_DATES_TO_AVOID_STATE: {
      return {
        ...state,
        datesToAvoidSuccess: false
      };
    }

    case CaseOverviewActionType.SUBMIT_DATES_TO_AVOID_SUCCESS: {
      return {
        ...state,
        datesToAvoidSuccess: true
      };
    }

    case CaseOverviewActionType.SUBMIT_DATES_TO_AVOID_FAILED: {
      return {
        ...state,
        datesToAvoidFailed: true
      };
    }

    case CaseOverviewActionType.LOAD_ONLINE_PLEA_SUCCESS: {
      return {
        ...state,
        onlinePlea: action.onlinePlea
      };
    }

    default: {
      return state;
    }
  }
}
