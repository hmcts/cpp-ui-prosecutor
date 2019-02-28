export interface Case {
  id: string;
  urn: string;
  defendant: Defendant;
  dateTimeCreated: string;
  caseDocuments: any[]; // todo check schema
  prosecutingAuthority: string;
  completed: boolean;
  assigned: boolean;
  costs: number;
  postingDate: string;
  enterpriseId: string;
  onlinePleaReceived: false;
  status: string;
  listedInCriminalCourts: boolean;
}

export interface Defendant {
  id: string;
  caseId: string;
  offences: Offence[];
  interpreter?: Interpreter;
  numPreviousConvictions: number;
}

export interface Offence {
  id: string;
  offenceCode: string;
  offenceSequenceNumber: number;
  wording: string;
  cjsCode: string;
  sequenceNumber: number;
  startDate: string;
  chargeDate: string;
  compensation: number;
  personalDetails: PersonalDetails;
  dobChanged: boolean;
  addressChanged: boolean;
  nameChanged: boolean;
  contactDetails?: any; // todo check the schema
}

export interface Interpreter {
  needed: boolean;
}

export interface PersonalDetails {
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  address: Address;
}

export interface Address {
  address1: string;
  address2?: string;
  address3?: string;
  address4?: string;
  postcode: string;
}
