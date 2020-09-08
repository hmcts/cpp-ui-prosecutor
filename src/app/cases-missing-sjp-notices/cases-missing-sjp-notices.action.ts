import { Action } from '@ngrx/store';
import { CaseSummary } from '../contexts/sjp';

export const enum CasesMissingSjpNoticeActionType {
  LOAD_CASES_MISSING_SJP_NOTICE_SUCCESS = '[ATCM] Load cases missing sjp notice success'
}

export class LoadCasesMissingSjpNoticeSuccess implements Action {
  readonly type = CasesMissingSjpNoticeActionType.LOAD_CASES_MISSING_SJP_NOTICE_SUCCESS;

  constructor(public casesMissingNotice: CaseSummary[]) {}
}

export type CasesMissingSjpNoticesAction = LoadCasesMissingSjpNoticeSuccess;
