import { SearchActions, SearchTypes } from './search.action';
import { SearchResult } from '../contexts/sjp';

export interface SearchState {
  searchKeyword: string;
  searchResult: SearchResult;
}

const initialState: SearchState = {
  searchKeyword: null,
  searchResult: null
};

export function searchReducer(state: SearchState = initialState, action: SearchActions): SearchState {
  switch (action.type) {
    case SearchTypes.SEARCH: {
      return {
        ...state,
        searchKeyword: action.payload
      };
    }

    case SearchTypes.SEARCH_SUCCESS: {
      return {
        ...state,
        searchResult: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
