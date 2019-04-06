import { combineReducers } from '@ngrx/store';
import { tflReducer, TflState } from '../tfl.reducer';
import { LoadCasesWithSjpNoticeCountSuccess, LoadFileUploadStatsSuccess, TflAction } from '../tfl.action';
import { reducers } from '../../reducers';
import {
  FeatureState,
  getCasesWithSjpNoticeCount,
  getCsvUploadErrorCount,
  getDocumentsUploadErrorCount
} from '../tfl.selectors';
import { CsvFileUploadStatResult } from '../../contexts/staging-tfl';

describe('tfl selectors', () => {
  const reducer = combineReducers({ ...reducers, tfl: tflReducer });
  const initialState: TflState = {
    sjpNoticeCaseResult: undefined,
    fileUploadStats: undefined,
    csvUploadSuccess: undefined
  };
  const createState = (actions: TflAction[]) => {
    return [...actions].reduce((state, action) => reducer(state, action), { tfl: initialState } as FeatureState);
  };

  describe('getCasesWithSjpNoticeCount', () => {
    it('should select the sjp notice case from the store', () => {
      const state = createState([new LoadCasesWithSjpNoticeCountSuccess({ count: 10 })]);
      expect(getCasesWithSjpNoticeCount(state)).toEqual(10);
    });
  });

  describe('getFileUploadStats', () => {
    const fileUploadStats = {
      csvUpload: {
        errorCount: 10
      },
      documentsUpload: {
        errorCount: 10
      }
    } as CsvFileUploadStatResult;

    describe('getDocumentsUploadErrorCount', () => {
      it('should select default count', () => {
        const state = createState([]);
        expect(getDocumentsUploadErrorCount(state)).toEqual(0);
      });

      it('should select documents upload error count count', () => {
        const state = createState([new LoadFileUploadStatsSuccess(fileUploadStats)]);
        expect(getDocumentsUploadErrorCount(state)).toEqual(10);
      });
    });

    describe('getCsvUploadErrorCount', () => {
      it('should select default count', () => {
        const state = createState([]);
        expect(getCsvUploadErrorCount(state)).toEqual(0);
      });

      it('should select csv upload error count', () => {
        const state = createState([new LoadFileUploadStatsSuccess(fileUploadStats)]);
        expect(getCsvUploadErrorCount(state)).toEqual(10);
      });
    });
  });
});
