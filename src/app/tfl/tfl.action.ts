import { Action } from '@ngrx/store';
import { SjpNoticeCasesCountResult } from '../contexts/sjp';

export const enum TflActionType {
  LOAD_CASES_WITH_SJP_NOTICE_COUNT_SUCCESS = '[ATCM] Load cases with sjp notice count success'
}

export class LoadCasesWithSjpNoticeCountSuccess implements Action {
  readonly type = TflActionType.LOAD_CASES_WITH_SJP_NOTICE_COUNT_SUCCESS;
  constructor(public sjpNoticeCaseResult: SjpNoticeCasesCountResult) {}
}

export type TflAction = LoadCasesWithSjpNoticeCountSuccess;
