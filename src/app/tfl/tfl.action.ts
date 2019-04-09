import { Action } from '@ngrx/store';
import { SjpNoticeCasesCountResult } from '../contexts/sjp';
import { CsvFileUploadStatResult } from '../contexts/staging-tfl/staging-tfl.interface';

export const enum TflActionType {
  LOAD_CASES_WITH_SJP_NOTICE_COUNT_SUCCESS = '[ATCM] Load cases with sjp notice count success',
  LOAD_FILE_UPLOAD_STATS_SUCCESS = '[ATCM] Load upload file stats success'
}

export class LoadCasesWithSjpNoticeCountSuccess implements Action {
  readonly type = TflActionType.LOAD_CASES_WITH_SJP_NOTICE_COUNT_SUCCESS;

  constructor(public sjpNoticeCaseResult: SjpNoticeCasesCountResult) {}
}

export class LoadFileUploadStatsSuccess implements Action {
  readonly type = TflActionType.LOAD_FILE_UPLOAD_STATS_SUCCESS;

  constructor(public fileUploadStatResult: CsvFileUploadStatResult) {}
}

export type TflAction = LoadCasesWithSjpNoticeCountSuccess | LoadFileUploadStatsSuccess;
