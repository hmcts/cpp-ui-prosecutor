import { State } from '../core/reducers';
import { SearchState } from './search.reducer';
import { createSelector } from '@ngrx/store';

export interface FeatureState extends State {
  search: SearchState;
}

export const getSearchKeyword = (state: FeatureState) => state.search.searchKeyword;
export const getSearchResult = (state: FeatureState) => state.search.searchResult;
export const getSearchResultCases = createSelector(
  getSearchResult,
  cases => {
    if (cases) {
      return cases.results;
    } else {
      return null;
    }
  }
);
