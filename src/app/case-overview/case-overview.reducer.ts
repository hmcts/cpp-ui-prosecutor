import { CaseOverviewAction, CaseOverviewActionType } from './case-overview.action';

export interface CaseOverviewState {
  withdrawOffencesSuccess: boolean;
}

const initialState: CaseOverviewState = {
  withdrawOffencesSuccess: false
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

    default: {
      return state;
    }
  }
}
