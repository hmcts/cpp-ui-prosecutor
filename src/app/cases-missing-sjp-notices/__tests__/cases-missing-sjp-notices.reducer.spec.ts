import { CaseSummary, DefendantSummary } from '../../contexts/sjp';
import { casesMissingSjpNoticesReducer } from '../cases-missing-sjp-notices.reducer';
import { CasesMissingSjpNoticesAction, LoadCasesMissingSjpNoticeSuccess } from '../cases-missing-sjp-notices.action';

describe('Check Cases Missing SJP Notice reducer', () => {
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

  describe('default', () => {
    it('should set the state', () => {
      const result = casesMissingSjpNoticesReducer(undefined, {} as CasesMissingSjpNoticesAction);
      expect(result).toMatchSnapshot();
    });

    it('should update the state with cases missing sjp notice', () => {
      const action = new LoadCasesMissingSjpNoticeSuccess(mockCasesMissingNotice);
      const result = casesMissingSjpNoticesReducer(undefined, action);
      expect(result).toMatchSnapshot();
    });
  });
});
