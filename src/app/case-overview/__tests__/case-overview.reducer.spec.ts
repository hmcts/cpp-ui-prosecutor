import { caseOverviewReducer } from '../case-overview.reducer';
import {
  CaseOverviewAction,
  SubmitDatesToAvoidFailed,
  SubmitDatesToAvoidSuccess,
  WithdrawOffencesFailed,
  WithdrawOffencesSuccess
} from '../case-overview.action';

describe(' Case Overview reducer', () => {
  describe('default', () => {
    it('should set the state', () => {
      const result = caseOverviewReducer(undefined, {} as CaseOverviewAction);
      expect(result).toMatchSnapshot();
    });

    it('should update the withdraw offences success state', () => {
      const action = new WithdrawOffencesSuccess();
      const result = caseOverviewReducer(undefined, action);
      expect(result).toMatchSnapshot();
    });

    it('should update the withdraw offences failed state', () => {
      const action = new WithdrawOffencesFailed();
      const result = caseOverviewReducer(undefined, action);
      expect(result).toMatchSnapshot();
    });

    it('should update the dates to avoid success state', () => {
      const action = new SubmitDatesToAvoidSuccess();
      const result = caseOverviewReducer(undefined, action);
      expect(result).toMatchSnapshot();
    });

    it('should update the dates to avoid failed state', () => {
      const action = new SubmitDatesToAvoidFailed();
      const result = caseOverviewReducer(undefined, action);
      expect(result).toMatchSnapshot();
    });
  });
});
