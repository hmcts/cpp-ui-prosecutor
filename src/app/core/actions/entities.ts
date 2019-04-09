import { Action } from '@ngrx/store';
import { Case, PleadedNotGuiltyCaseResult, DefendantDetailsUpdatesResult } from '../../contexts/sjp';

export const enum EntitiesActionType {
  LOAD_CASE_SUCCESS = '[ATCM] Load case success',
  LOAD_PLEADED_NOT_GUILTY_CASES_SUCCESS = '[ATCM] Load pleaded not guilty cases success',
  LOAD_DEFENDANT_DETAILS_UPDATES_SUCCESS = '[ATCM] Load defendant details updates success'
}

export class LoadCaseSuccess implements Action {
  readonly type = EntitiesActionType.LOAD_CASE_SUCCESS;

  constructor(public kase: Case) {}
}

export class LoadPleadedNotGuiltyCases implements Action {
  readonly type = EntitiesActionType.LOAD_PLEADED_NOT_GUILTY_CASES_SUCCESS;

  constructor(public actionResult: PleadedNotGuiltyCaseResult) {}
}

export class LoadDefendantDetailsUpdates implements Action {
  readonly type = EntitiesActionType.LOAD_DEFENDANT_DETAILS_UPDATES_SUCCESS;

  constructor(public actionResult: DefendantDetailsUpdatesResult) {}
}

export type EntitiesAction = LoadPleadedNotGuiltyCases | LoadDefendantDetailsUpdates | LoadCaseSuccess;
