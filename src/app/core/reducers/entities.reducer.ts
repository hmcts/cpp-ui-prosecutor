import { PleadedNotGuiltyCasesDetail } from '../../contexts/sjp';
import { EntitiesActions, EntitiesActionType } from '../actions/entities';

export type PleadedNotGuiltyCasesDetailState = PleadedNotGuiltyCasesDetail;

export const initialState = {
  count: 0,
  cases: []
};

export function entitiesReducer(
  state: PleadedNotGuiltyCasesDetailState = initialState,
  action: EntitiesActions
): PleadedNotGuiltyCasesDetail {
  switch (action.type) {
    case EntitiesActionType.LOAD_PLEADED_NOT_GUILTY_CASES:
      return action.actionResult;
    default:
      return state;
  }
}
