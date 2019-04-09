import { Action } from '@ngrx/store';
import { CsvFileUploadDetails } from '../../contexts/staging-tfl';

export const enum CsvFileUploadActionType {
  LOAD_CSV_FILE_UPLOAD_DETAILS_SUCCESS = '[ATCM] Load csv file upload detail success'
}

export class LoadCsvFileUploadDetailsSuccess implements Action {
  readonly type = CsvFileUploadActionType.LOAD_CSV_FILE_UPLOAD_DETAILS_SUCCESS;

  constructor(public fileUploadDetails: CsvFileUploadDetails[]) {}
}

export type CsvFileUploadAction = LoadCsvFileUploadDetailsSuccess;
