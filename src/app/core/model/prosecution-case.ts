import { CheckboxOption } from '@cpp/pdk';
import {
  Address,
  AssociatedDefenceOrganisation,
  AssociatedPerson,
  NotifiedPlea,
  Organisation,
  Person,
  Plea,
  Verdict
} from './global';
import { OffenceWordingMessage } from './manual-case';
import { BailStatus, CustodyEstablishment } from './reference-data-interfaces';

export interface OffenceFacts {
  vehicleRegistration: string;
  alcoholReadingAmount: number;
  alcoholReadingMethodCode?: string;
  alcoholReadingMethodDescription?: string;
}

export interface CustodyTimeLimit {
  timeLimit: string;
  daysSpent?: number;
}

export interface Offence {
  id: string;
  modeOfTrial?: string;
  offenceDefinitionId: string;
  offenceCode: string;
  offenceTitle: string;
  offenceTitleWelsh?: string;
  offenceLegislation: string;
  offenceLegislationWelsh?: string;
  wording: string;
  wordingWelsh?: string;
  startDate: string;
  endDate: string;
  arrestDate: string;
  chargeDate: string;
  count: number;
  orderIndex: number;
  notifiedPlea: NotifiedPlea;
  offenceFacts: OffenceFacts;
  custodyTimeLimit?: CustodyTimeLimit;
  laaApplnReference?: LaaApplnReference;
  dynamicParticularFormData?: OffenceWordingMessage;
  convictionDate?: string;
  isNew?: boolean;
  modeoftrialdescription?: string;
  offenceDateCode?: number;
  reportingRestrictions?: ReportingRestriction[];
  plea?: Plea;
  verdict?: Verdict;
}

export interface ReportingRestriction {
  id: string;
  judicialResultId: string;
  label: string;
  orderedDate: string;
}

export interface ReportingRestrictionView {
  reportingRestrictionId: string;
  defendantId: string;
  hearingDay: string;
  offence: string;
  personDetails: Person;
  reportingRestriction: string;
}

export interface LaaApplnReference {
  applicationReference: string;
  statusCode: string;
  statusDate: string;
  statusDescription: string;
  statusId: string;
}

export interface PersonDefendant {
  personDetails: Person;
  policeBailConditions?: string;
  policeBailStatus?: BailStatus;
  bailStatus: any;
  custodyTimeLimit: string;
  custodialEstablishment?: CustodyEstablishment;
  perceivedBirthYear: number;
  driverNumber: string;
  arrestSummonsNumber?: string;
  employerOrganisation?: Organisation;
  employerPayrollReference?: string;
  youth?: boolean;
  aliases?: string;
}

export interface DefendantCase {
  defendantId: string;
  caseId: string;
  caseReference: string;
}

export interface LegalEntityDefendant {
  organisation: Organisation;
}

export interface MasterDefendant {
  masterDefendantId: string;
  isYouth?: boolean;
  personDefendant: PersonDefendant;
  legalEntityDefendant?: LegalEntityDefendant;
  associatedPersons?: AssociatedPerson[];
  defendantCase?: DefendantCase[];
}

export interface Defendant extends MasterDefendant {
  id: string;
  prosecutionCaseId: string;
  numberOfPreviousConvictionsCited?: number;
  prosecutionAuthorityReference?: string;
  witnessStatement?: string;
  courtProceedingsInitiated: string;
  witnessStatementWelsh?: string;
  mitigation?: string;
  mitigationWelsh?: string;
  offences?: Offence[];
  defenceOrganisation?: Organisation;
  legalAidStatus?: string;
  pncId?: string;
  aliases?: Alias[];
  associatedDefenceOrganisation?: AssociatedDefenceOrganisation;
  statementOfFacts?: string;
}

export interface DefendantWithOffenceOptions {
  defendant: Defendant;
  offenceOptions: CheckboxOption<string>[];
}
export interface Alias {
  firstName: string;
  lastName: string;
}

export interface ProsecutionCaseIdentifier {
  prosecutionAuthorityId: string;
  prosecutionAuthorityCode: string;
  prosecutionAuthorityName: string;
  caseURN?: string;
  prosecutionAuthorityReference?: string;
  oldProsecutionAuthorityCode?: string;
  address?: Address;
}

export interface ProsecutionCase {
  id: string;
  isSjp?: boolean;
  prosecutionCaseIdentifier: ProsecutionCaseIdentifier;
  originatingOrganisation: string;
  initiationCode: string;
  caseStatus?: string;
  defendants: Defendant[];
  statementOfFacts: string;
  statementOfFactsWelsh: string;
  caseMarkers: SelectedCaseMarker[];
  removalReason?: string;
  isCpsOrgVerifyError?: boolean;
  prosecutor?: {
    address?: Address;
    prosecutorCode?: string;
    prosecutorId?: string;
    prosecutorName?: string;
  };
}

export enum Usage {
  C = 'Case',
  D = 'Defendant',
  W = 'Witness',
  V = 'Victim'
}

export interface SelectedCaseMarker {
  id: string;
  markerTypeCode: string;
  markerTypeDescription: string;
  markerTypeid: string;
  sequence?: number;
  usage?: Usage;
  owner?: string;
  visibility?: boolean;
  teams?: string;
}

export interface ProsecutorCaseReference {
  caseId: string;
  caseReference: string;
}

export interface ApplicationOffencesOption {
  offenceCode: string;
  offenceName: string;
  legislation: string;
  value: string;
}

export interface ApplicationRelatedCasesOption {
  caseUrn: string;
  caseStatus: string;
  caseId: string;
  offences: ApplicationOffencesOption[];
}
