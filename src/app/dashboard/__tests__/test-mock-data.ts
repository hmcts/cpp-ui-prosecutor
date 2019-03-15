import { PleadedNotGuiltyCasesDetailState } from '../../core/reducers/entities.reducer';

export const MOCK_PENDING_DATES_TO_AVOID: PleadedNotGuiltyCasesDetailState = {
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
      dateOfBirth: '2001-03-23'
    }
  ],
  count: 2
};

export const MOCK_PENDING_DATES_TO_AVOID_WITH_SINGLE_CASE: PleadedNotGuiltyCasesDetailState = {
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
      dateOfBirth: '2001-03-23'
    }
  ],
  count: 2
};
