import { Prosecutor } from '@cpp/reference-data';

export interface NonStandardProsecutor {
  id?: string;
  shortName?: string;
  sequenceNumber: number;
  majorCreditorCode?: string;
  nameWelsh?: string;
  fullName: string;
  address?: {
    address1?: string;
    address2?: string;
    address3?: string;
    address4?: string;
    address5?: string;
    postcode?: string;
  };
  validFrom?: string;
  validTo?: string;
  oucode?: string;
  spiInFlag?: boolean;
  spiOutFlag?: boolean;
  policeFlag?: boolean;
  contactEmailAddress?: string;
  standard?: boolean;
  prosecutorCategory?: any;
  cpsFlag?: boolean;
}

export interface ProsecutorState {
  draftProsecutor?: NonStandardProsecutor;
  newProsecutor?: NonStandardProsecutor | Prosecutor;
}

export enum ProsecutorType {
  MANUAL_CASE = 'manual-case',
  APPLICANT = 'applicant',
  RESPONDENT = 'respondent',
  EDIT_MANUAL_CASE = 'edit-manual-case'
}
