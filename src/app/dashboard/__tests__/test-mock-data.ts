import { DefendantDetailsUpdatesState, PleadedNotGuiltyCasesState } from '../../core/reducers/entities.reducer';
import { OffenceWithdrawalReason } from '../../contexts/reference-data';
import { CasesMissingSjpNoticeResult } from '../../contexts/sjp';

export const MOCK_PENDING_DATES_TO_AVOID: PleadedNotGuiltyCasesState = {
  cases: [
    {
      caseId: 'f10c88de-e577-47df-98af-c8944c5094d0',
      pleaEntry: '2019-03-14T11:54:08.167Z',
      firstName: 'Dennon Dennon Dennon',
      lastName: 'Smith',
      address: {
        address1: 'Flat 1, Armageddon House',
        address2: '13 Old Road',
        address3: 'Giggleswick',
        address4: 'Merton',
        address5: 'London',
        postcode: 'LE3 1AB'
      },
      referenceNumber: 'TVL640029AGBG',
      region: 'London',
      dateOfBirth: '1975-03-25'
    },
    {
      caseId: 'facca075-d7a5-4f66-ac54-c2e0a2b47d77',
      pleaEntry: '2019-03-19T16:56:14.915Z',
      firstName: 'Stefanos Stefanos Stefanos',
      lastName: 'Smith',
      address: {
        address1: 'Flat 1, Armageddon House',
        address2: '13 Old Road',
        address3: 'Giggleswick',
        address4: 'Merton',
        address5: 'London',
        postcode: 'SE21 1AB'
      },
      referenceNumber: 'TVL143468N9KN',
      region: 'London',
      dateOfBirth: '2001-03-23'
    }
  ],
  count: 2
};

export const MOCK_PENDING_DATES_TO_AVOID_WITH_SINGLE_CASE: PleadedNotGuiltyCasesState = {
  cases: [
    {
      caseId: 'facca075-d7a5-4f66-ac54-c2e0a2b47d77',
      pleaEntry: '2019-03-19T16:56:14.915Z',
      firstName: 'Stefanos Stefanos Stefanos',
      lastName: 'Smith',
      address: {
        address1: 'Flat 1, Armageddon House',
        address2: '13 Old Road',
        address3: 'Giggleswick',
        address4: 'Merton',
        address5: 'London',
        postcode: 'SE21 1AB'
      },
      referenceNumber: 'TVL143468N9KN',
      region: 'London',
      dateOfBirth: '2001-03-23'
    }
  ],
  count: 2
};

export const MOCK_DEFENDANT_DETAILS_UPDATES: DefendantDetailsUpdatesState = {
  total: 2,
  defendantDetailsUpdates: [
    {
      firstName: 'John',
      lastName: 'Jones',
      prosecutingAuthority: 'DVLA',
      defendantId: '1844b883-1646-428a-a0f8-cb92706af5d2',
      caseId: '842054bb-3e72-4166-ae67-52355f047765',
      region: 'London',
      caseUrn: 'TVL7105556000',
      dateOfBirth: '1977-10-17',
      nameUpdated: true,
      dateOfBirthUpdated: true,
      addressUpdated: true,
      updatedOn: '2019-04-04'
    },
    {
      firstName: 'Bob',
      lastName: 'Last',
      prosecutingAuthority: 'DVLA',
      defendantId: '4ab78156-d8d0-4b99-9e96-da50a311aaba',
      caseId: '12ca0803-d10b-44dd-bf6b-c0242c207e55',
      region: 'London',
      caseUrn: 'TVL9772166531',
      dateOfBirth: '1991-02-19',
      nameUpdated: true,
      dateOfBirthUpdated: true,
      addressUpdated: true,
      updatedOn: '2019-04-04'
    }
  ]
};

export const MOCK_OFFENCE_WITHDRAWAL_REASON: OffenceWithdrawalReason[] = [
  {
    id: '1',
    sequence: 1,
    reasonCodeDescription: 'First',
    legalAdviser: true,
    prosecutor: true
  },
  {
    id: '2',
    sequence: 2,
    reasonCodeDescription: 'Second',
    legalAdviser: true,
    prosecutor: false
  },
  {
    id: '3',
    sequence: 3,
    reasonCodeDescription: 'Third',
    legalAdviser: false,
    prosecutor: true
  }
];

export const MOCK_CASES_MISSING_SJP_NOTICE_COUNT: CasesMissingSjpNoticeResult = {
  count: 3
};
