import { Action } from '@ngrx/store';
import { Prosecutor } from '@cpp/reference-data';
import {
  AlcoholLevelMethod,
  BailStatus,
  Ethnicity,
  EthnicityCode,
  Nationality,
  OffenceDateCode,
  PoliceForce,
  SummonsCode
} from '../model';
import { MotReason } from '../model/reference-data-interfaces/mot-reason';
import { VerdictType } from '../model/reference-data-interfaces/verdicts';

export const LOAD_ETHNICITIES = 'LOAD_ETHNICITIES';
export const LOAD_ETHNICITIES_SUCCESS = 'LOAD_ETHNICITIES_SUCCESS';

export const LOAD_OBSERVED_ETHNICITIES = 'LOAD_OBSERVED_ETHNICITIES';
export const LOAD_OBSERVED_ETHNICITIES_SUCCESS = 'LOAD_OBSERVED_ETHNICITIES_SUCCESS';

export const LOAD_NATIONALITIES = 'LOAD_NATIONALITIES';
export const LOAD_NATIONALITIES_SUCCESS = 'LOAD_NATIONALITIES_SUCCESS';

export const LOAD_SUMMONS_CODES_SUCCESS = 'LOAD_SUMMONS_CODES_SUCCESS';

export const LOAD_REMAND_STATUSES_SUCCESS = 'LOAD_REMAND_STATUSES_SUCCESS';
export const LOAD_VERDICT_TYPES_SUCCESS = 'LOAD_VERDICT_TYPES_SUCCESS';
export const LOAD_MOT_REASONS_SUCCESS = 'LOAD_MOT_REASONS_SUCCESS';
export const LOAD_OFFENCE_DATE_CODES_SUCCESS = 'LOAD_OFFENCE_DATE_CODES_SUCCESS';
export const LOAD_ALCOHOL_LEVEL_METHODS_SUCCESS = 'LOAD_ALCOHOL_LEVEL_METHODS_SUCCESS';
export const LOAD_CASE_MARKERS_SUCCESS = 'LOAD_CASE_MARKERS_SUCCESS';
export const LOAD_POLICE_FORCES_SUCCESS = 'LOAD_POLICE_FORCES_SUCCESS';

export const LOAD_PROSECUTOR_BY_USERGROUP_SUCCESS = 'LOAD_PROSECUTOR_BY_USERGROUP_SUCCESS';
export class LoadEthnicitiesAction implements Action {
  readonly type = LOAD_ETHNICITIES;
}

export class LoadProsecutorByUserGroupSuccess implements Action {
  readonly type = LOAD_PROSECUTOR_BY_USERGROUP_SUCCESS;

  constructor(public payload: Prosecutor) {}
}

export class LoadEthnicitiesSuccessAction implements Action {
  readonly type = LOAD_ETHNICITIES_SUCCESS;

  constructor(public payload: Ethnicity[]) {}
}

export class LoadObservedEthnicitiesAction implements Action {
  readonly type = LOAD_OBSERVED_ETHNICITIES;
}

export class LoadObservedEthnicitiesSuccessAction implements Action {
  readonly type = LOAD_OBSERVED_ETHNICITIES_SUCCESS;

  constructor(public payload: EthnicityCode[]) {}
}

export class LoadNationalitiesAction implements Action {
  readonly type = LOAD_NATIONALITIES;
}

export class LoadNationalitieSuccessAction implements Action {
  readonly type = LOAD_NATIONALITIES_SUCCESS;

  constructor(public payload: Nationality[]) {}
}
export class LoadSummonsCodesSuccessAction implements Action {
  readonly type = LOAD_SUMMONS_CODES_SUCCESS;

  constructor(public payload: SummonsCode[]) {}
}

export class LoadRemandStatusesSuccess implements Action {
  readonly type = LOAD_REMAND_STATUSES_SUCCESS;

  constructor(public payload: BailStatus[]) {}
}

export class LoadVerdictTypesSuccess implements Action {
  readonly type = LOAD_VERDICT_TYPES_SUCCESS;

  constructor(public payload: VerdictType[]) {}
}

export class LoadMotReasonsSuccess implements Action {
  readonly type = LOAD_MOT_REASONS_SUCCESS;

  constructor(public payload: MotReason[]) {}
}

export class LoadOffenceDateCodesSuccessAction implements Action {
  readonly type = LOAD_OFFENCE_DATE_CODES_SUCCESS;

  constructor(public payload: OffenceDateCode[]) {}
}

export class LoadAlcoholLevelMethodsSuccessAction implements Action {
  readonly type = LOAD_ALCOHOL_LEVEL_METHODS_SUCCESS;

  constructor(public payload: AlcoholLevelMethod[]) {}
}
export class LoadPoliceForcesSuccessAction implements Action {
  readonly type = LOAD_POLICE_FORCES_SUCCESS;

  constructor(public payload: PoliceForce[]) {}
}

export type ReferenceDataAction =
  | LoadEthnicitiesAction
  | LoadEthnicitiesSuccessAction
  | LoadObservedEthnicitiesAction
  | LoadObservedEthnicitiesSuccessAction
  | LoadNationalitiesAction
  | LoadNationalitieSuccessAction
  | LoadSummonsCodesSuccessAction
  | LoadRemandStatusesSuccess
  | LoadVerdictTypesSuccess
  | LoadOffenceDateCodesSuccessAction
  | LoadAlcoholLevelMethodsSuccessAction
  | LoadPoliceForcesSuccessAction
  | LoadMotReasonsSuccess
  | LoadProsecutorByUserGroupSuccess;
