import { ManualCase } from './manual-case';
import { ManualCaseDefendant } from './manual-case-defendant';

export interface ManualCaseAndDocuments {
  caseDetails: ManualCase;
  defendants?: ManualCaseDefendant[];
  channel: 'MCC' | 'SPI' | 'CCPI';
}
