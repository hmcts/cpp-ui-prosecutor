import { Prosecutor } from '@cpp/reference-data';
import { ReferenceDataAction } from '../actions';
import * as ReferenceDataActions from '../actions/pcf-reference-data.actions';
import {
  AlcoholLevelMethod,
  BailStatus,
  Ethnicity,
  EthnicityCode,
  Nationality,
  OffenceDateCode,
  SummonsCode
} from '../model';
import { MotReason } from '../model/reference-data-interfaces/mot-reason';
import { PoliceForce } from '../model/reference-data-interfaces/police-force';
import { VerdictType } from '../model/reference-data-interfaces/verdicts';

export interface PcfReferenceDataState {
  enthnicities?: Ethnicity[];
  observedEthnicities?: EthnicityCode[];
  nationalities?: Nationality[];
  summonsCodes?: SummonsCode[];
  remandStatuses?: BailStatus[];
  verdictTypes?: VerdictType[];
  motReasons?: MotReason[];
  offenceDateCodes?: OffenceDateCode[];
  alcoholLevelMethods?: AlcoholLevelMethod[];
  policeForces?: PoliceForce[];
  prosecutorByUserGroup?: Prosecutor;
}

const initialState: PcfReferenceDataState = {
  enthnicities: [],
  observedEthnicities: [],
  nationalities: [],
  summonsCodes: [],
  remandStatuses: [],
  verdictTypes: [],
  motReasons: [],
  offenceDateCodes: [],
  policeForces: [],
  prosecutorByUserGroup: {} as Prosecutor,
  alcoholLevelMethods: []
};

export function pcfReferencedataReducer(
  state: PcfReferenceDataState = initialState,
  action: ReferenceDataAction
): PcfReferenceDataState {
  switch (action.type) {
    case ReferenceDataActions.LOAD_ETHNICITIES_SUCCESS:
      return {
        ...state,
        enthnicities: [...action.payload]
      };

    case ReferenceDataActions.LOAD_PROSECUTOR_BY_USERGROUP_SUCCESS:
      return {
        ...state,
        prosecutorByUserGroup: { ...action.payload }
      };

    case ReferenceDataActions.LOAD_OBSERVED_ETHNICITIES_SUCCESS:
      return {
        ...state,
        observedEthnicities: [...action.payload]
      };

    case ReferenceDataActions.LOAD_NATIONALITIES_SUCCESS:
      return {
        ...state,
        nationalities: [...action.payload]
      };

    case ReferenceDataActions.LOAD_SUMMONS_CODES_SUCCESS:
      return {
        ...state,
        summonsCodes: [...action.payload]
      };

    case ReferenceDataActions.LOAD_REMAND_STATUSES_SUCCESS:
      return {
        ...state,
        remandStatuses: [...action.payload]
      };

    case ReferenceDataActions.LOAD_VERDICT_TYPES_SUCCESS:
      return {
        ...state,
        verdictTypes: [...action.payload]
      };

    case ReferenceDataActions.LOAD_MOT_REASONS_SUCCESS:
      return {
        ...state,
        motReasons: [...action.payload]
      };

    case ReferenceDataActions.LOAD_OFFENCE_DATE_CODES_SUCCESS:
      return {
        ...state,
        offenceDateCodes: [...action.payload]
      };

    case ReferenceDataActions.LOAD_ALCOHOL_LEVEL_METHODS_SUCCESS:
      return {
        ...state,
        alcoholLevelMethods: [...action.payload]
      };

    case ReferenceDataActions.LOAD_POLICE_FORCES_SUCCESS:
      return {
        ...state,
        policeForces: [...action.payload]
      };

    default:
      return state;
  }
}
