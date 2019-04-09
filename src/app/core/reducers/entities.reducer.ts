import { Case, PleadedNotGuiltyCaseResult, DefendantDetailsUpdatesResult } from '../../contexts/sjp';
import { EntitiesAction, EntitiesActionType } from '../actions/entities';

export type CaseState = Case;

export const caseReducer = (state: CaseState = null, action: EntitiesAction): CaseState => {
  if (action.type === EntitiesActionType.LOAD_CASE_SUCCESS) {
    return action.kase;
  }

  return state;
};

export type PleadedNotGuiltyCasesState = PleadedNotGuiltyCaseResult;

export const pleadedNotGuiltyReducer = (
  state: PleadedNotGuiltyCasesState = undefined,
  action: EntitiesAction
): PleadedNotGuiltyCaseResult => {
  if (action.type === EntitiesActionType.LOAD_PLEADED_NOT_GUILTY_CASES_SUCCESS) {
    return action.actionResult;
  }

  return state;
};

export type DefendantDetailsUpdatesState = DefendantDetailsUpdatesResult;

export const defendantDetailsUpdatesReducer = (
  state: DefendantDetailsUpdatesState = undefined,
  action: EntitiesAction
): DefendantDetailsUpdatesResult => {
  if (action.type === EntitiesActionType.LOAD_DEFENDANT_DETAILS_UPDATES_SUCCESS) {
    return action.actionResult;
  }

  return state;
};
