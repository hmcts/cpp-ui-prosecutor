import { Action } from '@ngrx/store';
import { WithdrawOffenceRequestParam } from '../contexts/sjp';

export const enum CaseOverviewActionType {
  WITHDRAW_OFFENCES = '[ATCM] Withdraw offences',
  WITHDRAW_OFFENCES_SUCCESS = '[ATCM] Withdraw offences success',
  SUBMIT_DATES_TO_AVOID = '[ATCM] Submit Dates to Avoid',
  SUBMIT_DATES_TO_AVOID_SUCCESS = '[ATCM] Submit Dates to Avoid Success',
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

export type CaseOverviewAction =
  | WithdrawOffences
  | WithdrawOffencesSuccess
  | ResetCaseOverviewState
  | SubmitDatesToAvoid
  | SubmitDatesToAvoidSuccess;

export class SubmitDatesToAvoid implements Action {
  readonly type = CaseOverviewActionType.SUBMIT_DATES_TO_AVOID;

  constructor(public datesToAvoid: string) {}
}

export class SubmitDatesToAvoidSuccess implements Action {
  readonly type = CaseOverviewActionType.SUBMIT_DATES_TO_AVOID_SUCCESS;

  constructor() {}
}
