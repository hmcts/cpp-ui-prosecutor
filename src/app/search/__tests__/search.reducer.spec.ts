import { searchReducer, SearchState } from '../search.reducer';
import { ResetSearchResult, SearchSuccess } from '../search.action';
import { CaseDetails } from '../../contexts/sjp';

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

  describe('when search success', () => {
    beforeEach(() => {
      action = new SearchSuccess({
        keyword: 'search',
        foundCasesWithOutdatedDefendantsName: true,
        results: [{ caseId: 'caseId' } as CaseDetails]
      } as SearchState);
      resultState = searchReducer(undefined, action);
    });

    it('should set the state', () => {
      expect(resultState).toMatchSnapshot();
    });
  });

  describe('when reset search', () => {
    beforeEach(() => {
      action = new ResetSearchResult();
      resultState = searchReducer(
        {
          keyword: 'search',
          foundCasesWithOutdatedDefendantsName: true,
          results: [{ caseId: 'caseId' } as CaseDetails]
        } as SearchState,
        action
      );
    });

    it('should set the state', () => {
      expect(resultState).toMatchSnapshot();
    });
  });
});
