import { CsvFileUploadDetails } from '../../contexts/staging-tfl';
import { CsvFileUploadAction, CsvFileUploadActionType } from './check-csv-upload.action';

export type CsvFileUploadState = CsvFileUploadDetails[];

export function csvFileUploadReducer(state: CsvFileUploadState, action: CsvFileUploadAction): CsvFileUploadState {
  if (action.type === CsvFileUploadActionType.LOAD_CSV_FILE_UPLOAD_DETAILS_SUCCESS) {
    return action.fileUploadDetails;
  }

  return state;
}
