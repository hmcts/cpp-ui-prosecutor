import { CsvFileUploadReport } from '../../../contexts/staging-tfl';
import { csvFileUploadReportReducer } from '../view-csv-upload-report.reducer';
import { CsvUploadReportAction, LoadCsvUploadReportSuccess } from '../view-csv-upload-report.action';

describe('CSV upload report reducer', () => {
  const mockUploadReport = {
    uploadId: 'uploadID',
    headerFilename: 'headerFileName.csv'
  } as CsvFileUploadReport;

  describe('default', () => {
    it('should set the state', () => {
      const result = csvFileUploadReportReducer(undefined, {} as CsvUploadReportAction);
      expect(result).toMatchSnapshot();
    });

    it('should update state with csv file upload data', () => {
      const action = new LoadCsvUploadReportSuccess(mockUploadReport);
      const result = csvFileUploadReportReducer(undefined, action);
      expect(result).toMatchSnapshot();
    });
  });
});
