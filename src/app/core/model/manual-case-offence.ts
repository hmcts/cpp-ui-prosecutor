import { OffenceWordingMessage } from './manual-case';

export interface ManualCaseOffence {
  offenceId: string;
  offenceCode: string;
  offenceSequenceNumber?: number;
  offenceDateCode?: number;
  offenceTitle?: string;
  offenceLegislation?: string;
  offenceWording: string;
  offenceLocation?: string;
  offenceCommittedDate?: string;
  offenceCommittedEndDate?: string;
  arrestDate?: string;
  chargeDate?: string;
  laidDate?: string;
  appliedCompensation?: number;
  backDuty?: number;
  backDutyDateFrom: string;
  backDutyDateTo: string;
  drugsOrAlcoholRelated: string;
  locationRequired?: string;
  backDutyAllowed?: boolean;
  standardOffenceWording: string;
  alcoholRelatedOffence?: AlcoholRelatedOffence;
  defendantOptions?: any[];
  dynamicParticularFormData?: OffenceWordingMessage;
  plea?: Plea;
  verdict?: Verdict;
  motReasonId?: string;
  modeOfTrialDerived: string;
  prosecutorOfferAOCP?: string;
  aocpEligible?: boolean;
  aocpStandardPenalty?: string;
}

export interface AlcoholRelatedOffence {
  alcoholLevelMethod?: string;
  alcoholLevelAmount?: number;
}
export interface Plea {
  pleaValue: string;
  pleaDate: string;
}

export interface Verdict {
  verdictType: VerdictType;
  verdictDate: string;
}

export interface VerdictType {
  id: string;
  category: string;
  categoryType: string;
}
