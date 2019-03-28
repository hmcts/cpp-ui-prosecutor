import { apiReducer, ApiState } from './api.reducer';
import { caseReducer, CaseState, PleadedNotGuiltyCasesState, pleadedNotGuiltyReducer } from './entities.reducer';

export interface State {
  readonly api: ApiState;
  readonly case: CaseState;
  readonly pleadedNotGuiltyCases: PleadedNotGuiltyCasesState;
}

export const reducers = {
  api: apiReducer,
  case: caseReducer,
  pleadedNotGuiltyCases: pleadedNotGuiltyReducer
};
