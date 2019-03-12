export interface Case {
  id: string;
  urn: string;
  defendant?: Defendant;
  dateTimeCreated: string;
  caseDocuments: CaseDocument[];
  prosecutingAuthority: string;
  completed: boolean;
  assigned: boolean;
  costs: number;
  postingDate: string;
  enterpriseId: string;
  onlinePleaReceived: boolean;
  status: string;
  listedInCriminalCourts: boolean;
  datesToAvoid?: string;
  reopenedDate?: string;
  libraCaseNumber?: string;
  reopenedInLibraReason?: string;
  hearingCourtName?: string;
  hearingTime?: string;
}

export interface Defendant {
  id: string;
  caseId: string;
  speakWelsh?: boolean;
  offences?: Offence[];
  interpreter?: Interpreter;
  personalDetails?: PersonalDetails;
  numPreviousConvictions: number;
}

export interface Offence {
  id: string;
  offenceCode: string;
  title: string;
  legislation: string;
  offenceSequenceNumber: number;
  wording: string;
  cjsCode: string;
  sequenceNumber: number;
  startDate: string;
  chargeDate: string;
  compensation: number;
  plea?: PleaseStatus;
  pleaMethod?: string;
  pleaDate?: string;
  pleaMitigation?: string;
  pendingWithdrawal?: boolean;
  prosecutionFacts?: string;
  dobChanged?: boolean;
  addressChanged?: boolean;
  nameChanged?: boolean;
  contactDetails?: ContactDetails;
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
  title?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth: string;
  gender?: string;
  address?: Address;
  contactDetails?: ContactDetails;
  dobChanged?: boolean;
  addressChanged?: boolean;
  nameChanged?: boolean;
  outdated?: boolean;
}

export interface ContactDetails {
  email: string;
  home: string;
  mobile: string;
  niNumber: string;
}

export interface Address {
  address1: string;
  address2?: string;
  address3?: string;
  address4?: string;
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
