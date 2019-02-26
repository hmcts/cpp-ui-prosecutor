import { Action } from '@ngrx/store';
import { CaseDetails } from './search.container';

/*
 * TypeScript creates a lookup dictionary for regular enums,
 * but the compiler will inline const enums at their reference
 * sites and compile away the enum itself.
 * It’s also worth noting that our enum values are now types
 * instead of simple strings.
 */
export const enum SearchTypes {
  SEARCH = '[Search] Search',
  SEARCH_SUCCESS = '[Search] Search Success'
}

export class Search implements Action {
  readonly type = SearchTypes.SEARCH;
  constructor(public payload: string) {}
}

export class SearchSuccess implements Action {
  readonly type = SearchTypes.SEARCH_SUCCESS;
  constructor(public payload: CaseDetails[]) {}
}

export type SearchActions = Search | SearchSuccess;
