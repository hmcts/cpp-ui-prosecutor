import { Action } from '@ngrx/store';
import { Case } from './case-overview.interfaces';

export const enum CaseOverviewTypes {
  GET_CASE_BY_ID = '[CaseOverview] Get Case By Id',
  GET_CASE_BY_ID_SUCCESS = '[CaseOverview] Get Case By Id Success'
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
