import { combineReducers } from '@ngrx/store';
import { reducers } from '../../core';
import * as fromActions from '../search.action';
import * as fromSelectors from '../search.selectors';
import { searchReducer as search } from '../search.reducer';
import { MOCK_CASES } from './test-mock-data';

describe('search/selectors', () => {
  const reducer = combineReducers({ ...reducers, search });

  const createState = (actions: fromActions.SearchActions[]) => {
    return [...actions].reduce((state, action) => reducer(state, action), {
      search: null
    } as fromSelectors.FeatureState);
  };

  describe('getSearchKeyword', () => {
    it('should select the available keyword', () => {
      const state = createState([new fromActions.Search('testing')]);

      expect(fromSelectors.getSearchKeyword(state)).toMatchSnapshot();
    });
  });

  describe('getCaseDetails', () => {
    it('should select the available cases with details', () => {
      const state = createState([new fromActions.SearchSuccess(MOCK_CASES)]);
      expect(fromSelectors.getSearchResultCases(state)).toMatchSnapshot();
    });
  });
});
