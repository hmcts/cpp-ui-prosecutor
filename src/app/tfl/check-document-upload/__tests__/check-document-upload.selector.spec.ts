import { combineReducers } from '@ngrx/store';
import { documentUploadReducer } from '../check-document-upload.reducer';
import { FeatureState, getDocumentUploadDetails } from '../check-document-upload.selector';
import { DocumentUploadDetails, UploadStatus } from '../../../contexts/staging-tfl';
import { reducers } from '../../../reducers';
import { DocumentUploadAction, LoadDocumentUploadDetailsSuccess } from '../document-upload.action';

describe('document upload selectors', () => {
  const reducer = combineReducers({ ...reducers, documentUploadDetails: documentUploadReducer });
  const initialState = {
    documentUploadDetails: [] as DocumentUploadDetails[]
  };

  const createState = (actions: DocumentUploadAction[]) => {
    return [...actions].reduce((state, action) => reducer(state, action), initialState as FeatureState);
  };

  describe('getDocumentUploadDetails', () => {
    const mockDocumentUploadDetails = {
      zipFilename: 'fileName.zipFile',
      bundleUploadId: 'uploadId',
      uploadStatus: {
        status: 'SUCCEEDED'
      } as UploadStatus
    } as DocumentUploadDetails;

    describe('getDocumentsUploadErrorCount', () => {
      it('should select default state', () => {
        const state = createState([]);
        expect(getDocumentUploadDetails(state)).toEqual([]);
      });

      it('should select the document file upload details', () => {
        const state = createState([new LoadDocumentUploadDetailsSuccess([mockDocumentUploadDetails])]);
        expect(getDocumentUploadDetails(state)).toEqual([mockDocumentUploadDetails]);
      });
    });
  });
});
