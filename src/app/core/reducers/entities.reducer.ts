import {
  Case,
  PleadedNotGuiltyCaseResult,
  DefendantDetailsUpdatesResult,
  CaseNotes,
  CaseSummary,
  CasesMissingSjpNoticeResult,
  Region
} from '../../contexts/sjp';
import { EntitiesAction, EntitiesActionType } from '../actions/entities';
import { OffenceWithdrawalReason } from '../../contexts/reference-data';
import { PROSECUTOR_DEFAULT_VALUE } from '../../search/search.selectors';

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

export type OffenceWithdrawalReasonsState = OffenceWithdrawalReason[];

export const offenceWithdrawalReasonsReducer = (
  state: OffenceWithdrawalReasonsState = undefined,
  action: EntitiesAction
): OffenceWithdrawalReason[] => {
  if (action.type === EntitiesActionType.LOAD_OFFENCE_WITHDRAWAL_REASONS_SUCCESS) {
    return action.offenceWithdrawalReasons;
  }
  return state;
};

export type CaseNotesState = CaseNotes;
export const caseNotesReducer = (state: CaseNotesState = null, action: EntitiesAction): CaseNotes => {
  if (action.type === EntitiesActionType.LOAD_CASE_NOTES_SUCCESS) {
    return action.caseNotes;
  }
  return state;
};

export type CasesMissingSjpNoticesState = CaseSummary[];
export function casesMissingSjpNoticesReducer(
  state: CasesMissingSjpNoticeResult,
  action: EntitiesAction
): CasesMissingSjpNoticeResult {
  if (action.type === EntitiesActionType.LOAD_CASES_MISSING_SJP_NOTICE_COUNT_SUCCESS) {
    return action.casesMissingSJPNoticeCount;
  }

  return state;
}

export interface RegionState {
  selectedRegion: string;
  prosecutor: string;
  regions: Region[];
}

export function regionsReducer(
  state: RegionState = {
    regions: [],
    selectedRegion: 'ALL',
    prosecutor: PROSECUTOR_DEFAULT_VALUE
  },
  action: EntitiesAction
): RegionState {
  switch (action.type) {
    case EntitiesActionType.LOAD_REGIONS_SUCCESS:
      return { ...state, regions: action.regions };
    case EntitiesActionType.SET_FILTER:
      return {
        ...state,
        selectedRegion: action.payload.selectedRegion,
        prosecutor: action.payload.prosecutor
      };
    default:
      return state;
  }
}
