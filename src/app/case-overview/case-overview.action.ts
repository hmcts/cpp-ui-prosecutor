import { Action } from '@ngrx/store';
import { WithdrawOffenceRequestParam } from '../contexts/sjp';

export const enum CaseOverviewActionType {
  WITHDRAW_OFFENCES = '[ATCM] Withdraw offences',
  WITHDRAW_OFFENCES_SUCCESS = '[ATCM] Withdraw offences success',
  RESET_CASE_OVERVIEW_STATE = '[ATCM] Clear case overview state'
}

export class WithdrawOffences implements Action {
  readonly type = CaseOverviewActionType.WITHDRAW_OFFENCES;
  constructor(public offences: WithdrawOffenceRequestParam) {}
}

export class WithdrawOffencesSuccess implements Action {
  readonly type = CaseOverviewActionType.WITHDRAW_OFFENCES_SUCCESS;
  constructor() {}
}

export class ResetCaseOverviewState implements Action {
  readonly type = CaseOverviewActionType.RESET_CASE_OVERVIEW_STATE;
  constructor() {}
}

export type CaseOverviewAction = WithdrawOffences | WithdrawOffencesSuccess | ResetCaseOverviewState;
