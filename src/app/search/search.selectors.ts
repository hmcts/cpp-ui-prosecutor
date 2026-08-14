import { State } from '../core';
import { createSelector } from '@ngrx/store';
import { getUserGroups } from '@cpp/users-groups';

export type FeatureState = State;

export const getSearchResult = (state: FeatureState) => state.search;
export const getKeyword = (state: FeatureState) => state.search && state.search.keyword;
export const getSearchResultCases = createSelector(getSearchResult, cases => cases && cases.results);
export const getProsecutorAuthorities = createSelector(getUserGroups, userGroups =>
  (userGroups || [])
    .filter(group => !!group.prosecutingAuthority)
    .map(({ prosecutingAuthority }) => prosecutingAuthority)
);

export const PROSECUTOR_DEFAULT_VALUE = 'ALL';

export const getProsecutorAuthoritiesOptions = createSelector(getProsecutorAuthorities, prosecutors => [
  { label: 'All', value: PROSECUTOR_DEFAULT_VALUE },
  ...prosecutors.map(p => ({ label: p, value: p }))
]);
