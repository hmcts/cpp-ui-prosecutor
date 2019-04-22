import { Action } from '@ngrx/store';
import { CaseCountResult } from '../contexts/mi-report';

export const enum ResultedCaseCountActionTypes {
  LOAD_RESULTED_CASE_COUNT = '[sjp] load resulted case count',
  LOAD_RESULTED_CASE_COUNT_SUCCESS = '[sjp] load resulted case count success',
  RESET_RESULTED_CASE_COUNT = '[sjp] reset resulted case count'
}

export interface ResultedCaseCountParam {
  fromDate: string;
  toDate: string;
}

export class LoadResultedCaseCount implements Action {
  public readonly type = ResultedCaseCountActionTypes.LOAD_RESULTED_CASE_COUNT;

  constructor(public readonly param: ResultedCaseCountParam) {}
}

export class LoadResultedCaseCountSuccess implements Action {
  public readonly type = ResultedCaseCountActionTypes.LOAD_RESULTED_CASE_COUNT_SUCCESS;

  constructor(public readonly caseCountResult: CaseCountResult) {}
}

export class ResetResultedCaseCount implements Action {
  public readonly type = ResultedCaseCountActionTypes.RESET_RESULTED_CASE_COUNT;

  constructor() {}
}

export type CaseCountActions = LoadResultedCaseCount | LoadResultedCaseCountSuccess | ResetResultedCaseCount;
