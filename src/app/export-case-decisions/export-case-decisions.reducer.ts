import { CaseCountResult } from '../contexts/mi-report';
import { CaseCountActions, ResultedCaseCountActionTypes } from './export-case-decisions.actions';

export type CaseCountResultState = CaseCountResult;

export function exportCaseDecisionsReducer(
  state: CaseCountResultState = null,
  action: CaseCountActions
): CaseCountResult {
  switch (action.type) {
    case ResultedCaseCountActionTypes.LOAD_RESULTED_CASE_COUNT_SUCCESS:
      return action.caseCountResult;
    case ResultedCaseCountActionTypes.RESET_RESULTED_CASE_COUNT:
      return null;
    default:
      return state;
  }
}
