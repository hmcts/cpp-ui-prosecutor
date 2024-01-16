export interface OffenceType {
  offenceId: string;
  cjsOffenceCode: string;
  title: string;
  legislation: string;
  modeOfTrialDerived?: string;
  pnldOffenceWording?: string;
}

export interface OffenceTypeDetails {
  offenceId: string;
  drugsOrAlcoholRelated?: string;
  backDuty?: boolean;
  locationRequired?: string;
  standardoffencewording?: string;
  modeOfTrialDerived?: string;
}

export interface OffenceCode {
  id: string;
  cjsoffencecode: string;
  title: string;
  pnldref: string;
  offencestartdate: string;
  standardoffencewording: string;
  welshstandardoffencewording: string;
  policeandcpschargingresponsibilities: string;
  timelimitforprosecutions: string;
  misCode: string;
  legislation: string;
  welshOffenceTitle: string;
  welshLegislation: string;
  libraCategoryCode: string;
  custodialIndicatorCode: string;
  dateCreated: string;
  dateOfLastUpdate: string;
  modeoftrial: string;
  modeoftrialdescription: string;
  lastModified: string;
}

export enum OffenceModeOfTrialType {
  EitherWay = 'either way',
  Trial = 'Trial'
}
