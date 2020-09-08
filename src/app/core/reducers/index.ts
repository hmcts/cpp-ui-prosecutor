import { apiReducer, ApiState } from './api.reducer';
import {
  caseReducer,
  CaseState,
  PleadedNotGuiltyCasesState,
  pleadedNotGuiltyReducer,
  DefendantDetailsUpdatesState,
  defendantDetailsUpdatesReducer,
  OffenceWithdrawalReasonsState,
  offenceWithdrawalReasonsReducer,
  caseNotesReducer,
  CaseNotesState,
  casesMissingSjpNoticesReducer,
  regionsReducer,
  RegionState
} from './entities.reducer';
import { CasesMissingSjpNoticeResult } from '../../contexts/sjp';

export interface State {
  readonly api: ApiState;
  readonly case: CaseState;
  readonly pleadedNotGuiltyCases: PleadedNotGuiltyCasesState;
  readonly defendantDetailsUpdates: DefendantDetailsUpdatesState;
  readonly offenceWithdrawalReasons: OffenceWithdrawalReasonsState;
  readonly caseNotes: CaseNotesState;
  readonly casesMissingSJPNoticeCount: CasesMissingSjpNoticeResult;
  readonly region: RegionState;
}

export const reducers = {
  api: apiReducer,
  case: caseReducer,
  pleadedNotGuiltyCases: pleadedNotGuiltyReducer,
  defendantDetailsUpdates: defendantDetailsUpdatesReducer,
  offenceWithdrawalReasons: offenceWithdrawalReasonsReducer,
  caseNotes: caseNotesReducer,
  casesMissingSJPNoticeCount: casesMissingSjpNoticesReducer,
  region: regionsReducer
};
