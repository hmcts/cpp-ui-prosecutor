import { caseOverviewReducer, CaseOverviewState } from '../case-overview.reducer';
import { GetCaseByIdSuccess } from '../case-overview.action';
import { MOCK_CASE } from './test-mock-data';

const state = null;
describe(' Case Overview reducer', () => {
  let resultState: CaseOverviewState;
  let action: any;

  describe('default', () => {
    beforeEach(() => {
      action = {} as any;
      resultState = caseOverviewReducer(undefined, action);
    });

    it('should set the state', () => {
      expect(resultState).toMatchSnapshot();
    });
  });

  describe('when GET CASE BY ID SUCCESS', () => {
    beforeEach(() => {
      action = new GetCaseByIdSuccess(MOCK_CASE);
      resultState = caseOverviewReducer(state, action);
    });

    it('should set the state', () => {
      expect(resultState).toMatchSnapshot();
    });
  });
});
