import {
  CaseDecision,
  WithdrawOffenceDecision,
  AdjournOffenceDecision,
  CourtReferralOffenceDecision,
  DismissOffenceDecision,
  ReferredToOpenCourtOffenceDecision,
  OffenceDecision,
  NoSeparatePenaltyOffenceDecision
} from '../../../../contexts/sjp';

export const MOCK_CASE_DECISION: CaseDecision = {
  id: 'mock-case-decision-1',
  session: {
    sessionId: 'mock-case-decision-session-1',
    legalAdviserUserId: 'mock-case-decision-session-userid-1',
    courtHouseCode: 'B01OK',
    courtHouseName: `Wimbledon Magistrates' Court`,
    localJusticeAreaNationalCourtCode: '2577',
    startedAt: '2018-12-01T16:10:28.259Z',
    endedAt: '2018-12-01T16:10:28.259Z',
    sessionType: 'DELEGATEDPOwERS',
    legalAdviser: {
      userId: 'legal-adviser-1',
      firstName: 'Mark',
      lastName: 'Adams'
    }
  },
  savedAt: '2018-12-01T16:10:28.259Z',
  offenceDecisions: [
    {
      id: 'mock-case-offence-decision-1',
      offenceId: 'offenceId1',
      decisionType: 'WITHDRAW',
      withdrawalReason: 'Insufficient evidence'
    } as WithdrawOffenceDecision,
    {
      id: 'mock-case-offence-decision-2',
      offenceId: 'offenceId3',
      decisionType: 'ADJOURN',
      adjournedTo: '2019-06-11'
    } as AdjournOffenceDecision,
    {
      id: 'mock-case-offence-decision-3',
      offenceId: 'offenceId6',
      decisionType: 'REFER_FOR_COURT_HEARING',
      referralReason: 'Not suitable for SJP'
    } as CourtReferralOffenceDecision,
    {
      id: 'mock-case-offence-decision-7',
      decisionType: 'DISMISS'
    } as DismissOffenceDecision
  ]
};

export const MOCK_CASE_DECISSION_WITH_LEGACY_OFFENCE_DECISION: CaseDecision = {
  id: '79bc1d15-0608-4000-9843-706452a09fc7',
  session: {
    sessionId: '9917917f-ab2e-4be6-8e89-97f864450c3e',
    legalAdviserUserId: '31ec3a16-8721-498c-8da5-f099390ee254',
    courtHouseCode: 'B01LY00',
    courtHouseName: "Lavender Hill Magistrates' Court",
    localJusticeAreaNationalCourtCode: '2577',
    startedAt: '2018-12-14T11:16:50.970Z',
    endedAt: '2018-12-14T12:10:28.259Z',
    sessionType: 'DELEGATED_POWERS',
    legalAdviser: {
      userId: '31ec3a16-8721-498c-8da5-f099390ee254',
      firstName: 'Erica',
      lastName: 'Wilson'
    }
  },
  savedAt: '2018-12-14T11:17:03.972Z',
  offenceDecisions: [
    {
      offenceId: 'c92d4210-1ce2-49dd-81c1-2542ce4edafa',
      decisionType: 'REFERRED_TO_OPEN_COURT',
      verdict: 'NO_VERDICT',
      magistratesCourt: "Lavender Hill Magistrates' Court",
      reason: 'For trial',
      referredToCourt: "South West London Magistrates' Court",
      referredToDateTime: '2018-12-15T11:16:00.000Z',
      referredToRoom: 1
    } as ReferredToOpenCourtOffenceDecision,
    {
      offenceId: 'offenceId2',
      decisionType: 'REFERRED_FOR_FUTURE_SJP_SESSION',
      verdict: 'NO_VERDICT'
    } as OffenceDecision
  ]
};

export const MOCK_NO_SEPARATE_CASE_DECISION: CaseDecision = {
  id: 'mock-case-decision-1',
  session: {
    sessionId: 'mock-case-decision-session-1',
    legalAdviserUserId: 'mock-case-decision-session-userid-1',
    courtHouseCode: 'B01OK',
    courtHouseName: `Wimbledon Magistrates' Court`,
    localJusticeAreaNationalCourtCode: '2577',
    startedAt: '2018-12-01T16:10:28.259Z',
    endedAt: '2018-12-01T16:10:28.259Z',
    sessionType: 'DELEGATED_POWERS',
    legalAdviser: {
      userId: 'legal-adviser-1',
      firstName: 'Mark',
      lastName: 'Adams'
    }
  },
  savedAt: '2018-12-01T16:10:28.259Z',
  offenceDecisions: [
    {
      id: 'mock-case-offence-decision-1',
      offenceId: 'offenceId1',
      decisionType: 'NO_SEPARATE_PENALTY',
      licenseEndorsement: false
    } as NoSeparatePenaltyOffenceDecision
  ]
};
