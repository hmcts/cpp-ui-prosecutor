import { CaseOverviewAction, CaseOverviewActionType } from './case-overview.action';

export interface CaseOverviewState {
  withdrawOffencesSuccess: boolean;
  datesToAvoidSuccess: boolean;
}

const initialState: CaseOverviewState = {
  withdrawOffencesSuccess: false,
  datesToAvoidSuccess: false
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

    case CaseOverviewActionType.SUBMIT_DATES_TO_AVOID_SUCCESS: {
      return {
        ...state,
        datesToAvoidSuccess: true
      };
    }

    default: {
      return state;
    }
  }
}
