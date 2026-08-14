import {
  AdjournOffenceDecision,
  Case,
  CaseDecision,
  CaseDocumentMetaData,
  ContactDetails,
  Offence,
  WithdrawOffenceDecision,
  CourtReferralOffenceDecision,
  DismissOffenceDecision,
  FinancialPenaltyOffenceDecision,
  DischargeOffenceDecision,
  CaseNotes,
  LegalEntityDetails,
  DefendantOnlinePlea
} from '../../contexts/sjp';

export const MOCK_OFFENCES: Offence[] = [
  {
    id: 'offenceId1',
    offenceCode: 'CA03013',
    title: 'offence title 1',
    legislation: 'legislation 2',
    offenceSequenceNumber: 1,
    wording: 'On 02/07/2015 At threadneedle street EC2 Being a passenger on a Public service Vehicle operated on ..',
    cjsCode: 'CA03013',
    sequenceNumber: 1,
    startDate: '2019-01-19',
    chargeDate: '2019-01-24',
    compensation: 30,
    withdrawalRequestReasonId: '1',
    withdrawalRequestReason: 'Insufficient Evidence',
    prosecutionFacts: 'An incident took place at GREEN PARK station whereby you were spoken to by a member of London ..'
  } as Offence,
  {
    id: 'offenceId2',
    offenceCode: 'CA03013',
    title: 'offence title 2',
    legislation: 'legislation 1',
    offenceSequenceNumber: 2,
    wording:
      'On 02/07/2015 At thread needle street EC2 Being a passenger on a Public service Vehicle operated on behalf of ' +
      'London Bus Services Limited being used for the carriage of passengers at separate fares where the vehicle was ' +
      'being operated by a Driver without a Conductor did not as directed by the Driver an Inspector or a Notice ' +
      'displayed on the vehicle pay the fare for the journey in accordance with the direction ',
    cjsCode: 'CA03013',
    sequenceNumber: 1,
    startDate: '2019-01-15',
    chargeDate: '2019-01-27',
    compensation: 23,

    plea: 'NOT_GUILTY',
    pleaMethod: 'POSTAL',
    pleaDate: '2019-02-27',

    pendingWithdrawal: true,
    prosecutionFacts:
      'An incident took place at GREEN PARK station whereby you were spoken to by a member of London Underground staff ' +
      'regarding your train journey and the associated fare.The facts of this incidents are now being considered and I ' +
      'must advise you that legal proceedings may be initiated against you regarding this matter in accordance with the' +
      ' LU prosecution policy'
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
  dateTimeCreated: '2019-02-24',
  caseDocuments: [
    {
      id: 'documentId1',
      materialId: '736fabcb-f42e-4677-9f0e-aa7620c5812c',
      documentType: 'PLEA',
      documentNumber: 1,
      addedAt: '2019-02-25',
      metadata: {
        fileName: 'fileName.pdf'
      } as CaseDocumentMetaData
    },
    {
      id: 'documentId2',
      materialId: '5c0ab97e-20e4-4c67-9b78-0ffb9e92c782',
      documentType: 'SJPN',
      documentNumber: 1,
      addedAt: '2019-02-24',
      metadata: {
        fileName: 'fileName1.pdf'
      } as CaseDocumentMetaData
    },
    {
      id: 'documentId3',
      materialId: '5c0ab97e-20e4-4c67-9b78-0ffb9e92c782',
      documentType: 'CITN',
      documentNumber: 1,
      addedAt: '2019-02-24',
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

export const MOCK_CASE_LEGAL_ENTITY_DEFENDANT: Case = {
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
    legalEntityDetails: {
      legalEntityName: 'Legal Entity Name',
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
        home: '333333333'
      } as ContactDetails,
      addressChanged: false,
      legalEntityNameChanged: false
    } as LegalEntityDetails
  },
  dateTimeCreated: '2019-02-24',
  caseDocuments: [
    {
      id: 'documentId1',
      materialId: '736fabcb-f42e-4677-9f0e-aa7620c5812c',
      documentType: 'PLEA',
      documentNumber: 1,
      addedAt: '2019-02-25',
      metadata: {
        fileName: 'fileName.pdf'
      } as CaseDocumentMetaData
    },
    {
      id: 'documentId2',
      materialId: '5c0ab97e-20e4-4c67-9b78-0ffb9e92c782',
      documentType: 'SJPN',
      documentNumber: 1,
      addedAt: '2019-02-24',
      metadata: {
        fileName: 'fileName1.pdf'
      } as CaseDocumentMetaData
    },
    {
      id: 'documentId3',
      materialId: '5c0ab97e-20e4-4c67-9b78-0ffb9e92c782',
      documentType: 'CITN',
      documentNumber: 1,
      addedAt: '2019-02-24T',
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

export const MOCK_CASE_DECISION: CaseDecision = {
  id: 'mock-case-decision-1',
  session: {
    sessionId: 'mock-case-decision-session-1',
    legalAdviserUserId: 'mock-case-decision-session-userid-1',
    courtHouseCode: 'B01OK',
    courtHouseName: `Wimbledon Magistrates' Court`,
    localJusticeAreaNationalCourtCode: '2577',
    startedAt: '2018-12-01',
    endedAt: '2018-12-01',
    sessionType: 'DELEGATEDPOWERS',
    legalAdviser: {
      userId: 'legal-adviser-1',
      firstName: 'Mark',
      lastName: 'Adams'
    },
    magistrate: 'Jenny'
  },
  savedAt: '2018-12-01',
  offenceDecisions: [
    {
      id: 'mock-case-offence-decision-1',
      offenceId: 'offenceId1',
      decisionType: 'WITHDRAW',
      withdrawalReason: 'Insufficient evidence',
      withdrawalReasonId: '1',
      verdict: 'NO_VERDICT',
      offenceSequenceNumber: 1
    } as WithdrawOffenceDecision,
    {
      id: 'mock-case-offence-decision-2',
      offenceId: 'offenceId2',
      decisionType: 'WITHDRAW',
      withdrawalReason: 'Insufficient evidence',
      withdrawalReasonId: '1',
      verdict: 'NO_VERDICT',
      offenceSequenceNumber: 2
    } as WithdrawOffenceDecision,
    {
      id: 'mock-case-offence-decision-3',
      offenceId: 'offenceId3',
      decisionType: 'ADJOURN',
      adjournedTo: '2019-06-11',
      verdict: 'NO_VERDICT',
      offenceSequenceNumber: 3
    } as AdjournOffenceDecision,
    {
      id: 'mock-case-offence-decision-4',
      offenceId: 'offenceId4',
      decisionType: 'ADJOURN',
      adjournedTo: '2019-07-11',
      verdict: 'NO_VERDICT',
      offenceSequenceNumber: 4
    } as AdjournOffenceDecision,
    {
      id: 'mock-case-offence-decision-5',
      offenceId: 'offenceId5',
      decisionType: 'ADJOURN',
      adjournedTo: '2019-06-21',
      verdict: 'NO_VERDICT',
      offenceSequenceNumber: 5
    } as AdjournOffenceDecision,
    {
      id: 'mock-case-offence-decision-6',
      offenceId: 'offenceId6',
      decisionType: 'REFER_FOR_COURT_HEARING',
      referralReason: 'Not suitable for SJP',
      verdict: 'NO_VERDICT',
      offenceSequenceNumber: 6
    } as CourtReferralOffenceDecision,
    {
      id: 'mock-case-offence-decision-7',
      offenceId: 'offenceId7',
      decisionType: 'DISMISS',
      verdict: 'PROVED_SJP',
      offenceSequenceNumber: 7
    } as DismissOffenceDecision
  ]
};

export const MOCK_CASE_DECISION_2: CaseDecision = {
  id: 'mock-case-decision-2',
  session: {
    sessionId: 'mock-case-decision-session-2',
    legalAdviserUserId: 'mock-case-decision-session-userid-2',
    courtHouseCode: 'B01OK',
    courtHouseName: `Wimbledon Magistrates' Court`,
    localJusticeAreaNationalCourtCode: '2577',
    startedAt: '2019-12-01',
    endedAt: '2019-12-01',
    sessionType: 'DELEGATEDPOWERS',
    legalAdviser: {
      userId: 'legal-adviser-2',
      firstName: 'Mark',
      lastName: 'Adams'
    }
  },
  savedAt: '2019-12-01',
  offenceDecisions: [
    {
      id: 'mock-case-offence-decision-1',
      offenceId: 'offenceId3',
      decisionType: 'WITHDRAW',
      withdrawalReasonId: '1',
      withdrawalReason: 'Insufficient evidence',
      verdict: 'NO_VERDICT',
      offenceSequenceNumber: 3,
      offenceTitle: 'Use / install a television set without a licence'
    } as WithdrawOffenceDecision,
    {
      id: 'mock-case-offence-decision-1',
      offenceId: 'offenceId4',
      decisionType: 'WITHDRAW',
      withdrawalReasonId: '1',
      withdrawalReason: 'Insufficient evidence',
      verdict: 'NO_VERDICT',
      offenceSequenceNumber: 4,
      offenceTitle: 'Use / install a television set without a licence'
    } as WithdrawOffenceDecision,
    {
      id: 'mock-case-offence-decision-1',
      offenceId: 'offenceId5',
      decisionType: 'WITHDRAW',
      withdrawalReasonId: '1',
      withdrawalReason: 'Insufficient evidence',
      verdict: 'NO_VERDICT',
      offenceSequenceNumber: 5,
      offenceTitle: 'Use / install a television set without a licence'
    } as WithdrawOffenceDecision
  ]
};

export const MOCK_CASE_DECISION_WITH_UNSORTED_OFFENCE_DECISIONS: CaseDecision = {
  id: 'mock-case-decision-1',
  session: {
    sessionId: 'mock-case-decision-session-1',
    legalAdviserUserId: 'mock-case-decision-session-userid-1',
    courtHouseCode: 'B01OK',
    courtHouseName: `Wimbledon Magistrates' Court`,
    localJusticeAreaNationalCourtCode: '2577',
    startedAt: '2018-12-01',
    endedAt: '2018-12-01',
    sessionType: 'DELEGATEDPOWERS',
    legalAdviser: {
      userId: 'legal-adviser-1',
      firstName: 'Mark',
      lastName: 'Adams'
    }
  },
  savedAt: '2018-12-01',
  offenceDecisions: [
    {
      id: 'mock-case-offence-decision-1',
      offenceId: 'offenceId1',
      decisionType: 'WITHDRAW',
      withdrawalReasonId: '1',
      withdrawalReason: 'Insufficient evidence',
      verdict: 'NO_VERDICT',
      offenceSequenceNumber: 1,
      offenceTitle: 'Use / install a television set without a licence'
    } as WithdrawOffenceDecision,
    {
      id: 'mock-case-offence-decision-4',
      offenceId: 'offenceId3',
      decisionType: 'ADJOURN',
      adjournedTo: '2019-06-11',
      verdict: 'NO_VERDICT',
      offenceSequenceNumber: 4,
      offenceTitle: 'Use / install a television set without a licence'
    } as AdjournOffenceDecision,
    {
      id: 'mock-case-offence-decision-2',
      offenceId: 'offenceId5',
      decisionType: 'ADJOURN',
      adjournedTo: '2019-06-21',
      verdict: 'NO_VERDICT',
      offenceSequenceNumber: 2,
      offenceTitle: 'Use / install a television set without a licence'
    } as AdjournOffenceDecision,
    {
      id: 'mock-case-offence-decision-5',
      offenceId: 'offenceId6',
      decisionType: 'REFER_FOR_COURT_HEARING',
      referralReason: 'Not suitable for SJP',
      verdict: 'NO_VERDICT',
      offenceSequenceNumber: 5,
      offenceTitle: 'Use / install a television set without a licence'
    } as CourtReferralOffenceDecision,
    {
      id: 'mock-case-offence-decision-3',
      offenceId: 'offenceId7',
      decisionType: 'DISMISS',
      verdict: 'PROVED_SJP',
      offenceSequenceNumber: 3,
      offenceTitle: 'Use / install a television set without a licence'
    } as DismissOffenceDecision
  ]
};

export const MOCK_CASE_DECISION_WITH_FINANCIAL_IMPOSITION: CaseDecision = {
  id: 'mock-case-decision-1',
  session: {
    sessionId: 'mock-case-decision-session-1',
    legalAdviserUserId: 'mock-case-decision-session-userid-1',
    courtHouseCode: 'B01OK',
    courtHouseName: `Wimbledon Magistrates' Court`,
    localJusticeAreaNationalCourtCode: '2577',
    startedAt: '2018-12-01',
    endedAt: '2018-12-01',
    sessionType: 'DELEGATED_POWERS',
    legalAdviser: {
      userId: 'legal-adviser-1',
      firstName: 'Mark',
      lastName: 'Adams'
    },
    magistrate: 'Jenny'
  },
  savedAt: '2018-12-01',
  offenceDecisions: [
    {
      id: 'mock-case-offence-decision-1',
      offenceId: 'offenceId1',
      decisionType: 'WITHDRAW',
      withdrawalReasonId: '1',
      withdrawalReason: 'Insufficient evidence',
      verdict: 'NO_VERDICT',
      offenceSequenceNumber: 1,
      offenceTitle: 'Use / install a television set without a licence'
    } as WithdrawOffenceDecision,
    {
      id: 'mock-case-offence-decision-7',
      offenceId: 'offenceId7',
      decisionType: 'DISCHARGE',
      verdict: 'PROVED_SJP',
      offenceSequenceNumber: 7,
      offenceTitle: 'Use / install a television set without a licence'
    } as DischargeOffenceDecision,
    {
      id: 'mock-case-offence-decision-7',
      offenceId: 'offenceId7',
      decisionType: 'FINANCIAL_PENALTY',
      verdict: 'PROVED_SJP',
      offenceSequenceNumber: 7,
      offenceTitle: 'Use / install a television set without a licence',
      fine: 20.34
    } as FinancialPenaltyOffenceDecision
  ],
  financialImposition: {
    costsAndSurcharge: {
      costs: 120.23,
      reasonForNoCosts: 'not required',
      victimSurcharge: 123,
      collectionOrderMade: true
    },
    payment: {
      paymentType: 'PAY_TO_COURT',
      totalSum: 100.23,
      reasonWhyNotAttachedOrDeducted: 'some reason',
      reasonForDeductingFromBenefits: 'COMPENSATION_ORDERED',
      fineTransferredTo: {
        nationalCourtName: 'Magistrates',
        nationalCourtCode: '2007'
      },
      paymentTerms: {
        reserveTerms: false,
        lumpSum: {
          amount: 100.23,
          withinDays: 10,
          payByDate: '10/10/2020'
        },
        installments: {
          amount: 100.23,
          period: 'FORTNIGHTLY',
          startDate: '10/10/2020'
        }
      }
    }
  }
};

export const MOCK_ONLINE_PLEA_DETAIL: DefendantOnlinePlea = {
  pleas: [
    {
      caseId: 'caseId',
      defendantId: 'defendantId',
      submittedOn: '2019-10-18',
      onlinePleaDetails: [
        {
          id: 'onlinePleaId1',
          offenceId: 'offenceId1',
          caseId: 'caseId',
          defendantId: 'defendantId',
          plea: 'NOT_GUILTY',
          notGuiltyBecause: 'Not guilty plea1',
          offenceTitle: 'Obstruct person executing search warrant for TV receiver'
        },
        {
          id: 'onlinePleaId2',
          offenceId: 'offenceId2',
          caseId: 'caseId',
          defendantId: 'defendantId',
          plea: 'GUILTY',
          mitigation: 'Guilty plea mitigation2',
          offenceTitle: 'Use / install a television set without a licence'
        }
      ],
      personalDetails: {
        firstName: 'Seyit Ahmet Kamil',
        lastName: 'GUNGOR',
        address: {
          address1: 'Line 11',
          address2: 'Line 22',
          address3: 'Line 33',
          address4: 'Line 44',
          address5: 'Line 55',
          postcode: 'SE16 5UD'
        },
        homeTelephone: '1111111111',
        mobile: '22222222222',
        email: 'a@b.co',
        dateOfBirth: '1960-09-09',
        nationalInsuranceNumber: 'AA123456D'
      },
      pleaDetails: {
        comeToCourt: true,
        interpreterLanguage: 'turkish',
        witnessDetails: 'ter the name and add',
        unavailability: 'no days',
        speakWelsh: true,
        outstandingFines: true,
        interpreterRequired: true
      },
      employment: {
        incomePaymentFrequency: 'WEEKLY',
        incomePaymentAmount: 0.0,
        employmentStatus: 'UNEMPLOYED',
        benefitsClaimed: true,
        benefitsType: 'childcare',
        benefitsDeductPenaltyPreference: false
      },
      outgoings: {
        accommodationAmount: 1.0,
        councilTaxAmount: 2.0,
        householdBillsAmount: 3.0,
        travelExpensesAmount: 4.0,
        childMaintenanceAmount: 5.0,
        otherDescription: 'TV licence',
        otherAmount: 23.0,
        monthlyAmount: 38.0
      }
    }
  ]
};

export const MOCK_CASE_NOTES = {
  caseId: '0f03e10f-d9a5-47f9-92ba-a8e220448451',
  notes: [
    {
      noteId: '751e8907-2c67-4f02-94b7-309a39ef2030',
      noteType: 'ADJOURNMENT',
      noteText: 'Not enough documents',
      addedAt: '2019-07-04',
      authorFirstName: 'Erica',
      authorLastName: 'Wilson',
      decisionId: '009879ca-7817-42ed-b742-c782316936c7'
    },
    {
      noteId: '6614df24-d9bb-4bcd-9a3f-57c436177d67',
      noteType: 'ADJOURNMENT',
      noteText: 'Not enough documents',
      addedAt: '2019-07-02',
      authorFirstName: 'Erica',
      authorLastName: 'Wilson',
      decisionId: 'cb42e4e9-a23e-45de-8e62-a15e6ed948ac'
    }
  ]
} as CaseNotes;

export const MOCK_CASE_MANAGEMENT_NOTES = {
  caseId: '0f03e10f-d9a5-47f9-92ba-a8e220448451',
  notes: [
    {
      noteId: '751e8907-2c67-4f02-94b7-309a39ef2030',
      noteType: 'CASE_MANAGEMENT',
      noteText: 'Not enough documents',
      addedAt: '2019-07-04',
      authorFirstName: 'Erica',
      authorLastName: 'Wilson',
      decisionId: '009879ca-7817-42ed-b742-c782316936c7'
    },
    {
      noteId: '6614df24-d9bb-4bcd-9a3f-57c436177d67',
      noteType: 'CASE_MANAGEMENT',
      noteText: 'Not enough documents',
      addedAt: '2019-07-02',
      authorFirstName: 'Erica',
      authorLastName: 'Wilson',
      decisionId: 'cb42e4e9-a23e-45de-8e62-a15e6ed948ac'
    }
  ]
} as CaseNotes;
