import { Action } from '@ngrx/store';
import {
  Case,
  PleadedNotGuiltyCaseResult,
  DefendantDetailsUpdatesResult,
  CaseNotes,
  CasesMissingSjpNoticeResult,
  Region
} from '../../contexts/sjp';
import { OffenceWithdrawalReason } from '../../contexts/reference-data';

export const enum EntitiesActionType {
  LOAD_CASE_SUCCESS = '[ATCM] Load case success',
  LOAD_CASE_NOTES_SUCCESS = '[ATCM] Load case notes success',
  LOAD_PLEADED_NOT_GUILTY_CASES_SUCCESS = '[ATCM] Load pleaded not guilty cases success',
  LOAD_DEFENDANT_DETAILS_UPDATES_SUCCESS = '[ATCM] Load defendant details updates success',
  LOAD_OFFENCE_WITHDRAWAL_REASONS_SUCCESS = '[ATCM] Load offence withdrawal reasons success',
  LOAD_CASES_MISSING_SJP_NOTICE_COUNT_SUCCESS = '[ATCM] Load cases missing SJP notice count success',
  LOAD_REGIONS_SUCCESS = '[ATCM] Load regions success',
  SET_FILTER = '[ATCM] Set filter'
}

export class LoadCaseSuccess implements Action {
  readonly type = EntitiesActionType.LOAD_CASE_SUCCESS;

  constructor(public kase: Case) {}
}

export class LoadPleadedNotGuiltyCases implements Action {
  readonly type = EntitiesActionType.LOAD_PLEADED_NOT_GUILTY_CASES_SUCCESS;

  constructor(public actionResult: PleadedNotGuiltyCaseResult) {}
}

export class LoadDefendantDetailsUpdates implements Action {
  readonly type = EntitiesActionType.LOAD_DEFENDANT_DETAILS_UPDATES_SUCCESS;

  constructor(public actionResult: DefendantDetailsUpdatesResult) {}
}

export class LoadOffenceWithdrawalReasonsSuccess implements Action {
  readonly type = EntitiesActionType.LOAD_OFFENCE_WITHDRAWAL_REASONS_SUCCESS;

  constructor(public offenceWithdrawalReasons: OffenceWithdrawalReason[]) {}
}

export class LoadCaseNotesSuccess implements Action {
  readonly type = EntitiesActionType.LOAD_CASE_NOTES_SUCCESS;

  constructor(public caseNotes: CaseNotes) {}
}

export class LoadCasesWithSjpNoticeCountSuccess implements Action {
  readonly type = EntitiesActionType.LOAD_CASES_MISSING_SJP_NOTICE_COUNT_SUCCESS;

  constructor(public casesMissingSJPNoticeCount: CasesMissingSjpNoticeResult) {}
}

export class LoadRegionsSuccess implements Action {
  readonly type = EntitiesActionType.LOAD_REGIONS_SUCCESS;

  constructor(public regions: Region[]) {}
}

export interface SetFilterPayload {
  selectedRegion: string;
  prosecutor: string;
}

export class SetFilter implements Action {
  readonly type = EntitiesActionType.SET_FILTER;

  constructor(public payload: SetFilterPayload) {}
}

export type EntitiesAction =
  | LoadPleadedNotGuiltyCases
  | LoadDefendantDetailsUpdates
  | LoadCaseSuccess
  | LoadCaseNotesSuccess
  | LoadOffenceWithdrawalReasonsSuccess
  | LoadCasesWithSjpNoticeCountSuccess
  | LoadRegionsSuccess
  | SetFilter;
