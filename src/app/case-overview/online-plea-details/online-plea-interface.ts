import {
  OnlinePlea,
  OnlinePleaDetail,
  PleaDetails,
  OnlinePleaEmployer,
  OnlinePleaPersonalDetails
} from 'src/app/contexts/sjp';

export interface OnlinePleaUi extends OnlinePlea {
  pleaDetails: PleaDetailsUi;
  onlinePleaDetails: OnlinePleaDetailUi[];
  personalDetails: OnlinePleaPersonalDetailsUi;
  employer: OnlinePleaEmployer;
}

export interface OnlinePleaPersonalDetailsUi extends OnlinePleaPersonalDetails {
  hasDriverLicense: boolean;
  hasUkDriverLicense: boolean;
}

export interface PleaDetailsUi extends PleaDetails {
  doHaveOwnWitness: boolean;
  existsUnavailability: boolean;
  deductFromEarnings: boolean;
  hasHearing: boolean;
}

export interface OnlinePleaDetailUi extends OnlinePleaDetail {
  pleasGuilty?: boolean;
}
