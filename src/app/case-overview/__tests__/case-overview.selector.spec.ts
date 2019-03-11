import { combineReducers } from '@ngrx/store';
import { reducers } from '../../core';
import * as fromActions from '../case-overview.action';
import * as fromSelectors from '../case-overview.selectors';
import { caseOverviewReducer as kase } from '../case-overview.reducer';
import { MOCK_CASE } from './test-mock-data';

describe('case overview/selectors', () => {
  const reducer = combineReducers({ ...reducers, kase });

  const createState = (actions: fromActions.CaseOverviewActions[]) => {
    return [...actions].reduce((state, action) => reducer(state, action), { kase: null } as fromSelectors.FeatureState);
  };

  describe('getCase', () => {
    it('should select the case from the store', () => {
      const state = createState([new fromActions.GetCaseByIdSuccess(MOCK_CASE)]);
      expect(fromSelectors.getCase(state)).toMatchSnapshot();
    });
  });

  describe('getDefendant', () => {
    it('should select the case from the store', () => {
      const state = createState([new fromActions.GetCaseByIdSuccess(MOCK_CASE)]);
      expect(fromSelectors.getDefendant(state)).toMatchSnapshot();
    });
  });

  describe('getOffences', () => {
    it('should select the case from the store', () => {
      const state = createState([new fromActions.GetCaseByIdSuccess(MOCK_CASE)]);
      expect(fromSelectors.getOffences(state)).toMatchSnapshot();
    });
  });
});
