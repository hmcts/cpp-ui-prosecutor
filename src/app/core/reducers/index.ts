import { apiReducer, ApiState } from './api.reducer';
import { entitiesReducer, PleadedNotGuiltyCasesDetailState } from './entities.reducer';

export interface State {
  readonly api: ApiState;
  readonly pleadedNotGuiltyCasesDetail: PleadedNotGuiltyCasesDetailState;
}

export const reducers = {
  api: apiReducer,
  pleadedNotGuiltyCasesDetail: entitiesReducer
};
