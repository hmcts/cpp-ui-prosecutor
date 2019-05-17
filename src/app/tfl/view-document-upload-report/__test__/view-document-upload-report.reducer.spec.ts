import { DocumentUploadDetails } from '../../../contexts/staging-tfl';
import { documentUploadReportReducer } from '../view-document-upload-report.reducer';
import { DocumentUploadReportAction, LoadDocumentUploadReportSuccess } from '../view-document-upload-report.action';

describe('Document upload report reducer', () => {
  const mockUploadReport = {
    bundleUploadId: 'uploadID'
  } as DocumentUploadDetails;

  describe('default', () => {
    it('should set the state', () => {
      const result = documentUploadReportReducer(undefined, {} as DocumentUploadReportAction);
      expect(result).toMatchSnapshot();
    });

    it('should update state with document upload data', () => {
      const action = new LoadDocumentUploadReportSuccess(mockUploadReport);
      const result = documentUploadReportReducer(undefined, action);
      expect(result).toMatchSnapshot();
    });
  });
});
