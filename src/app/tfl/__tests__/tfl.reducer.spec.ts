import { tflReducer } from '../tfl.reducer';
import { LoadCasesWithSjpNoticeCountSuccess, LoadFileUploadStatsSuccess, TflAction } from '../tfl.action';
import { FileUploadStat, CsvFileUploadStatResult } from '../../contexts/staging-tfl';

describe(' Tfl reducer', () => {
  describe('default', () => {
    it('should set the state', () => {
      const result = tflReducer(undefined, {} as TflAction);
      expect(result).toMatchSnapshot();
    });

    it('should update state with cases sjp notices case data ', () => {
      const action = new LoadCasesWithSjpNoticeCountSuccess({ count: 10 });
      const result = tflReducer(undefined, action);
      expect(result).toMatchSnapshot();
    });

    it('should update state with cases file upload stats data ', () => {
      const fileUploadStat = { csvUpload: { errorCount: 10 } as FileUploadStat } as CsvFileUploadStatResult;
      const action = new LoadFileUploadStatsSuccess(fileUploadStat);
      const result = tflReducer(undefined, action);
      expect(result).toMatchSnapshot();
    });
  });
});
