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
  caseDecisions?: CaseDecision[];
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
  reason?: string;

  dobChanged: boolean;
  addressChanged: boolean;
  nameChanged: boolean;
  pleaMitigation?: string;
  withdrawalRequestReason?: string;

  // todo bellow unaccounted for
  pendingWithdrawal?: boolean; // reason? {id}
  contactDetails?: ContactDetails; // todo delete
  outOfTime?: boolean;
  notInEffect?: boolean;
  imprisonable?: boolean;
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
  metadata: CaseDocumentMetaData;
}

export interface CaseDocumentMetaData {
  addedAt: string;
  fileName: string;
  mimeType: string;
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

interface PleadNotGuiltyCase {
  caseId: string;
  pleaEntry: string;
  firstName: string;
  lastName: string;
  address: Address;
  referenceNumber: string;
  dateOfBirth: string;
}

interface DefendantDetailsUpdate {
  firstName: string;
  lastName: string;
  defendantId: string;
  caseId: string;
  caseUrn: string;
  dateOfBirth: string;
  nameUpdated: boolean;
  dateOfBirthUpdated: boolean;
  addressUpdated: boolean;
  updatedOn: string;
}

export interface PleadedNotGuiltyCaseResult {
  cases: PleadNotGuiltyCase[];
  count: number;
}

export interface DefendantDetailsUpdatesResult {
  defendantDetailsUpdates: DefendantDetailsUpdate[];
  total: number;
}

export interface DefendantSummary {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationalInsuranceNumber: string;
  gender: string;
}

export interface CaseSummary {
  id: string;
  urn: string;
  defendant: DefendantSummary;
  prosecutingAuthority: string;
  postingDate: string;
}

export interface CasesMissingSjpNoticeResult {
  count: number;
  ids?: string[];
  cases?: CaseSummary[];
}

export interface LegalAdviser {
  userId: string;
  firstName: string;
  lastName: string;
}

export interface OffenceDecision {
  id: string;
  offenceId: string;
  offenceTitle: string;
  decisionType: string;
}

export interface WithdrawOffenceDecision extends OffenceDecision {
  reason: string;
}

export interface AdjournOffenceDecision extends OffenceDecision {
  adjournedTo: string;
}

export interface Session {
  sessionId: string;
  legalAdviserUserId: string;
  courtHouseCode: string;
  courtHouseName: string;
  localJusticeAreaNationalCourtCode: string;
  startedAt: string;
  endedAt: string;
  sessionType: string;
  legalAdviser: LegalAdviser;
}

export interface CaseDecision {
  id: string;
  session: Session;
  savedAt: string;
  offenceDecisions: OffenceDecision[];
}
