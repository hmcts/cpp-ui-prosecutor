import { SearchActions, SearchTypes } from './search.action';
import { CaseDetails } from './search.container';

export interface SearchState {
  searchKeyword: string;
  casesDetails: CaseDetails[];
}

const initialState: SearchState = {
  searchKeyword: null,
  casesDetails: null
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
        casesDetails: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
