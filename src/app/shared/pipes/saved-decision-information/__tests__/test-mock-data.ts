import {
  CaseDecision,
  WithdrawOffenceDecision,
  AdjournOffenceDecision,
  CourtReferralOffenceDecision
} from 'src/app/contexts/sjp';

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
      reason: 'Insufficient evidence'
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
    } as CourtReferralOffenceDecision
  ]
};
