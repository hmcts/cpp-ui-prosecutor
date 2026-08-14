import { Address, Contact, PersonEthnicity } from './';

export interface GuardianDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  address: Address;
}
export interface Person {
  id?: string;
  title?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  nationalityId: string;
  nationalityCode: string;
  nationalityDescription: string;
  additionalNationalityId: string;
  additionalNationalityCode?: string;
  additionalNationalityDescription?: string;
  disabilityStatus?: string;
  ethnicity?: PersonEthnicity;
  gender: string;
  interpreterLanguageNeeds?: string;
  documentationLanguageNeeds?: string;
  hearingLanguageNeeds?: string;
  nationalInsuranceNumber?: string;
  occupation?: string;
  occupationCode?: string;
  specificRequirements?: string;
  address: Address;
  contact: Contact;
  guardianDetails?: GuardianDetails;
  custodyEstablishmentId?: string;
}

export interface PersonName {
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth?: string;
}
