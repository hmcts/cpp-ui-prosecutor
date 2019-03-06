import { Case } from './case-overview.interfaces';
import { CaseOverviewActions, CaseOverviewTypes } from './case-overview.action';

export type CaseOverviewState = Case;

export function caseOverviewReducer(state: CaseOverviewState = null, action: CaseOverviewActions): CaseOverviewState {
  switch (action.type) {
    case CaseOverviewTypes.GET_CASE_BY_ID_SUCCESS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
