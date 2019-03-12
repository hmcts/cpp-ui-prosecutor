export interface Case {
  id: string;
  urn: string;
  enterpriseId: string;
  assigned: boolean;
  adjournedTo?: string;
  completed: boolean;
  costs: number;
  dateTimeCreated: string;
  listedInCriminalCourts: boolean;
  hearingCourtName?: string;
  hearingTime?: string;
  onlinePleaReceived: boolean;
  postingDate: string;
  reopenedInLibraReason?: string;
  reopenedDate?: string;
  prosecutingAuthority: string;
  status: string;
  caseDocuments: CaseDocument[];
  defendant: Defendant;
  datesToAvoid?: string;
  libraCaseNumber?: string; // todo check
}

export interface Defendant {
  id: string;
  interpreter: Interpreter;
  caseId: string;
  numPreviousConvictions: number;
  speakWelsh?: boolean;
  offences: Offence[];
  personalDetails: PersonalDetails;
}

export interface Offence {
  id: string;
  chargeDate: string;
  cjsCode: string;
  compensation: number;
  offenceCode: string;
  offenceSequenceNumber: number;
  prosecutionFacts?: string;
  sequenceNumber?: number; // todo check; order to display the offences
  startDate: string;
  wording: string;
  wordingWelsh?: string;
  title: string;
  titleWelsh?: string;
  legislation: string;
  legislationWelsh?: string;
  plea?: PleaseStatus;
  pleaMethod?: string;
  pleaDate?: string;

  dobChanged: boolean;
  addressChanged: boolean;
  nameChanged: boolean;
  pleaMitigation?: string;

  // todo bellow unaccounted for
  pendingWithdrawal?: boolean; // reason? {id}
  contactDetails?: ContactDetails; // todo delete
}

export type PleaseStatus = 'GUILTY' | 'GUILTY_CASE_COMPLETED' | 'GUILTY_REQUEST_HEARING' | 'NOT_GUILTY' | 'NO_PLEA';

export interface Interpreter {
  needed: boolean;
}

export interface CaseDocument {
  id: string;
  materialId: string;
  documentType: CaseDocumentType;
  documentNumber: number;
  addedAt: string;
}

export type CaseDocumentType = 'SJPN' | 'PLEA' | 'EMPLOYER_ATTACHMENT_TO_EARNINGS' | 'RESULT_ORDER';

export interface PersonalDetails {
  address: Address;
  addressChanged: boolean;
  contactDetails: ContactDetails;
  dateOfBirth?: string;
  dobChanged: boolean;
  firstName: string;
  lastName: string;
  nameChanged: boolean;
  gender: string;
  nationalInsuranceNumber?: string;
  title: string;
  outdated?: boolean; // todo unaccounted for
}

export interface ContactDetails {
  email?: string;
  home?: string;
  mobile?: string;
  niNumber?: string; // todo check unaccounted for
}

export interface Address {
  address1: string;
  address2?: string;
  address3?: string;
  address4?: string;
  address5?: string;
  postcode: string;
}

export interface SearchResult {
  foundCasesWithOutdatedDefendantsName: boolean;
  results: CaseDetails[];
}

export interface CaseDetails {
  caseId: string;
  defendant: PersonalDetails;
  assigned: boolean;
  completed: boolean;
  enterpriseId: string;
  listedInCriminalCourts: boolean;
  postingDate: string;
  prosecutingAuthority: string;
  status: string;
  urn: string;
}
