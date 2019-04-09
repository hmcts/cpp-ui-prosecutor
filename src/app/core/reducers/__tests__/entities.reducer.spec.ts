import { TestBed } from '@angular/core/testing';
import {
  caseReducer,
  defendantDetailsUpdatesReducer,
  PleadedNotGuiltyCasesState,
  pleadedNotGuiltyReducer
} from '../entities.reducer';
import { LoadCaseSuccess, LoadDefendantDetailsUpdates, LoadPleadedNotGuiltyCases } from '../../actions/entities';
import {
  MOCK_PENDING_DATES_TO_AVOID,
  MOCK_DEFENDANT_DETAILS_UPDATES
} from '../../../dashboard/__tests__/test-mock-data';
import { Case } from '../../../contexts/sjp';

describe('caseReducer', () => {
  describe('undefined action', () => {
    it('should initialize the default state', () => {
      const action = {} as any;
      const result = caseReducer(undefined, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD_CASE_SUCCESS', () => {
    it('should set the incoming case', () => {
      const action = new LoadCaseSuccess({ id: 'caseId' } as Case);
      const result = caseReducer(undefined, action);
      expect(result).toMatchSnapshot();
    });
  });
});

describe('pleadedNotGuiltyReducer', () => {
  describe('undefined action', () => {
    it('should initialize the default state', () => {
      const action = {} as any;
      const result = pleadedNotGuiltyReducer(undefined, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD_PLEADED_NOT_GUILTY_CASES_SUCCESS', () => {
    it('should set the new state', () => {
      const result = pleadedNotGuiltyReducer(undefined, new LoadPleadedNotGuiltyCases(MOCK_PENDING_DATES_TO_AVOID));

      expect(result).toMatchSnapshot();
    });
  });
});

describe('defendantDetailsUpdatesReducer', () => {
  describe('undefined action', () => {
    it('should initialize the default state', () => {
      const action = {} as any;
      const result = defendantDetailsUpdatesReducer(undefined, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LOAD_DEFENDANT_DETAILS_UPDATES_SUCCESS', () => {
    it('should set the new state', () => {
      const result = defendantDetailsUpdatesReducer(
        undefined,
        new LoadDefendantDetailsUpdates(MOCK_DEFENDANT_DETAILS_UPDATES)
      );

      expect(result).toMatchSnapshot();
    });
  });
});
