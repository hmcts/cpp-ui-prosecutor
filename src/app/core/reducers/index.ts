import { apiReducer, ApiState } from './api.reducer';
import {
  caseReducer,
  CaseState,
  PleadedNotGuiltyCasesState,
  pleadedNotGuiltyReducer,
  DefendantDetailsUpdatesState,
  defendantDetailsUpdatesReducer
} from './entities.reducer';

export interface State {
  readonly api: ApiState;
  readonly case: CaseState;
  readonly pleadedNotGuiltyCases: PleadedNotGuiltyCasesState;
  readonly defendantDetailsUpdates: DefendantDetailsUpdatesState;
}

export const reducers = {
  api: apiReducer,
  case: caseReducer,
  pleadedNotGuiltyCases: pleadedNotGuiltyReducer,
  defendantDetailsUpdates: defendantDetailsUpdatesReducer
};
