export interface BailStatus {
  id: string;
  statusCode: string;
  statusDescription: string;
  custodyTimeLimit?: string;
  seqNo?: number;
  hasConditions?: boolean;
  code?: string;
  description?: string;
}
