import * as fromActions from '../../actions';
import * as fromSelectors from '../../selectors';

import { combineReducers } from '@ngrx/store';
import { reducers, State } from '../../../reducers';
import { MOCK_CASE, MOCK_PENDING_DATES_TO_AVOID } from './test-mock-data';

describe('selectors', () => {
  const reducer = combineReducers({ ...reducers });

  const createState = (actions: fromActions.EntitiesAction[]): State => {
    return [...actions].reduce((state, action) => reducer(state, action), undefined as State);
  };

  describe('getCase', () => {
    it('should select the case from the store', () => {
      const state = createState([new fromActions.LoadCaseSuccess(MOCK_CASE)]);
      expect(fromSelectors.getCase(state)).toMatchSnapshot();
    });
  });

  describe('getDefendant', () => {
    it('should select  defendant from the store', () => {
      const state = createState([new fromActions.LoadCaseSuccess(MOCK_CASE)]);
      expect(fromSelectors.getDefendant(state)).toMatchSnapshot();
    });
  });

  describe('getOffences', () => {
    it('should select offences from the store', () => {
      const state = createState([new fromActions.LoadCaseSuccess(MOCK_CASE)]);
      expect(fromSelectors.getOffences(state)).toMatchSnapshot();
    });
  });

  describe('getPleadedNotGuiltyCasesDetail', () => {
    it('should select the right data from the store', () => {
      const state = createState([new fromActions.LoadPleadedNotGuiltyCases(MOCK_PENDING_DATES_TO_AVOID)]);
      expect(fromSelectors.getPleadedNotGuiltyCasesDetail(state)).toMatchSnapshot();
    });
  });
});
