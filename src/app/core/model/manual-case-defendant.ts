import { Contact } from './global';
import { Address } from './global/address';
import { ManualCaseOffence } from './manual-case-offence';
import { InitialHearing } from './manual-case';

export interface ManualCaseDefendant {
  id: string;
  individual?: IndividualDefendant;
  numPreviousConvictions?: number;
  documentationLanguage?: Language;
  hearingLanguage?: Language;
  individualAliases?: IndividualAlias[];
  organisationName?: string;
  emailAddress1?: string;
  telephoneNumberBusiness?: string;
  aliasForCorporate?: any[];
  address?: Address;
  offences?: ManualCaseOffence[];
  pncIdentifier?: string;
  asn?: string;
  appliedProsecutorCosts?: number;
  postingDate?: string;
  initialHearing?: InitialHearing;
  prosecutorDefendantReference: string;
  custodyStatus?: string;
}

export interface IndividualDefendant {
  personalInformation: PersonalInformation;
  selfDefinedInformation: SelfDefinedInformation;
  parentGuardianInformation?: any;
  custodyStatus?: string;
  bailConditions?: string;
  guardianType?: string;
  bailStatus?: string;
}

export interface PersonalInformation {
  title?: string;
  firstName?: string;
  givenName2?: string;
  lastName?: string;
  contactDetails?: Contact;
  address?: Address;
  observedEthnicity?: number;
}

export interface SelfDefinedInformation {
  dateOfBirth?: string;
  nationality?: string;
  additionalNationality?: string;
  gender?: string;
  ethnicity?: string;
}

export interface CompanyAsGuardian {
  organisationName?: string;
  companyTelephoneNumber?: string;
  address?: Address;
}

export interface IndividualAsGuardian {
  dateOfBirth?: string;
  gender?: 'NOT_SPECIFIED';
  personalInformation?: PersonalInformation;
}

export interface IndividualAlias {
  title?: string;
  firstName?: string;
  givenName2: string;
  lastName?: string;
}

export type Language = 'ENGLISH' | 'WELSH';
