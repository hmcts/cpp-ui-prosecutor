import * as fromActions from '../../actions';
import * as fromSelectors from '../../selectors';

import { combineReducers } from '@ngrx/store';
import { reducers, State } from '../../../reducers';
import { MOCK_CASE, MOCK_PENDING_DATES_TO_AVOID, MOCK_OFFENCE_WITHDRAWAL_REASON } from './test-mock-data';
import { MOCK_CASE_DECISION, MOCK_CASE_NOTES } from '../../../case-overview/__tests__/test-mock-data';
import { getCaseNotes } from '../../../case-overview/case-overview.selectors';

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

  describe('getWithdrawCaseStatus', () => {
    it('should select case withdrawn status from the store', () => {
      const state = createState([new fromActions.LoadCaseSuccess(MOCK_CASE)]);
      expect(fromSelectors.getWithdrawCaseStatus(state)).toMatchSnapshot();
    });
  });

  describe('getPleadedNotGuiltyCasesDetail', () => {
    it('should select the right data from the store', () => {
      const state = createState([new fromActions.LoadPleadedNotGuiltyCases(MOCK_PENDING_DATES_TO_AVOID)]);
      expect(fromSelectors.getPleadedNotGuiltyCasesDetail(state)).toMatchSnapshot();
    });
  });

  describe('getCaseDecisions', () => {
    it('should select the case decisions from the store', () => {
      MOCK_CASE.caseDecisions = [MOCK_CASE_DECISION];
      const state = createState([new fromActions.LoadCaseSuccess(MOCK_CASE)]);
      expect(fromSelectors.getCaseDecisions(state)).toMatchSnapshot();
    });
  });

  describe('getOffenceWithdrawalRequestReasons', () => {
    it('should select offences withdrawal request reasons from the store', () => {
      const state = createState([new fromActions.LoadOffenceWithdrawalReasonsSuccess(MOCK_OFFENCE_WITHDRAWAL_REASON)]);
      expect(fromSelectors.getOffenceWithdrawalRequestReasons(state)).toMatchSnapshot();
    });
  });

  describe('getCaseNotes', () => {
    it('should select and sort the case notes in desc', () => {
      const state = createState([new fromActions.LoadCaseNotesSuccess(MOCK_CASE_NOTES)]);
      expect(getCaseNotes(state)).toMatchSnapshot();
      expect(new Date(getCaseNotes(state).notes[0].addedAt) > new Date(getCaseNotes(state).notes[0].addedAt));
    });
  });
});
