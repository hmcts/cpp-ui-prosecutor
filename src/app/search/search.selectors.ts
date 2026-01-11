import { State } from '../core/reducers';
import { createSelector } from '@ngrx/store';

export type FeatureState = State;

export const getSearchResult = (state: FeatureState) => state.search;
export const getKeyword = (state: FeatureState) => state.search && state.search.keyword;
export const getSearchResultCases = createSelector(
  getSearchResult,
  cases => cases && cases.results
);
