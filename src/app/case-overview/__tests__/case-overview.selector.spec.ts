import { combineReducers } from '@ngrx/store';
import * as fromActions from '../case-overview.action';
import * as fromSelectors from '../case-overview.selectors';
import { caseOverviewReducer as caseOverview } from '../case-overview.reducer';
import { reducers } from '../../reducers';

describe('case overview/selectors', () => {
  const reducer = combineReducers({ ...reducers, caseOverview });

  const createState = (actions: fromActions.CaseOverviewAction[]) => {
    return [...actions].reduce((state, action) => reducer(state, action), undefined as fromSelectors.FeatureState);
  };

  describe('getWithdrawOffenceStatus', () => {
    it('should select the case from the store', () => {
      const state = createState([new fromActions.WithdrawOffencesSuccess()]);
      expect(fromSelectors.getWithdrawOffenceStatus(state)).toMatchSnapshot();
    });

    it('should respond to failure', () => {
      const state = createState([new fromActions.WithdrawOffencesFailed()]);
      expect(fromSelectors.getWithdrawOffenceFailed(state)).toMatchSnapshot();
    });
  });

  describe('getDatesToAvoidStatus', () => {
    it('should select the case from the store', () => {
      const state = createState([new fromActions.SubmitDatesToAvoidSuccess()]);
      expect(fromSelectors.getDatesToAvoidStatus(state)).toMatchSnapshot();
    });
  });
});
