import { combineReducers } from '@ngrx/store';
import { csvFileUploadReducer } from '../check-csv-upload.reducer';
import { FeatureState, getCsvFileUploadDetails } from '../check-csv-upload.selector';
import { CsvFileUploadAction, LoadCsvFileUploadDetailsSuccess } from '../check-csv-upload.action';
import { CsvFileUploadDetails, UploadStatus } from '../../../contexts/staging-tfl';
import { reducers } from '../../../reducers';

describe('csv file upload selectors', () => {
  const reducer = combineReducers({ ...reducers, csvFileUploadDetails: csvFileUploadReducer });
  const initialState = {
    csvFileUploadDetails: [] as CsvFileUploadDetails[]
  };

  const createState = (actions: CsvFileUploadAction[]) => {
    return [...actions].reduce((state, action) => reducer(state, action), initialState as FeatureState);
  };

  describe('getFileUploadStats', () => {
    const mockFileUploadDetails = {
      headerFilename: 'fileName.csv',
      uploadId: 'uploadId',
      uploadStatus: {
        status: 'SUCCEEDED'
      } as UploadStatus
    } as CsvFileUploadDetails;

    describe('getDocumentsUploadErrorCount', () => {
      it('should select default state', () => {
        const state = createState([]);
        expect(getCsvFileUploadDetails(state)).toEqual([]);
      });

      it('should select the csv file upload details', () => {
        const state = createState([new LoadCsvFileUploadDetailsSuccess([mockFileUploadDetails])]);
        expect(getCsvFileUploadDetails(state)).toEqual([mockFileUploadDetails]);
      });
    });
  });
});
