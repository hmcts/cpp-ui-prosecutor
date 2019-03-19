import { Action } from '@ngrx/store';
import { Case } from '../contexts/sjp';

export const enum CaseOverviewTypes {
  GET_CASE_BY_ID = '[CaseOverview] Get Case By Id',
  GET_CASE_BY_ID_SUCCESS = '[CaseOverview] Get Case By Id Success'
}
export const enum WithdrawOffencesTypes {
  WITHDRAW_OFFENCES = '[OffenceWithdraw] Submit Offences to Withdraw',
  WITHDRAW_OFFENCES_SUCCESS = '[OffenceWithdraw] Submit Offences to Withdraw Success',
  WITHDRAW_OFFENCES_CLEAR = '[OffenceWithdraw] Clear Offences to Withdraw Flag'
}

export class GetCaseById implements Action {
  readonly type = CaseOverviewTypes.GET_CASE_BY_ID;
  constructor(public payload: string) {}
}

export class GetCaseByIdSuccess implements Action {
  readonly type = CaseOverviewTypes.GET_CASE_BY_ID_SUCCESS;
  constructor(public payload: Case) {}
}

export type CaseOverviewActions = GetCaseById | GetCaseByIdSuccess;

export class WithdrawOffences implements Action {
  readonly type = WithdrawOffencesTypes.WITHDRAW_OFFENCES;
  constructor(public offences: any, public caseId: string) {}
}

export class WithdrawOffencesSuccess implements Action {
  readonly type = WithdrawOffencesTypes.WITHDRAW_OFFENCES_SUCCESS;
  constructor() {}
}

export class WithdrawOffencesClear implements Action {
  readonly type = WithdrawOffencesTypes.WITHDRAW_OFFENCES_CLEAR;
  constructor() {}
}

export type WithdrawOffencesActions = WithdrawOffences | WithdrawOffencesSuccess | WithdrawOffencesClear;
