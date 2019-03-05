import { Case } from './case-overview.interfaces';
import { CaseOverviewActions, CaseOverviewTypes } from './case-overview.action';

export interface CaseOverviewState {
  caseId: string;
  case: Case;
}

const initialState: CaseOverviewState = {
  caseId: null,
  case: null
};

export function caseOverviewReducer(
  state: CaseOverviewState = initialState,
  action: CaseOverviewActions
): CaseOverviewState {
  switch (action.type) {
    case CaseOverviewTypes.GET_CASE_BY_ID: {
      return {
        ...state,
        caseId: action.payload
      };
    }

    case CaseOverviewTypes.GET_CASE_BY_ID_SUCCESS: {
      return {
        ...state,
        case: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
