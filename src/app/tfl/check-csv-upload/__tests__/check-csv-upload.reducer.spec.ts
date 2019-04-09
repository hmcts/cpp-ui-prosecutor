import { csvFileUploadReducer } from '../check-csv-upload.reducer';
import { CsvFileUploadAction, LoadCsvFileUploadDetailsSuccess } from '../check-csv-upload.action';
import { CsvFileUploadDetails, UploadStatus } from '../../../contexts/staging-tfl';

describe(' Check CSV upload reducer', () => {
  const mockFileUploadDetails = {
    headerFilename: 'fileName.csv',
    uploadId: 'uploadId',
    uploadStatus: {
      status: 'SUCCEEDED'
    } as UploadStatus
  } as CsvFileUploadDetails;

  describe('default', () => {
    it('should set the state', () => {
      const result = csvFileUploadReducer(undefined, {} as CsvFileUploadAction);
      expect(result).toMatchSnapshot();
    });

    it('should update state with csv file upload data', () => {
      const action = new LoadCsvFileUploadDetailsSuccess([mockFileUploadDetails]);
      const result = csvFileUploadReducer(undefined, action);
      expect(result).toMatchSnapshot();
    });
  });
});
