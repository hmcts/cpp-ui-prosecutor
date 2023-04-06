import {
  ReferenceDataState,
  referenceDataReducer as CoreReferenceDataReducer,
} from '@cpp/reference-data';
import { UsersGroupsState, usersGroups } from '@cpp/users-groups';
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
import { PcfReferenceDataState, pcfReferencedataReducer } from './pcf-reference-data';
import { manualCaseDetailsReducer, ManualCaseDetailsState } from './manual-case-details';

export interface State extends UsersGroupsState, ReferenceDataState {
  readonly api: ApiState;
  readonly case: CaseState;
  readonly pleadedNotGuiltyCases: PleadedNotGuiltyCasesState;
  readonly defendantDetailsUpdates: DefendantDetailsUpdatesState;
  readonly offenceWithdrawalReasons: OffenceWithdrawalReasonsState;
  readonly caseNotes: CaseNotesState;
  readonly casesMissingSJPNoticeCount: CasesMissingSjpNoticeResult;
  readonly region: RegionState;
  readonly pcfReferenceData: PcfReferenceDataState;
  readonly manualCaseDetails: ManualCaseDetailsState;

}

export const reducers = {
  api: apiReducer,
  case: caseReducer,
  pleadedNotGuiltyCases: pleadedNotGuiltyReducer,
  defendantDetailsUpdates: defendantDetailsUpdatesReducer,
  offenceWithdrawalReasons: offenceWithdrawalReasonsReducer,
  caseNotes: caseNotesReducer,
  casesMissingSJPNoticeCount: casesMissingSjpNoticesReducer,
  region: regionsReducer,
  pcfReferenceData: pcfReferencedataReducer,
  referenceData: CoreReferenceDataReducer,
  manualCaseDetails: manualCaseDetailsReducer,
  usersGroups,
};
