import { combineReducers } from '@ngrx/store';
import * as fromActions from '../case-overview.action';
import * as fromSelectors from '../case-overview.selectors';
import { caseOverviewReducer as caseOverview } from '../case-overview.reducer';
import { reducers } from '../../reducers';
import { EntitiesAction, LoadCaseSuccess } from '../../core/actions';
import {
  MOCK_CASE,
  MOCK_CASE_DECISION,
  MOCK_CASE_DECISION_2,
  MOCK_CASE_DECISION_WITH_UNSORTED_OFFENCE_DECISIONS
} from './test-mock-data';

describe('case overview/selectors', () => {
  const reducer = combineReducers({ ...reducers, caseOverview });

  const createState = (actions: fromActions.CaseOverviewAction[]) => {
    return [...actions].reduce((state, action) => reducer(state, action), undefined as fromSelectors.FeatureState);
  };

  const createCaseState = (actions: EntitiesAction[]) => {
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

  describe('getCase', () => {
    it('should select case decisions from the store', () => {
      MOCK_CASE.caseDecisions = [MOCK_CASE_DECISION];
      const state = createCaseState([new LoadCaseSuccess(MOCK_CASE)]);
      expect(fromSelectors.getCaseDecisionsWithOffenceDecisions(state)).toMatchSnapshot();
    });

    it('should select and sort multiple case decisions from the store', () => {
      MOCK_CASE.caseDecisions = [MOCK_CASE_DECISION, MOCK_CASE_DECISION_2];
      const state = createCaseState([new LoadCaseSuccess(MOCK_CASE)]);
      expect(fromSelectors.getCaseDecisionsWithOffenceDecisions(state)).toMatchSnapshot();
    });

    it('should select and sort offence decisions from the store', () => {
      MOCK_CASE.caseDecisions = [MOCK_CASE_DECISION_WITH_UNSORTED_OFFENCE_DECISIONS];
      const state = createCaseState([new LoadCaseSuccess(MOCK_CASE)]);
      expect(fromSelectors.getCaseDecisionsWithOffenceDecisions(state)).toMatchSnapshot();
    });
  });
});
