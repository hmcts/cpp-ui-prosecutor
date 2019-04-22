import { combineReducers } from '@ngrx/store';
import { reducers } from '../../../reducers';
import { csvFileUploadReportReducer } from '../view-csv-upload-report.reducer';
import { CsvUploadReportAction, LoadCsvUploadReportSuccess } from '../view-csv-upload-report.action';
import { FeatureState, getCsvFileUploadReport } from '../view-csv-upload-report.selector';
import { CsvFileUploadReport } from '../../../contexts/staging-tfl';

describe('csv file upload report selectors', () => {
  const reducer = combineReducers({ ...reducers, csvFileUploadReport: csvFileUploadReportReducer });
  const initialState = {
    csvFileUploadReport: null
  };

  const createState = (actions: CsvUploadReportAction[]) => {
    return [...actions].reduce((state, action) => reducer(state, action), initialState as FeatureState);
  };

  describe('getFileUploadStats', () => {
    const mockUploadReport = {
      uploadId: 'uploadID',
      headerFilename: 'headerFileName.csv'
    } as CsvFileUploadReport;

    describe('getCsvFileUploadReport', () => {
      it('should select default state', () => {
        const state = createState([]);
        expect(getCsvFileUploadReport(state)).toBeNull();
      });

      it('should select the csv file upload report', () => {
        const state = createState([new LoadCsvUploadReportSuccess(mockUploadReport)]);
        expect(getCsvFileUploadReport(state)).toEqual(mockUploadReport);
      });
    });
  });
});
