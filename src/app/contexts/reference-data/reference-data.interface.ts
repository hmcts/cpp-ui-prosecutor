export interface OffenceWithdrawalReason {
  id: string;
  sequence: number;
  reasonCodeDescription: string;
  legalAdviser: boolean;
  prosecutor: boolean;
}

export interface DocumentTypeAccess {
  id: string;
  documentCategory: string;
}
