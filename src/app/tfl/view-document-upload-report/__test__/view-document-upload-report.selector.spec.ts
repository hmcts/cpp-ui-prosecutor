import { combineReducers } from '@ngrx/store';
import { reducers } from '../../../reducers';
import { documentUploadReportReducer } from '../view-document-upload-report.reducer';
import { DocumentUploadReportAction, LoadDocumentUploadReportSuccess } from '../view-document-upload-report.action';
import { FeatureState, getDocumentUploadReport } from '../view-document-upload-report.selector';
import { DocumentUploadDetails } from '../../../contexts/staging-tfl';

describe('document upload report selectors', () => {
  const reducer = combineReducers({ ...reducers, documentUploadReport: documentUploadReportReducer });
  const initialState = {
    documentUploadReport: null
  };

  const createState = (actions: DocumentUploadReportAction[]) => {
    return [...actions].reduce((state, action) => reducer(state, action), initialState as FeatureState);
  };

  describe('getDocumentUploadStats', () => {
    const mockUploadReport = {
      bundleUploadId: 'uploadID'
    } as DocumentUploadDetails;

    describe('getDocumentUploadReport', () => {
      it('should select default state', () => {
        const state = createState([]);
        expect(getDocumentUploadReport(state)).toBeNull();
      });

      it('should select the document upload report', () => {
        const state = createState([new LoadDocumentUploadReportSuccess(mockUploadReport)]);
        expect(getDocumentUploadReport(state)).toEqual(mockUploadReport);
      });
    });
  });
});
