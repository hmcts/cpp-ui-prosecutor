import { CaseOverviewAction, CaseOverviewActionType } from './case-overview.action';

export interface CaseOverviewState {
  withdrawOffencesSuccess: boolean;
  datesToAvoidSuccess: boolean;
  datesToAvoidFailed: boolean;
}

const initialState: CaseOverviewState = {
  withdrawOffencesSuccess: false,
  datesToAvoidSuccess: false,
  datesToAvoidFailed: false
};

export function caseOverviewReducer(
  state: CaseOverviewState = initialState,
  action: CaseOverviewAction | CaseOverviewAction
): CaseOverviewState {
  switch (action.type) {
    case CaseOverviewActionType.WITHDRAW_OFFENCES_SUCCESS: {
      return {
        ...state,
        withdrawOffencesSuccess: true
      };
    }

    case CaseOverviewActionType.RESET_CASE_OVERVIEW_STATE: {
      return initialState;
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

    default: {
      return state;
    }
  }
}
