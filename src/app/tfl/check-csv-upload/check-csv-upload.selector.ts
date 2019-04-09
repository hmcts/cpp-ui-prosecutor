import { State } from '../../reducers';
import { CsvFileUploadState } from './check-csv-upload.reducer';

export interface FeatureState extends State {
  csvFileUploadDetails: CsvFileUploadState;
}

export const getCsvFileUploadDetails = (state: FeatureState) => state.csvFileUploadDetails || [];
