import { getHearingTypes as coreHearingTypes, getOrganisationUnits, PleaType } from '@cpp/reference-data';
import { createSelector } from '@ngrx/store';
import { CourtCentreWithRooms, HearingType } from '../model';
import { Option } from '../model/global/option';
import { MotReason } from '../model/reference-data-interfaces/mot-reason';
import { VerdictType } from '../model/reference-data-interfaces/verdicts';
import { State } from '../reducers';
import { getUserGroups } from '@cpp/users-groups';

export const getCourtCentres = createSelector(getOrganisationUnits, organisationUnits =>
  (organisationUnits || []).map(
    unit =>
      ({
        id: unit.id,
        name: unit.oucodeL3Name,
        oucode: unit.oucode,
        oucodeL1Code: unit.oucodeL1Code,
        courtrooms: unit.courtrooms.map(cr => ({
          id: cr.id,
          name: cr.courtroomName
        }))
      } as CourtCentreWithRooms)
  )
);

export const findCourCentres = (...oucodes: string[]) =>
  createSelector(getCourtCentres, courtCentres =>
    courtCentres.filter(courtCentre => courtCentre.oucode && oucodes.includes(courtCentre.oucode))
  );

export const getHearingTypes = createSelector(coreHearingTypes, hearingTypes =>
  hearingTypes.map(
    hearingType =>
      ({
        id: hearingType.id,
        description: hearingType.hearingDescription,
        code: hearingType.hearingCode,
        defaultDurationMin: hearingType.defaultDurationMin
      } as HearingType)
  )
);

export const getEthnicities = (state: State) => state.pcfReferenceData.enthnicities;

export const getProsecutorByUserGroup = (state: State) => state.pcfReferenceData.prosecutorByUserGroup;

export const getObservedEthnicities = (state: State) => state.pcfReferenceData.observedEthnicities;

export const getNationalities = (state: State) => state.pcfReferenceData.nationalities;
export const getUnknownNationality = createSelector(getNationalities, nationalities =>
  nationalities.find(nationality => nationality.nationality === 'Unknown')
);

export const getSummonsCodes = (state: State) => state.pcfReferenceData.summonsCodes;

export const getRemandStatuses = (state: State) => state.pcfReferenceData.remandStatuses;

export const getVerdictTypes = (state: State) => state.pcfReferenceData.verdictTypes;

export const getOffenceDateCodes = (state: State) => state.pcfReferenceData.offenceDateCodes;

export const getAlcoholLevelMethods = (state: State) => state.pcfReferenceData.alcoholLevelMethods;

export const getSummonTypes = createSelector(getSummonsCodes, summonsCodes =>
  summonsCodes.map(s => ({ value: s.summonsCode, label: s.summonsCodeDescription }))
);

export const getPoliceForces = (state: State) => state.pcfReferenceData.policeForces;

export const getOffenceDateCodesOptions = createSelector(getOffenceDateCodes, codes =>
  codes.map(({ dateCode, dateCodeDescription }) => ({
    value: dateCode,
    label: dateCodeDescription
  }))
);

export const getPleaTypes = (state: State) => state.referenceData.pleaStatusTypes;

export const getMotReasons = (state: State) => state.pcfReferenceData.motReasons;

export const getModeOfTrialPleaOptions = createSelector(getPleaTypes, (pleaTypes): Option[] =>
  pleaTypes
    .filter((plea: any) => plea.motPleaFlag === true)
    .sort((a, b) => a.sequence - b.sequence)
    .map(mapPleaTypeToOption)
);

export const getMagistrateVerdictOptions = createSelector(getVerdictTypes, verdictTypes =>
  verdictTypes
    .filter(verdict => verdict.jurisdiction === 'MAGISTRATES')
    .sort((a, b) => a.sequence - b.sequence)
    .map(mapVerdictTypeToOption)
);

export const getMotReasonOptions = createSelector(getMotReasons, motReasons => {
  const clonedMotreasons = Object.assign([], motReasons);
  clonedMotreasons.sort((a, b) => a.seqNum - b.seqNum);
  return clonedMotreasons.map(mapMotReasonsToOption);
});

const mapPleaTypeToOption = (pleaType: PleaType): Option => {
  return {
    label: pleaType.pleaTypeDescription,
    value: pleaType.pleaValue
  };
};

const mapVerdictTypeToOption = (verdictType: VerdictType): Option => {
  return {
    label: verdictType.description,
    value: verdictType.id
  };
};

const mapMotReasonsToOption = (motReason: MotReason): Option => {
  return {
    label: motReason.description,
    value: motReason.id
  };
};

export const getNonCpsProsecutorCodes = createSelector(getUserGroups, userGroups =>
  userGroups.reduce((codes, group) => {
    if (group.prosecutingAuthority) {
      return [...codes, group.prosecutingAuthority];
    }
    return codes;
  }, [] as string[])
);
