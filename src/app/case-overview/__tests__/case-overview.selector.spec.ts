import { combineReducers } from '@ngrx/store';
import { reducers } from '../../core';
import * as fromActions from '../case-overview.action';
import * as fromSelectors from '../case-overview.selectors';
import { caseOverviewReducer as caseOverview } from '../case-overview.reducer';
import { MOCK_CASE } from './test-mock-data';

describe('case overview/selectors', () => {
  const reducer = combineReducers({ ...reducers, caseOverview });

  const createState = (actions: fromActions.CaseOverviewActions[]) => {
    return [...actions].reduce((state, action) => reducer(state, action), {
      caseOverview: null
    } as fromSelectors.FeatureState);
  };

  describe('getCaseId', () => {
    it('should select the caseId', () => {
      const state = createState([new fromActions.GetCaseById('case-id-test')]);

      expect(fromSelectors.getCaseId(state)).toMatchSnapshot();
    });
  });

  describe('getCaseById', () => {
    it('should select the case from the store', () => {
      const state = createState([new fromActions.GetCaseByIdSuccess(MOCK_CASE)]);
      expect(fromSelectors.getCase(state)).toMatchSnapshot();
    });
  });
});
