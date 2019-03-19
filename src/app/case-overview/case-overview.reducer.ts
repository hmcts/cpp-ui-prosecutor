import { CaseOverviewActions, CaseOverviewTypes } from './case-overview.action';
import { Case } from '../contexts/sjp';
import { WithdrawOffencesActions, WithdrawOffencesTypes } from './case-overview.action';

export interface CaseOverviewState {
  caseOverview: Case;
  withdrawOffencesSuccess: boolean;
}

const initialState: CaseOverviewState = {
  caseOverview: null,
  withdrawOffencesSuccess: false
};

export function caseOverviewReducer(
  state: CaseOverviewState = initialState,
  action: CaseOverviewActions | WithdrawOffencesActions
): CaseOverviewState {
  switch (action.type) {
    case CaseOverviewTypes.GET_CASE_BY_ID_SUCCESS: {
      return {
        ...state,
        caseOverview: action.payload
      };
    }

    case WithdrawOffencesTypes.WITHDRAW_OFFENCES_SUCCESS: {
      return {
        ...state,
        withdrawOffencesSuccess: true
      };
    }

    case WithdrawOffencesTypes.WITHDRAW_OFFENCES_CLEAR: {
      return {
        ...state,
        withdrawOffencesSuccess: false
      };
    }

    default: {
      return state;
    }
  }
}
