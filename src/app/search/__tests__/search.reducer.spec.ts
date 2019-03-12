import { searchReducer, SearchState } from '../search.reducer';
import { Search, SearchSuccess } from '../search.action';
import { CaseDetails, SearchResult } from '../../contexts/sjp';

const state = {
  searchKeyword: null,
  searchResult: null
} as SearchState;

describe(' Search reducer', () => {
  let resultState: SearchState;
  let action: any;

  describe('default', () => {
    beforeEach(() => {
      action = {} as any;
      resultState = searchReducer(undefined, action);
    });

    it('should set the state', () => {
      expect(resultState).toMatchSnapshot();
    });
  });

  describe('when SEARCH', () => {
    beforeEach(() => {
      action = new Search('testing');
      resultState = searchReducer(state, action);
    });

    it('should set the state', () => {
      expect(resultState).toMatchSnapshot();
    });
  });

  describe('when SEARCH', () => {
    beforeEach(() => {
      action = new SearchSuccess({
        foundCasesWithOutdatedDefendantsName: true,
        results: [{ caseId: 'caseId' } as CaseDetails]
      } as SearchResult);
      resultState = searchReducer(state, action);
    });

    it('should set the state', () => {
      expect(resultState).toMatchSnapshot();
    });
  });
});
