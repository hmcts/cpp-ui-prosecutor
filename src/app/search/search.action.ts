import { Action } from '@ngrx/store';
import { SearchState } from './search.reducer';

/*
 * TypeScript creates a lookup dictionary for regular enums,
 * but the compiler will inline const enums at their reference
 * sites and compile away the enum itself.
 * It’s also worth noting that our enum values are now types
 * instead of simple strings.
 */
export const enum SearchTypes {
  RESET_SEARCH_RESULT = '[ATCM] reset search result',
  SEARCH_SUCCESS = '[ATCM] Search Success'
}

export class ResetSearchResult implements Action {
  readonly type = SearchTypes.RESET_SEARCH_RESULT;
  constructor() {}
}

export class SearchSuccess implements Action {
  readonly type = SearchTypes.SEARCH_SUCCESS;

  constructor(public payload: SearchState) {}
}

export type SearchActions = ResetSearchResult | SearchSuccess;
