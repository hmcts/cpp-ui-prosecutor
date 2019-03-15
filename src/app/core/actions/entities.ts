import { Action } from '@ngrx/store';
import { PleadedNotGuiltyCasesDetail } from '../../contexts/sjp';

export const enum EntitiesActionType {
  LOAD_PLEADED_NOT_GUILTY_CASES = '[ATCM] Load pleaded not guilty cases'
}

export class LoadPleadedNotGuiltyCases implements Action {
  readonly type = EntitiesActionType.LOAD_PLEADED_NOT_GUILTY_CASES;

  constructor(public actionResult: PleadedNotGuiltyCasesDetail) {}
}

export type EntitiesActions = LoadPleadedNotGuiltyCases;
