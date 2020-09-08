import { combineReducers } from '@ngrx/store';
import { reducers } from '../../reducers';
import { casesMissingSjpNoticesReducer } from '../cases-missing-sjp-notices.reducer';
import { CaseSummary, DefendantSummary } from '../../contexts/sjp';
import { CasesMissingSjpNoticesAction, LoadCasesMissingSjpNoticeSuccess } from '../cases-missing-sjp-notices.action';
import { FeatureState, getCasesMissingSjpNotices } from '../cases-missing-sjp-notices.selector';

describe('cases missing sjp notice selectors', () => {
  const reducer = combineReducers({ ...reducers, casesMissingNotices: casesMissingSjpNoticesReducer });

  const initialState = {
    casesMissingNotices: null
  };

  const createState = (actions: CasesMissingSjpNoticesAction[]) => {
    return [...actions].reduce((state, action) => reducer(state, action), initialState as FeatureState);
  };

  describe('getCasesMissingSjpNotice', () => {
    const mockCasesMissingNotice = [
      {
        id: 'caseId1',
        urn: '22C22222222',
        defendant: {
          id: 'defendantId1',
          title: 'Mr',
          firstName: 'Abel',
          lastName: 'Krumps',
          dateOfBirth: '1972-01-01',
          gender: 'Male',
          nationalInsuranceNumber: 'SR67854OP'
        } as DefendantSummary,
        prosecutingAuthority: 'TFL',
        postingDate: '2019-05-03'
      } as CaseSummary,
      {
        id: 'caseId2',
        urn: '33C2DF22222',
        defendant: {
          id: 'defendantId2',
          title: 'Mrs',
          firstName: 'Linda',
          lastName: 'Craig',
          dateOfBirth: '1980-07-12',
          gender: 'Female',
          nationalInsuranceNumber: 'SR63344OQ'
        } as DefendantSummary,
        prosecutingAuthority: 'TFL',
        postingDate: '2019-05-03'
      } as CaseSummary
    ];

    it('should select default state', () => {
      const state = createState([]);
      expect(getCasesMissingSjpNotices(state)).toEqual([]);
    });

    it('should select the cases missing notices', () => {
      const state = createState([new LoadCasesMissingSjpNoticeSuccess(mockCasesMissingNotice)]);
      expect(getCasesMissingSjpNotices(state)).toEqual(mockCasesMissingNotice);
    });
  });
});
