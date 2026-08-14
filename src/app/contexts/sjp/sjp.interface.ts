export interface Case {
  id: string;
  aocpEligible?: boolean;
  aocpTotalCost?: number;
  aocpVictimSurcharge?: number;
  defendantAcceptedAocp?: boolean;
  resultedThroughAocp?: boolean;
  urn: string;
  dateTimeCreated: string;
  caseDocuments: CaseDocument[];
  prosecutingAuthority: string;
  prosecutingAuthorityName: string;
  completed: boolean;
  assigned: boolean;
  costs: number;
  postingDate: string;
  enterpriseId: string;
  onlinePleaReceived: boolean;
  status: CaseStatus;
  managedByATCM: boolean;
  listedInCriminalCourts: boolean;
  policeFlag: boolean;
  postConviction: boolean;
  setAside: boolean;
  caseDecisions?: CaseDecision[];
  datesToAvoid?: string;
  defendant?: Defendant;
  hearingCourtName?: string;
  hearingTime?: string;
  libraCaseNumber?: string;
  reopenedDate?: string;
  reopenedInLibraReason?: string;
  caseApplication?: Application;
  ccApplicationStatus?: ApplicationStatus;
  hasPotentialCase?: boolean;
  reservedAt?: string;
  reservedBy?: string;
  reservedByName?: string;
}

export interface Application {
  applicationId: string;
  parentApplicationId: string;
  applicationReference: string;
  applicationStatus: ApplicationStatus;
  typeCode: string;
  typeId: string;
  applicationType: ApplicationType;
  dateReceived: string;
  outOfTimeReason?: string;
  outOfTime?: boolean;
}

export type ApplicationStatus =
  | 'STATUTORY_DECLARATION_PENDING'
  | 'STATUTORY_DECLARATION_GRANTED'
  | 'STATUTORY_DECLARATION_REFUSED'
  | 'STATUTORY_DECLARATION_WITHDRAWN'
  | 'REOPENING_PENDING'
  | 'REOPENING_GRANTED'
  | 'REOPENING_REFUSED'
  | 'REOPENING_WITHDRAWN'
  | 'APPEAL_PENDING'
  | 'APPEAL_ALLOWED'
  | 'APPEAL_REFUSED'
  | 'APPEAL_WITHDRAWN'
  | 'APPEAL_DISMISSED'
  | 'APPEAL_ABANDONED'
  | 'APPLICATION_STATUS_NOT_KNOWN'
  | 'APPLICATION_DISMISSED_SENTENCE_VARIED';

export type CaseStatus =
  | 'ACTIVE'
  | 'APPEALED'
  | 'CLOSED'
  | 'COMPLETED'
  | 'COMPLETED_APPLICATION_PENDING'
  | 'EJECTED'
  | 'INACTIVE'
  | 'INCOMPLETE'
  | 'NO_PLEA_RECEIVED'
  | 'NO_PLEA_RECEIVED_READY_FOR_DECISION'
  | 'PLEA_RECEIVED_NOT_READY_FOR_DECISION'
  | 'PLEA_RECEIVED_READY_FOR_DECISION'
  | 'READY_FOR_REVIEW'
  | 'REFERRED_FOR_COURT_HEARING'
  | 'RELISTED'
  | 'REOPENED_IN_LIBRA'
  | 'SET_ASIDE_READY_FOR_DECISION'
  | 'SJP_REFERRAL'
  | 'WITHDRAWAL_REQUEST_READY_FOR_DECISION';

export interface Employment {
  status: EmploymentStatusType;
  details: string;
}

export interface Defendant {
  id: string;
  caseId: string;
  speakWelsh?: boolean;
  offences?: Offence[];
  interpreter?: Interpreter;
  disabilityNeeds?: DisabilityNeeds;
  personalDetails?: PersonalDetails;
  legalEntityDetails?: LegalEntityDetails;
  numPreviousConvictions: number;
  defendantDetailUpdateRequest?: DefendantDetailUpdateRequest;
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
  withdrawalRequestReasonId?: string;

  // todo bellow unaccounted for
  pendingWithdrawal?: boolean; // reason? {id}
  contactDetails?: ContactDetails; // todo delete
  outOfTime?: boolean;
  notInEffect?: boolean;
  imprisonable?: boolean;
  isNonSummaryOffence?: boolean;
}

export type DefendantDetailUpdateRequestStatusType = 'PENDING' | 'UPDATED' | 'REJECTED';
export interface DefendantDetailUpdateRequest {
  status: DefendantDetailUpdateRequestStatusType;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  legalEntityName?: string;
  address?: Address;
  nameUpdated?: boolean;
  addressUpdated?: boolean;
  dobUpdated?: boolean;
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

export type CaseDocumentType =
  | 'SJPN'
  | 'PLEA'
  | 'EMPLOYER_ATTACHMENT_TO_EARNINGS'
  | 'RESULT_ORDER'
  | 'DISQUALIFICATION_REPLY_SLIP'
  | 'CITN'
  | string;

export type EmploymentStatusType = 'EMPLOYED' | 'SELF_EMPLOYED' | 'UNEMPLOYED' | 'OTHER' | 'UNKNOWN';

export interface LegalEntityDetails {
  address: Address;
  addressChanged: boolean;
  contactDetails: ContactDetails;
  legalEntityName: string;
  legalEntityNameChanged: boolean;
}

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
  driverNumber?: string;
  title: string;
  outdated?: boolean; // todo unaccounted for
  legalEntityName?: string;
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
  address: Address;
  referenceNumber: string;
  region: string;
  dateOfBirth?: string;
  firstName?: string;
  lastName?: string;
  legalEntityName?: string;
}

interface DefendantDetailsUpdate {
  addressUpdated: boolean;
  caseId: string;
  caseUrn: string;
  prosecutingAuthority: string;
  defendantId: string;
  nameUpdated: boolean;
  region: string;
  updatedOn: string;
  dateOfBirth?: string;
  dateOfBirthUpdated?: boolean;
  firstName?: string;
  lastName?: string;
  legalEntityName?: string;
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
  dateOfBirth?: string;
  nationalInsuranceNumber?: string;
  gender?: string;
  legalEntityName?: string;
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
  offenceSequenceNumber: number;
  decisionType: string;
  verdict: VerdictType;
  excisePenalty?: number;
  backDuty?: number;
  pressRestriction?: PressRestriction;
}

export interface WithdrawOffenceDecision extends OffenceDecision {
  withdrawalReason: string;
  withdrawalReasonId: string;
}

export interface AdjournOffenceDecision extends OffenceDecision {
  adjournedTo: string;
}

export interface CourtReferralOffenceDecision extends OffenceDecision {
  referralReason: string;
}

export interface DismissOffenceDecision extends OffenceDecision {}

export interface DischargeOffenceDecision extends FinancialImpositionOffenceDecision {
  dischargeType?: DischargeType;
  dischargedFor?: DischargePeriodForm;
}

export interface FinancialPenaltyOffenceDecision extends FinancialImpositionOffenceDecision {
  fine: number;
  excisePenalty?: number;
}

export interface FinancialImpositionOffenceDecision extends OffenceDecision {
  compensation?: number;
  noCompensationReason?: string;
  guiltyPleaTakenIntoAccount: boolean;
  backDuty?: number;
  licenceEndorsement: boolean;
  penaltyPointsImposed: number;
  additionalPointsReason: string;
  disqualification: boolean;
  disqualificationType: DisqualificationType;
  disqualificationPeriod: DisqualificationPeriod;
  notionalPenaltyPoints?: number;
}

export interface NoSeparatePenaltyOffenceDecision extends OffenceDecision {
  licenseEndorsement?: boolean;
  guiltyPleaTakenIntoAccount?: boolean;
}

export interface ReferredToOpenCourtOffenceDecision extends OffenceDecision {
  referredToCourt: string;
  referredToRoom: number;
  referredToDateTime: string;
  reason: string;
  magistratesCourt: string;
}

export interface FinancialImposition {
  costsAndSurcharge?: CostsAndSurchargeParam;
  payment?: Payment;
}

export interface Payment {
  paymentType: PaymentType;
  totalSum?: number;
  reasonWhyNotAttachedOrDeducted?: string;
  reasonForDeductingFromBenefits?: ReasonForDeductingBenefits;
  paymentTerms?: PaymentTermsParam;
  fineTransferredTo?: TransferOfFine;
}

export interface TransferOfFine {
  nationalCourtCode: string;
  nationalCourtName: string;
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
  magistrate?: string;
}

export interface CaseDecision {
  id: string;
  session: Session;
  savedAt: string;
  offenceDecisions: OffenceDecision[];
  applicationDecision?: ApplicationDecision;
  financialImposition?: FinancialImposition;
}

export type VerdictType = 'PROVED_SJP' | 'FOUND_NOT_GUILTY' | 'FOUND_GUILTY' | 'NO_VERDICT';

export interface CostsAndSurchargeParam {
  costs: number;
  reasonForNoCosts?: string;
  victimSurcharge: number;
  reasonForNoVictimSurcharge?: string;
  reasonForReducedVictimSurcharge?: string;
  collectionOrderMade: boolean;
}

export interface LumpSumParam {
  amount?: number;
  withinDays?: number;
  payByDate?: string;
}

export interface InstallmentsParam {
  amount: number;
  period: InstallmentPeriod;
  startDate: string;
}

export interface PaymentTermsParam {
  reserveTerms: boolean;
  lumpSum?: LumpSumParam;
  installments?: InstallmentsParam;
}

export interface PaymentParam {
  paymentType: PaymentType;
  totalSum?: number;
  reasonWhyNotAttachedOrDeducted?: string;
  reasonForDeductingFromBenefits?: ReasonForDeductingBenefits;
}

export type InstallmentPeriod = 'WEEKLY' | 'FORTNIGHTLY' | 'MONTHLY';

export type ReasonForDeductingBenefits = 'COMPENSATION_ORDERED' | 'DEFENDANT_KNOWN_DEFAULTER' | 'DEFENDANT_REQUESTED';

export type PaymentType = 'PAY_TO_COURT' | 'ATTACH_TO_EARNINGS' | 'DEDUCT_FROM_BENEFITS';

export type DischargeType = 'ABSOLUTE' | 'CONDITIONAL';

export interface DischargePeriodForm {
  value: number;
  unit: PeriodUnit;
}

export type PeriodUnit = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';

export interface DefendantOnlinePlea {
  pleas: OnlinePlea[];
}

export interface OnlinePlea {
  caseId: string;
  defendantId: string;
  submittedOn: string;
  pleaDetails?: PleaDetails;
  onlinePleaDetails: OnlinePleaDetail[];
  personalDetails?: OnlinePleaPersonalDetails;
  employment?: OnlinePleaEmployment;
  employer?: OnlinePleaEmployer;
  outgoings?: Outgoings;
}

export interface PleaDetails {
  comeToCourt: boolean;
  interpreterLanguage: string;
  interpreterRequired: boolean;
  witnessDetails?: string;
  unavailability: string;
  speakWelsh: boolean;
  outstandingFines: boolean;
  disabilityNeeds?: DisabilityNeeds;
}

export interface DisabilityNeeds {
  needed: boolean;
  disabilityNeeds?: string;
}

export interface OnlinePleaDetail {
  id: string;
  offenceId: string;
  caseId: string;
  defendantId: string;
  plea: PleaseStatus;
  notGuiltyBecause?: string;
  mitigation?: string;
  offenceTitle: string;
}

export interface Outgoings {
  accommodationAmount?: number;
  councilTaxAmount?: number;
  householdBillsAmount?: number;
  travelExpensesAmount?: number;
  childMaintenanceAmount?: number;
  otherDescription?: string;
  otherAmount?: number;
  monthlyAmount?: number;
}

export interface OnlinePleaEmployer {
  employeeReference: string;
  name: string;
  phone: string;
  address: Address;
}

export interface OnlinePleaEmployment {
  incomePaymentFrequency?: string;
  incomePaymentAmount?: number;
  employmentStatus?: EmploymentStatusType;
  employmentStatusDetails?: string;
  benefitsClaimed?: boolean;
  benefitsType?: string;
  benefitsDeductPenaltyPreference?: boolean;
}

export interface OnlinePleaPersonalDetails {
  firstName: string;
  lastName: string;
  address: Address;
  homeTelephone: string;
  mobile: string;
  email: string;
  dateOfBirth: string;
  nationalInsuranceNumber: string;
  driverNumber?: string;
  driverLicenceDetails?: string;
}

export interface Notes {
  noteId: string;
  decisionId?: string;
  noteType: string;
  noteText: string;
  addedAt: string;
  authorFirstName: string;
  authorLastName: string;
}

export interface CaseNotes {
  caseId: string;
  notes: Notes[];
}

export type DisqualificationType = 'DISCRETIONARY' | 'POINTS' | 'OBLIGATORY';

export interface DisqualificationPeriod {
  value: number;
  unit: 'DAY' | 'MONTH' | 'YEAR';
}

export interface PressRestriction {
  requested: boolean;
  name: string;
}

export interface Region {
  label: string;
  value: string;
}

export interface ApplicationDecision {
  granted: boolean;
  rejectionReason?: string;
  outOfTime?: boolean;
  outOfTimeReason?: string;
  sessionId?: string;
  applicationType?: ApplicationType;
  previousFinalDecision?: string;
}

export type ApplicationType = 'STAT_DEC' | 'REOPENING';

export type PenaltyType = 'Excise penalty' | '';
export type PleaStatus =
  | 'GUILTY'
  | 'GUILTY_CASE_COMPLETED'
  | 'GUILTY_REQUEST_HEARING'
  | 'NOT_GUILTY'
  | 'NO_PLEA'
  | 'AOCP_PENDING';
export type PleaType =
  | 'GUILTY'
  | 'GUILTY_CASE_COMPLETED'
  | 'GUILTY_REQUEST_HEARING'
  | 'NOT_GUILTY'
  | 'NO_PLEA'
  | 'AOCP_PENDING';

export type IncomeFrequency = 'WEEKLY' | 'FORTNIGHTLY' | 'MONTHLY' | 'YEARLY';

export const FrequencyOptions: { value: IncomeFrequency; label: string }[] = [
  {
    value: 'WEEKLY',
    label: 'Weekly'
  },
  {
    value: 'FORTNIGHTLY',
    label: 'Fortnightly'
  },
  {
    value: 'MONTHLY',
    label: 'Monthly'
  },
  {
    value: 'YEARLY',
    label: 'Yearly'
  }
];
