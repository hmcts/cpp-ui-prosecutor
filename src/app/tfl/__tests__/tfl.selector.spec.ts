import { combineReducers } from '@ngrx/store';
import { tflReducer } from '../tfl.reducer';
import { LoadCasesWithSjpNoticeCountSuccess, TflAction } from '../tfl.action';
import { reducers } from '../../reducers';
import { FeatureState, getCasesWithSjpNoticeCount } from '../tfl.selectors';

describe('tfl selectors', () => {
  const reducer = combineReducers({ ...reducers, tfl: tflReducer });

  const createState = (actions: TflAction[]) => {
    return [...actions].reduce((state, action) => reducer(state, action), undefined as FeatureState);
  };

  describe('getCasesWithSjpNoticeCount', () => {
    it('should select the case from the store', () => {
      const state = createState([new LoadCasesWithSjpNoticeCountSuccess({ count: 10 })]);
      expect(getCasesWithSjpNoticeCount(state)).toEqual(10);
    });
  });
});
