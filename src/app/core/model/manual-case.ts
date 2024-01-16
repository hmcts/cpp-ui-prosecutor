export interface ManualCase {
  caseId: string;
  initiationCode?: string;
  dateReceived?: string;
  trialReceiptType?: string;
  eitherWayType?: string;
  courtReceivedToCode?: string;
  courtReceivedFromCode?: string;
  classOfCase?: string;
  policeForceCode?: string;
  summonsCode?: string;
  initialHearing?: InitialHearing;
  remandStatus?: string;
  prosecutor?: ManualCaseProsecutor;
  originatingPoliceForce?: ManualCaseProsecutor;
  prosecutorCaseReference?: string;
  originatingOrganisation?: string;
  cpsOrganisation?: string;
  cpsOrganisationId?: string;
  cpsOrganisationName?: string;
  dateOfCommittal?: string;
  dateOfSending?: string;
}

export interface ManualCaseProsecutor {
  prosecutionAuthorityId: string;
  prosecutingAuthority: string;
  name?: string;
  standard?: boolean;
  appliedProsecutorCosts?: number;
  chargePostingDate?: string;
  summonsRequestReceivedDate?: string;
  address?: {
    address1?: string;
    address2?: string;
    address3?: string;
    address4?: string;
    address5?: string;
    postcode?: string;
  };
}

export interface InitialHearing {
  courtHearingLocation: string;
  hearingTypeCode: string;
  roomId?: string;
  roomName?: string;
  hearingListingDirection?: string;
  dateOfHearing: string;
  timeOfHearing: string;
  hearingDuration: string | number;
  hearingLanguage: string;
}

export interface OffenceWordingMessage {
  title: string;
  sections: Element[];
}

export interface Element {
  type: ElementType;
  label?: string;
  value?: any;
  valueTwo?: any;
  showValueTwoElement?: boolean;
  min?: number;
  max?: number;
  children?: Element[];
  list?: Element[];
}

export enum ElementType {
  Label = 'LABEL',
  Text = 'TEXT',
  List = 'LIST',
  Date = 'DATE',
  Radio = 'RADIO',
  Dropdown = 'DROPDOWN'
}
