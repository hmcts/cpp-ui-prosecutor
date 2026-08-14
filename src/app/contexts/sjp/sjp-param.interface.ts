export interface WithdrawOffenceParam {
  offenceId: string;
  withdrawalRequestReasonId: string;
}

export interface WithdrawOffenceRequestParam {
  withdrawalRequestsStatus: WithdrawOffenceParam[];
}

export interface AcknowledgeDefendantDetailsUpdatesParam {
  caseId: string;
  defendantId: string;
}
