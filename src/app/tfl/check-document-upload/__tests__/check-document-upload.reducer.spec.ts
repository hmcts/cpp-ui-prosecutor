import { documentUploadReducer } from '../check-document-upload.reducer';
import { DocumentUploadDetails, UploadStatus } from '../../../contexts/staging-tfl';
import { DocumentUploadAction, LoadDocumentUploadDetailsSuccess } from '../document-upload.action';

describe('Check document upload reducer', () => {
  const mockDocumentUploadDetails = {
    zipFilename: 'fileName.zipFile',
    bundleUploadId: 'uploadId',
    uploadStatus: {
      status: 'SUCCEEDED'
    } as UploadStatus
  } as DocumentUploadDetails;

  describe('default', () => {
    it('should set the state', () => {
      const result = documentUploadReducer(undefined, {} as DocumentUploadAction);
      expect(result).toMatchSnapshot();
    });

    it('should update state with document file upload data', () => {
      const action = new LoadDocumentUploadDetailsSuccess([mockDocumentUploadDetails]);
      const result = documentUploadReducer(undefined, action);
      expect(result).toMatchSnapshot();
    });
  });
});
