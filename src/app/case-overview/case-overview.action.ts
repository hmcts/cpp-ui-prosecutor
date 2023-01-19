import { Action } from '@ngrx/store';
import { WithdrawOffenceRequestParam, DefendantOnlinePlea } from '../contexts/sjp';

export const enum CaseOverviewActionType {
  WITHDRAW_OFFENCES = '[ATCM] Withdraw offences',
  WITHDRAW_OFFENCES_SUCCESS = '[ATCM] Withdraw offences success',
  WITHDRAW_OFFENCES_FAILED = '[ATCM] Withdraw offences Failed',
  SUBMIT_DATES_TO_AVOID = '[ATCM] Submit Dates to Avoid',
  SUBMIT_DATES_TO_AVOID_SUCCESS = '[ATCM] Submit Dates to Avoid Success',
  SUBMIT_DATES_TO_AVOID_FAILED = '[ATCM] Submit Dates to Avoid Failed',
  RESET_CASE_OVERVIEW_STATE = '[ATCM] Clear case overview state',
  RESET_DATES_TO_AVOID_STATE = '[ATCM] Clear dates to avoid state',
  LOAD_ONLINE_PLEA_SUCCESS = '[ATCM] Load online plea success'
}

export class WithdrawOffences implements Action {
  readonly type = CaseOverviewActionType.WITHDRAW_OFFENCES;

  constructor(public offences: WithdrawOffenceRequestParam) {}
}

export class WithdrawOffencesSuccess implements Action {
  readonly type = CaseOverviewActionType.WITHDRAW_OFFENCES_SUCCESS;

  constructor() {}
}

export class WithdrawOffencesFailed implements Action {
  readonly type = CaseOverviewActionType.WITHDRAW_OFFENCES_FAILED;

  constructor() {}
}

export class ResetCaseOverviewState implements Action {
  readonly type = CaseOverviewActionType.RESET_CASE_OVERVIEW_STATE;

  constructor() {}
}

export class ResetDatesToAvoidState implements Action {
  readonly type = CaseOverviewActionType.RESET_DATES_TO_AVOID_STATE;

  constructor() {}
}

export class SubmitDatesToAvoid implements Action {
  readonly type = CaseOverviewActionType.SUBMIT_DATES_TO_AVOID;

  constructor(public datesToAvoid: string) {}
}

export class SubmitDatesToAvoidSuccess implements Action {
  readonly type = CaseOverviewActionType.SUBMIT_DATES_TO_AVOID_SUCCESS;

  constructor() {}
}

export class SubmitDatesToAvoidFailed implements Action {
  readonly type = CaseOverviewActionType.SUBMIT_DATES_TO_AVOID_FAILED;

  constructor() {}
}

export class LoadOnlinePleaSuccess implements Action {
  readonly type = CaseOverviewActionType.LOAD_ONLINE_PLEA_SUCCESS;

  constructor(public onlinePlea: DefendantOnlinePlea) {}
}

export type CaseOverviewAction =
  | WithdrawOffences
  | WithdrawOffencesSuccess
  | WithdrawOffencesFailed
  | ResetCaseOverviewState
  | ResetDatesToAvoidState
  | SubmitDatesToAvoid
  | SubmitDatesToAvoidSuccess
  | SubmitDatesToAvoidFailed
  | LoadOnlinePleaSuccess;
