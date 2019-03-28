import { State } from '../core/reducers';
import { SearchState } from './search.reducer';
import { createSelector } from '@ngrx/store';

export interface FeatureState extends State {
  search: SearchState;
}

export const getSearchResult = (state: FeatureState) => state.search;
export const getKeyword = (state: FeatureState) => state.search && state.search.keyword;
export const getSearchResultCases = createSelector(
  getSearchResult,
  cases => cases && cases.results
);
