import { Action } from '@ngrx/store';
import { CsvFileUploadReport } from '../../contexts/staging-tfl';

export const enum CsvUploadReportActionType {
  LOAD_CSV_UPLOAD_REPORT_SUCCESS = '[ATCM] Load csv upload report success'
}

export class LoadCsvUploadReportSuccess implements Action {
  readonly type = CsvUploadReportActionType.LOAD_CSV_UPLOAD_REPORT_SUCCESS;

  constructor(public csvUploadReport: CsvFileUploadReport) {}
}

export type CsvUploadReportAction = LoadCsvUploadReportSuccess;
