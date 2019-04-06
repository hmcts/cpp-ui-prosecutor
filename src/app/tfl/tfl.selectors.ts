import { State } from '../reducers';
import { TflState } from './tfl.reducer';
import { createSelector } from '@ngrx/store';

export interface FeatureState extends State {
  tfl: TflState;
}

export const getCasesWithSjpNotice = (state: FeatureState) => state.tfl.sjpNoticeCaseResult;
export const getFileUploadStats = (state: FeatureState) => state.tfl.fileUploadStats;

export const getCasesWithSjpNoticeCount = createSelector(
  getCasesWithSjpNotice,
  casesWithSjpNotice => (casesWithSjpNotice ? casesWithSjpNotice.count || 0 : 0)
);

export const getDocumentsUploadErrorCount = createSelector(
  getFileUploadStats,
  fileUploadStats => (fileUploadStats ? fileUploadStats.documentsUpload.errorCount || 0 : 0)
);

export const getCsvUploadErrorCount = createSelector(
  getFileUploadStats,
  fileUploadStats => (fileUploadStats ? fileUploadStats.csvUpload.errorCount || 0 : 0)
);

export const getCsvUploadStatus = (state: FeatureState) => state.tfl.csvUploadSuccess;
