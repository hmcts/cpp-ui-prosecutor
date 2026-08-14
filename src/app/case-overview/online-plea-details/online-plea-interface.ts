import {
  OnlinePlea,
  OnlinePleaDetail,
  PleaDetails,
  OnlinePleaEmployer,
  OnlinePleaPersonalDetails,
  Outgoings,
  OnlinePleaEmployment,
  Address,
  EmploymentStatusType
} from '../../contexts/sjp';

export interface OnlinePleaUi extends OnlinePlea {
  pleaDetails: PleaDetailsUi;
  onlinePleaDetails: OnlinePleaDetailUi[];
  personalDetails?: OnlinePleaPersonalDetailsUi;
  onlinePleaLegalEntityDetails?: OnlinePleaLegalEntityDetails;
  employment?: OnlinePleaEmploymentUi;
  employer?: OnlinePleaEmployer;
  outgoings?: OutgoingsUi;
  aocpAccepted?: boolean;
}

export interface OnlinePleaPersonalDetailsUi extends OnlinePleaPersonalDetails {
  hasDriverLicense: boolean;
  hasUkDriverLicense: boolean;
}

export interface OnlinePleaDetailUi extends OnlinePleaDetail {
  pleasGuilty?: boolean;
}

export interface OnlinePleaPersonalDetailsUi extends OnlinePleaPersonalDetails {
  hasDriverLicense: boolean;
  hasUkDriverLicense: boolean;
}

export interface PleaDetailsUi extends PleaDetails {
  doHaveOwnWitness?: boolean;
  existsUnavailability?: boolean;
  deductFromEarnings?: boolean;
  hasHearing: boolean;
}

export interface OnlinePleaDetailUi extends OnlinePleaDetail {
  pleasGuilty?: boolean;
}

export interface OutgoingsUi extends Outgoings {
  showDetailsOfMonthlyBillings?: boolean;
}

export interface OnlinePleaEmploymentUi extends OnlinePleaEmployment {
  wantGiveIncomeBenefitDetails?: boolean;
  incomeAfterTaxType?: string;
  status: EmploymentStatusType;
  details: string;
}

export interface OnlinePleaLegalEntityDetails {
  legalEntityName: string;
  address?: Address;
  email?: string;
  homeTelephone?: string;
  mobile?: string;
  legalEntityFinancialMeans?: LegalEntityFinancialMeans;
}

export interface LegalEntityFinancialMeans {
  tradingMoreThan12Months?: boolean;
  numberOfEmployees?: number;
  grossTurnover?: number;
  netTurnover?: number;
}
