import { CsvFileUploadReport } from '../../contexts/staging-tfl';
import { CsvUploadReportAction, CsvUploadReportActionType } from './view-csv-upload-report.action';

export type CsvUploadReportState = CsvFileUploadReport;

export function csvFileUploadReportReducer(
  state: CsvUploadReportState,
  action: CsvUploadReportAction
): CsvUploadReportState {
  if (action.type === CsvUploadReportActionType.LOAD_CSV_UPLOAD_REPORT_SUCCESS) {
    return action.csvUploadReport;
  }

  return state;
}
