import { Action } from '@ngrx/store';
import { CasesMissingSjpNoticeResult } from '../contexts/sjp';
import { FileUploadStatResult } from '../contexts/staging-tfl/staging-tfl.interface';
import { CsvUploadRequestParam } from '../contexts/staging-tfl/staging-tfl-param.interface';

export const enum TflActionType {
  LOAD_CASES_WITH_SJP_NOTICE_COUNT_SUCCESS = '[ATCM] Load cases with sjp notice count success',
  LOAD_FILE_UPLOAD_STATS_SUCCESS = '[ATCM] Load upload file stats success',

  SUBMIT_CSV_FILES = '[ATCM] Submit CSV files for upload',
  SUBMIT_CSV_FILES_SUCCESS = '[ATCM] Submit CSV files for upload success',
  RESET_CSV_UPLOAD_PAGE_STATE = '[ATCM] Clear csv upload state',

  UPLOAD_DOCUMENTS = '[ATCM] Upload documents',
  UPLOAD_DOCUMENTS_SUCCESS = '[ATCM] Upload documents success',
  RESET_UPLOAD_DOCUMENT_SUCCESS = '[ATCM] Clear Upload documents success'
}

export class LoadCasesWithSjpNoticeCountSuccess implements Action {
  readonly type = TflActionType.LOAD_CASES_WITH_SJP_NOTICE_COUNT_SUCCESS;

  constructor(public sjpNoticeCaseResult: CasesMissingSjpNoticeResult) {}
}

export class LoadFileUploadStatsSuccess implements Action {
  readonly type = TflActionType.LOAD_FILE_UPLOAD_STATS_SUCCESS;

  constructor(public fileUploadStatResult: FileUploadStatResult) {}
}

export class SubmitCsvFiles implements Action {
  readonly type = TflActionType.SUBMIT_CSV_FILES;

  constructor(public csvUploadRequestParam: CsvUploadRequestParam) {}
}

export class SubmitCsvFilesSuccess implements Action {
  readonly type = TflActionType.SUBMIT_CSV_FILES_SUCCESS;

  constructor() {}
}

export class ResetCsvUploadPageState implements Action {
  readonly type = TflActionType.RESET_CSV_UPLOAD_PAGE_STATE;

  constructor() {}
}

export class UploadDocuments implements Action {
  readonly type = TflActionType.UPLOAD_DOCUMENTS;

  constructor(public zipFile: File) {}
}

export class UploadDocumentsSuccess implements Action {
  readonly type = TflActionType.UPLOAD_DOCUMENTS_SUCCESS;

  constructor() {}
}

export class ResetUploadDocumentSuccess implements Action {
  readonly type = TflActionType.RESET_UPLOAD_DOCUMENT_SUCCESS;

  constructor() {}
}

export type TflAction =
  | LoadCasesWithSjpNoticeCountSuccess
  | SubmitCsvFiles
  | SubmitCsvFilesSuccess
  | LoadFileUploadStatsSuccess
  | ResetCsvUploadPageState
  | UploadDocuments
  | UploadDocumentsSuccess
  | ResetUploadDocumentSuccess;
