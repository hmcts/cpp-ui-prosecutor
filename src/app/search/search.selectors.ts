import { State } from '../core/reducers';
import { SearchState } from './search.reducer';

export interface FeatureState extends State {
  search: SearchState;
}

export const getSearchKeyword = (state: FeatureState) => state.search.searchKeyword;
export const getCaseDetails = (state: FeatureState) => state.search.casesDetails;
