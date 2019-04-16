export interface WithdrawOffenceParam {
  offenceId: string;
  reason: string;
}

export interface WithdrawOffenceRequestParam {
  withdrawalRequestsStatus: WithdrawOffenceParam[];
}

export interface AcknowledgeDefendantDetailsUpdatesParam {
  caseId: string;
  defendantId: string;
}

