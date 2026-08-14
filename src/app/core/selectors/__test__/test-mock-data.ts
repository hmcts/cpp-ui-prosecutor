import { Case, CaseDocumentMetaData, ContactDetails, Offence } from '../../../contexts/sjp';
import { PleadedNotGuiltyCasesState } from '../../reducers/entities.reducer';
import { OffenceWithdrawalReason } from '../../../contexts/reference-data';

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

export const MOCK_OFFENCES: Offence[] = [
  {
    id: 'offenceId1',
    offenceCode: 'CA03013',
    title: 'offence title 1',
    legislation: 'legislation 2',
    offenceSequenceNumber: 1,
    wording: 'wording',
    cjsCode: 'CA03013',
    sequenceNumber: 1,
    startDate: '2019-01-19',
    chargeDate: '2019-01-24',
    compensation: 30,
    prosecutionFacts: 'facts'
  } as Offence,
  {
    id: 'offenceId2',
    offenceCode: 'CA03013',
    title: 'offence title 2',
    legislation: 'legislation 1',
    offenceSequenceNumber: 1,
    wording: 'wording',
    cjsCode: 'CA03013',
    sequenceNumber: 1,
    startDate: '2019-01-15',
    chargeDate: '2019-01-27',
    compensation: 23,

    plea: 'NOT_GUILTY',
    pleaMethod: 'POSTAL',
    pleaDate: '2019-02-27T15:32:20.593Z',

    pendingWithdrawal: true,
    prosecutionFacts: 'facts'
  } as Offence
];

export const MOCK_CASE: Case = {
  id: 'case-id-test',
  urn: 'TFL26168N21T5',
  defendant: {
    id: 'defendantId1',
    offences: MOCK_OFFENCES,
    caseId: 'case-id-test',
    interpreter: {
      needed: false
    },
    speakWelsh: false,
    numPreviousConvictions: 2,
    personalDetails: {
      title: 'Mr',
      firstName: 'Guy',
      lastName: 'Smith',
      dateOfBirth: '1957-03-11',
      gender: 'Male',
      address: {
        address1: 'Flat 1, Armageddon House',
        address2: '13 Old Road',
        address3: 'Giggleswick',
        address4: 'Merton',
        postcode: 'CV8 1AB'
      },
      contactDetails: {
        mobile: '77777777',
        email: 'a@a.com',
        niNumber: 'WWWWWWW',
        home: '333333333'
      } as ContactDetails,
      dobChanged: false,
      addressChanged: false,
      nameChanged: false
    }
  },
  dateTimeCreated: '2019-02-24T16:35:46.273Z',
  caseDocuments: [
    {
      id: 'documentId1',
      materialId: '736fabcb-f42e-4677-9f0e-aa7620c5812c',
      documentType: 'PLEA',
      documentNumber: 1,
      addedAt: '2019-02-25T09:30:24.442Z',
      metadata: {
        fileName: 'fileName.pdf'
      } as CaseDocumentMetaData
    },
    {
      id: 'documentId2',
      materialId: '5c0ab97e-20e4-4c67-9b78-0ffb9e92c782',
      documentType: 'SJPN',
      documentNumber: 1,
      addedAt: '2019-02-24T16:35:56.558Z',
      metadata: {
        fileName: 'fileName1.pdf'
      } as CaseDocumentMetaData
    },
    {
      id: 'documentId3',
      materialId: '5c0ab97e-20e4-4c67-9b78-0ffb9e92c782',
      documentType: 'CITN',
      documentNumber: 1,
      addedAt: '2019-02-24T16:35:56.558Z',
      metadata: {
        fileName: 'fileName1.pdf'
      } as CaseDocumentMetaData
    }
  ],
  prosecutingAuthority: 'TFL',
  prosecutingAuthorityName: 'Transport for London',
  completed: true,
  assigned: false,
  costs: 19,
  postingDate: '2019-01-27',
  enterpriseId: 'Z8QG1JR7CMTD',
  onlinePleaReceived: false,
  status: 'COMPLETED',
  listedInCriminalCourts: false,
  policeFlag: false,
  postConviction: false,
  setAside: false,
  managedByATCM: false
};

export const MOCK_OFFENCE_WITHDRAWAL_REASON: OffenceWithdrawalReason[] = [
  {
    id: '3',
    sequence: 3,
    reasonCodeDescription: 'Third',
    legalAdviser: true,
    prosecutor: true
  },
  {
    id: '2',
    sequence: 1,
    reasonCodeDescription: 'Second',
    legalAdviser: true,
    prosecutor: false
  },
  {
    id: '1',
    sequence: 1,
    reasonCodeDescription: 'First',
    legalAdviser: false,
    prosecutor: true
  }
];
