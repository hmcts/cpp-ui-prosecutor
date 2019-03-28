import { combineReducers } from '@ngrx/store';
import { reducers } from '../../core';
import * as fromActions from '../search.action';
import * as fromSelectors from '../search.selectors';
import { searchReducer as search, SearchState } from '../search.reducer';
import { MOCK_SEARCH_RESULTS } from './test-mock-data';

describe('search/selectors', () => {
  const reducer = combineReducers({ ...reducers, search });

  const createState = (actions: fromActions.SearchActions[]) => {
    return [...actions].reduce((state, action) => reducer(state, action), {
      search: null
    } as fromSelectors.FeatureState);
  };

  describe('getSearchKeyword', () => {
    it('should select the available keyword', () => {
      const state = createState([new fromActions.SearchSuccess({ keyword: 'keyword' } as SearchState)]);
      expect(fromSelectors.getKeyword(state)).toMatchSnapshot();
    });
  });

  describe('getSearchResultCases', () => {
    it('should select the available cases with details', () => {
      const state = createState([new fromActions.SearchSuccess({ ...MOCK_SEARCH_RESULTS, keyword: 'keyword' })]);
      expect(fromSelectors.getSearchResultCases(state)).toMatchSnapshot();
    });
  });
});
