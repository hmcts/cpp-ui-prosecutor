export type ApplicationLinkType = 'STANDALONE' | 'LINKED' | 'EITHER';
export type ApplicationSummonsRecipientType = 'APPLICANT' | 'RESPONDENT';
export type ApplicationSummonsTemplateType = 'BREACH' | 'GENERIC_APPLICATION' | 'GENERIC_SUMMONS';
export type ApplicationJurisdictionType = 'CROWN' | 'MAGISRATE' | 'EITHER';
export type CourtApplicationStatus = 'DRAFT' | 'UN_ALLOCATED' | 'LISTED' | 'IN_PROGRESS' | 'FINALISED' | 'EJECTED';
export type DefenceRepresentationFundingType =
  | 'REPRESENTATION_ORDER'
  | 'REPRESENTATION_ORDER_APPLIED_FOR'
  | 'PRIVATE'
  | 'COURT_APPOINTED'
  | 'PRO_BONO';
export type DriverLicenceCode = 'FULL' | 'PROVISIONAL';
export type Gender = 'MALE' | 'FEMALE' | 'NOT_KNOWN' | 'NOT_SPECIFIED';
export type JudicialRoleTypeSJP = 'LEGAL_ADVISER' | 'MAGISTRATE';
export type JurisdictionType = 'MAGISTRATES' | 'CROWN' | 'EITHER';
export enum JurisdictionCode {
  MAGISTRATES = 'B',
  CROWN = 'C'
}
export type HearingLanguage = 'ENGLISH' | 'WELSH';
export type HearingListingStatus = 'SENT_FOR_LISTING' | 'HEARING_INITIALISED' | 'HEARING_RESULTED';
export enum InitiationCode {
  sjpNotice = 'J',
  requisition = 'Q',
  summons = 'S',
  charge = 'C',
  remitted = 'R',
  other = 'O',
  sjpReferral = 'Z'
}

export type SummonsType = 'FIRST_HEARING' | 'SJP_REFERRAL' | 'BREACH' | 'YOUTH' | 'APPLICATION';
export type VehicleCode = 'LARGE_GOODS_VEHICLE' | 'PASSENGER_CARRYING_VEHICLE' | 'OTHER';

export type JudicialResultCategory = 'FINAL' | 'INTERMEDIARY' | 'ANCILLARY';
