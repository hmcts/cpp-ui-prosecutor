import { apiReducer, ApiState } from './api.reducer';
import {
  caseReducer,
  CaseState,
  PleadedNotGuiltyCasesState,
  pleadedNotGuiltyReducer,
  DefendantDetailsUpdatesState,
  defendantDetailsUpdatesReducer,
  OffenceWithdrawalReasonsState,
  offenceWithdrawalReasonsReducer
} from './entities.reducer';

export interface State {
  readonly api: ApiState;
  readonly case: CaseState;
  readonly pleadedNotGuiltyCases: PleadedNotGuiltyCasesState;
  readonly defendantDetailsUpdates: DefendantDetailsUpdatesState;
  readonly offenceWithdrawalReasons: OffenceWithdrawalReasonsState;
}

export const reducers = {
  api: apiReducer,
  case: caseReducer,
  pleadedNotGuiltyCases: pleadedNotGuiltyReducer,
  defendantDetailsUpdates: defendantDetailsUpdatesReducer,
  offenceWithdrawalReasons: offenceWithdrawalReasonsReducer
};
