import { CaseSummary } from '../contexts/sjp';
import { CasesMissingSjpNoticeActionType, CasesMissingSjpNoticesAction } from './cases-missing-sjp-notices.action';

export type CasesMissingSjpNoticesState = CaseSummary[];

export function casesMissingSjpNoticesReducer(
  state: CasesMissingSjpNoticesState,
  action: CasesMissingSjpNoticesAction
): CasesMissingSjpNoticesState {
  if (action.type === CasesMissingSjpNoticeActionType.LOAD_CASES_MISSING_SJP_NOTICE_SUCCESS) {
    return action.casesMissingNotice;
  }

  return state;
}
