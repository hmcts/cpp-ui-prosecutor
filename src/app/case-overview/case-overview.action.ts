import { Action } from '@ngrx/store';
import { WithdrawOffenceRequestParam } from '../contexts/sjp';

export const enum CaseOverviewActionType {
  WITHDRAW_OFFENCES = '[ATCM] Withdraw offences',
  WITHDRAW_OFFENCES_SUCCESS = '[ATCM] Withdraw offences success',
  SUBMIT_DATES_TO_AVOID = '[ATCM] Submit Dates to Avoid',
  SUBMIT_DATES_TO_AVOID_SUCCESS = '[ATCM] Submit Dates to Avoid Success',
  SUBMIT_DATES_TO_AVOID_FAILED = '[ATCM] Submit Dates to Avoid Failed',
  RESET_CASE_OVERVIEW_STATE = '[ATCM] Clear case overview state',
  RESET_DATES_TO_AVOID_STATE = '[ATCM] Clear dates to avoid state'
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

export class ResetDatesToAvoidState implements Action {
  readonly type = CaseOverviewActionType.RESET_DATES_TO_AVOID_STATE;

  constructor() {}
}

export type CaseOverviewAction =
  | WithdrawOffences
  | WithdrawOffencesSuccess
  | ResetCaseOverviewState
  | ResetDatesToAvoidState
  | SubmitDatesToAvoid
  | SubmitDatesToAvoidSuccess
  | SubmitDatesToAvoidFailed;

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
