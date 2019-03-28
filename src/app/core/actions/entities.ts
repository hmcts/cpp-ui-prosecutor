import { Action } from '@ngrx/store';
import { Case, PleadedNotGuiltyCaseResult } from '../../contexts/sjp';

export const enum EntitiesActionType {
  LOAD_CASE_SUCCESS = '[ATCM] Load case success',
  LOAD_PLEADED_NOT_GUILTY_CASES_SUCCESS = '[ATCM] Load pleaded not guilty cases success'
}

export class LoadCaseSuccess implements Action {
  readonly type = EntitiesActionType.LOAD_CASE_SUCCESS;

  constructor(public kase: Case) {}
}

export class LoadPleadedNotGuiltyCases implements Action {
  readonly type = EntitiesActionType.LOAD_PLEADED_NOT_GUILTY_CASES_SUCCESS;

  constructor(public actionResult: PleadedNotGuiltyCaseResult) {}
}

export type EntitiesAction = LoadPleadedNotGuiltyCases | LoadCaseSuccess;
