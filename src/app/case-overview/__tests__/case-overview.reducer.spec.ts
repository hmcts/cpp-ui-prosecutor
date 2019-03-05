import { caseOverviewReducer, CaseOverviewState, CaseOverviewState } from '../case-overview.reducer';
import { GetCaseById, GetCaseByIdSuccess } from '../case-overview.action';
import { MOCK_CASE } from './test-mock-data';

const state = {
  caseId: null,
  offences: null
} as CaseOverviewState;

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

  describe('when GET_CASE_BY_ID', () => {
    beforeEach(() => {
      action = new GetCaseById('case-id-test');
      resultState = caseOverviewReducer(state, action);
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
