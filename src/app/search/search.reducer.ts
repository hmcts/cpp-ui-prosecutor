import { SearchActions, SearchTypes } from './search.action';
import { SearchResult } from '../contexts/sjp';

export interface SearchState extends SearchResult {
  keyword: string;
}

export function searchReducer(state: SearchState = null, action: SearchActions): SearchState {
  switch (action.type) {
    case SearchTypes.SEARCH_SUCCESS:
      return action.payload;
    case SearchTypes.RESET_SEARCH_RESULT:
      return null;
    default:
      return state;
  }
}
