import { State } from '../../reducers';
import { CsvUploadReportState } from './view-csv-upload-report.reducer';

export interface FeatureState extends State {
  csvFileUploadReport: CsvUploadReportState;
}

export const getCsvFileUploadReport = (state: FeatureState) => state.csvFileUploadReport;
