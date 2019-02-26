import { searchReducer, SearchState } from '../search.reducer';
import { Search, SearchSuccess } from '../search.action';

const state = {
  searchKeyword: null,
  casesDetails: null
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
      action = new SearchSuccess([
        {
          defendantName: 'Smith Long Name',
          defendantDOB: '19 Feb 1965',
          caseReferenceNumber: 'TVL43243413213ASD',
          caseStatus: 'Completed',
          prosecutor: 'TV Licensing',
          noticeServed: '9 Jan 2019'
        }
      ]);
      resultState = searchReducer(state, action);
    });

    it('should set the state', () => {
      expect(resultState).toMatchSnapshot();
    });
  });
});
