import { CaseDetails, ContactDetails, SearchResult } from '../../contexts/sjp';

export const MOCK_SEARCH_RESULTS: SearchResult = {
  foundCasesWithOutdatedDefendantsName: false,
  results: [
    {
      caseId: 'caseId1',
      urn: 'TFL26168N21T5',
      assigned: false,
      completed: true,
      enterpriseId: 'Z8QG1JR7CMTD',
      prosecutingAuthority: 'TFL',
      postingDate: '2019-01-27',
      defendant: {
        firstName: 'Guy',
        lastName: 'Smith',
        dateOfBirth: '1957-03-11',
        dobChanged: false,
        nameChanged: false,
        gender: 'male',
        title: 'alpha',
        outdated: true,
        address: {
          address1: 'Hogwards',
          postcode: 'E1'
        },
        addressChanged: false,
        contactDetails: {} as ContactDetails
      },
      status: 'COMPLETED',
      listedInCriminalCourts: false
    },
    {
      caseId: 'caseId2',
      urn: 'TVL26116MZMMI',
      assigned: false,
      completed: true,
      enterpriseId: 'Y91FYLC8SCJJ',
      prosecutingAuthority: 'TVL',
      postingDate: '2019-01-27',
      defendant: { firstName: 'Jonti Jonti Jonti', lastName: 'Smith', dateOfBirth: '1985-03-04', outdated: false },
      status: 'COMPLETED',
      listedInCriminalCourts: false
    } as CaseDetails,
    {
      caseId: 'caseId3',
      urn: 'TFL84598WRMSZ',
      assigned: false,
      completed: false,
      enterpriseId: 'JZPFWZ26GWBF',
      prosecutingAuthority: 'TFL',
      postingDate: '2019-01-28',
      defendant: { firstName: 'Murad', lastName: 'Smith', dateOfBirth: '1989-03-04', outdated: false },
      status: 'NO_PLEA_RECEIVED',
      listedInCriminalCourts: false
    } as CaseDetails,
    {
      caseId: 'caseId4',
      urn: 'TFL92613WXH4V',
      assigned: false,
      completed: false,
      enterpriseId: '7XQLP31VP93C',
      prosecutingAuthority: 'TFL',
      postingDate: '2019-01-28',
      defendant: { firstName: 'Petru', lastName: 'Smith', dateOfBirth: '1949-03-14', outdated: false },
      status: 'NO_PLEA_RECEIVED_READY_FOR_DECISION',
      listedInCriminalCourts: false
    } as CaseDetails,
    {
      caseId: 'caseId5',
      urn: 'TVL26120QYR99',
      assigned: false,
      completed: true,
      enterpriseId: '8PQ1KQYQK8ZC',
      prosecutingAuthority: 'TVL',
      postingDate: '2019-01-27',
      defendant: {
        firstName: 'Sartaaj Sartaaj Sartaaj',
        lastName: 'Smith',
        dateOfBirth: '1981-03-05',
        outdated: false
      },
      status: 'COMPLETED',
      listedInCriminalCourts: false
    } as CaseDetails
  ]
};
