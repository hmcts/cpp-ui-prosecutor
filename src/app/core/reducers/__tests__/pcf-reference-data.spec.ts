import {
  LoadAlcoholLevelMethodsSuccessAction,
  LoadEthnicitiesSuccessAction,
  LoadNationalitieSuccessAction,
  LoadObservedEthnicitiesSuccessAction,
  LoadOffenceDateCodesSuccessAction,
  LoadPoliceForcesSuccessAction,
  LoadRemandStatusesSuccess,
  LoadSummonsCodesSuccessAction,
  ReferenceDataAction
} from '../../actions';
import { LoadMotReasonsSuccess, LoadVerdictTypesSuccess } from '../../actions/pcf-reference-data.actions';
import {
  AlcoholLevelMethod,
  BailStatus,
  Ethnicity,
  EthnicityCode,
  Nationality,
  OffenceDateCode,
  PoliceForce,
  SummonsCode
} from '../../model';
import { pcfReferencedataReducer, PcfReferenceDataState } from '../pcf-reference-data';

describe('pcfReferencedataReducer', () => {
  let resultState: PcfReferenceDataState;
  let action: ReferenceDataAction;
  let state: PcfReferenceDataState;

  describe('when initialised', () => {
    beforeEach(() => {
      action = {} as ReferenceDataAction;
      resultState = pcfReferencedataReducer(undefined, action);
    });

    it('should set the default state', () => {
      expect(resultState).toMatchSnapshot();
    });
  });

  describe('when LOAD_ETHNICITIES_SUCCESS', () => {
    beforeEach(() => {
      action = new LoadEthnicitiesSuccessAction([
        {
          id: 'Id-loaded-ethnicitiy',
          code: '09',
          description: 'Afrikaan'
        }
      ] as Ethnicity[]);

      state = {
        enthnicities: [
          {
            id: 'Id-default-ethnicitiy',
            code: '08',
            description: 'British'
          }
        ] as Ethnicity[]
      };

      resultState = pcfReferencedataReducer(state, action);
    });

    it('should populate the state with ethnicties', () => {
      expect(resultState).toMatchSnapshot();
    });
  });

  describe('when LOAD_NATIONALITIES_SUCCESS', () => {
    beforeEach(() => {
      action = new LoadNationalitieSuccessAction([
        {
          isoCode: 'FR',
          countryName: 'France'
        }
      ] as Nationality[]);

      state = {
        nationalities: [
          {
            isoCode: 'GBR',
            countryName: 'United Kingdom'
          }
        ] as Nationality[]
      };

      resultState = pcfReferencedataReducer(state, action);
    });

    it('should populate the state with nationalities', () => {
      expect(resultState).toMatchSnapshot();
    });
  });

  describe('when LOAD_SUMMONS_CODES_SUCCESS', () => {
    beforeEach(() => {
      action = new LoadSummonsCodesSuccessAction([
        {
          id: '5aaecac5-222b-402d-9047-84803679edac',
          seqNo: 20,
          summonsCode: 'B',
          summonsCodeDescription: 'Breach offences',
          validFrom: '2019-03-01'
        }
      ] as SummonsCode[]);

      state = {
        summonsCodes: []
      };

      resultState = pcfReferencedataReducer(state, action);
    });

    it('should populate the state with summon codes', () => {
      expect(resultState).toMatchSnapshot();
    });
  });

  describe('when LOAD_REMAND_STATUSES_SUCCESS', () => {
    beforeEach(() => {
      action = new LoadRemandStatusesSuccess([
        {
          id: 'dd4073b6-22be-3875-9d63-5da286bb3ece',
          seqNo: 10,
          statusCode: 'B',
          statusDescription: 'Conditional Bail'
        }
      ] as BailStatus[]);

      state = {
        remandStatuses: []
      };

      resultState = pcfReferencedataReducer(state, action);
    });

    it('should populate the state with remand statuses', () => {
      expect(resultState).toMatchSnapshot();
    });
  });

  describe('when LOAD_VERDICT_TYPES_SUCCESS', () => {
    beforeEach(() => {
      action = new LoadVerdictTypesSuccess([
        {
          id: 'dd4073b6-22be-3875-9d63-5da286bb3ece',
          code: '123',
          jurisdiction: 'CROWN',
          description: 'description'
        }
      ]);

      state = {
        verdictTypes: []
      };

      resultState = pcfReferencedataReducer(state, action);
    });

    it('should populate the state with verdict types', () => {
      expect(resultState).toMatchSnapshot();
    });
  });

  describe('when LOAD_MOT_REASONS_SUCCESS', () => {
    beforeEach(() => {
      action = new LoadMotReasonsSuccess([
        {
          id: 'dd4073b6-22be-3875-9d63-5da286bb3ece',
          code: '123',
          description: 'description',
          seqNum: 10
        }
      ]);

      state = {
        motReasons: []
      };

      resultState = pcfReferencedataReducer(state, action);
    });

    it('should populate the state with mode of trial reasons', () => {
      expect(resultState).toMatchSnapshot();
    });
  });

  describe('when LOAD_OFFENCE_DATE_CODES_SUCCESS', () => {
    beforeEach(() => {
      action = new LoadOffenceDateCodesSuccessAction([
        {
          id: '4aaecac5-222b-402d-9047-84803679edac',
          dateCode: '1',
          dateCodeDescription: 'before'
        },
        {
          id: '5aaecac5-222b-402d-9047-84803679edac',
          dateCode: '2',
          dateCodeDescription: 'after'
        }
      ] as OffenceDateCode[]);

      state = {
        offenceDateCodes: []
      };

      resultState = pcfReferencedataReducer(state, action);
    });

    it('should populate the state with summon codes', () => {
      expect(resultState).toMatchSnapshot();
    });
  });

  describe('when LOAD_ALCOHOL_LEVEL_METHODS_SUCCESS', () => {
    beforeEach(() => {
      action = new LoadAlcoholLevelMethodsSuccessAction([
        {
          id: 'f833257e-e355-4c72-838b-d236db530226',
          methodCode: 'B01',
          methodDescription: 'Breath'
        },
        {
          id: 'd15a29d0-68b4-4a4f-8c46-c1316d7238eb',
          methodCode: 'B02',
          methodDescription: 'Blood'
        }
      ] as AlcoholLevelMethod[]);

      state = {
        alcoholLevelMethods: []
      };

      resultState = pcfReferencedataReducer(state, action);
    });

    it('should populate the state with alcohol level methods', () => {
      expect(resultState).toMatchSnapshot();
    });
  });

  describe('when LOAD_POLICE_FORCES_SUCCESS', () => {
    beforeEach(() => {
      action = new LoadPoliceForcesSuccessAction([
        {
          id: '47bb2c5d-cde9-3c13-9ae3-b3f5be9177e7',
          sequence: 3,
          policeForceCode: '2',
          policeForceName: 'London',
          validForSpiOut: true
        },
        {
          id: '97c89e9d-57dc-3936-a88f-9160a4572e3a',
          sequence: 4,
          policeForceCode: '3',
          policeForceName: 'Cumbria',
          validForSpiOut: true,
          oucodeL2Code: '03'
        }
      ] as PoliceForce[]);

      state = {
        policeForces: []
      };

      resultState = pcfReferencedataReducer(state, action);
    });

    it('should populate the state with police forces methods', () => {
      expect(resultState).toMatchSnapshot();
    });
  });

  describe('when LOAD_OBSERVED_ETHNICITIES_SUCCESS', () => {
    beforeEach(() => {
      action = new LoadObservedEthnicitiesSuccessAction([
        {
          id: 'c4ca4238-a0b9-3382-8dcc-509a6f75849b',
          ethnicityCode: '1',
          ethnicityDescription: 'White - North European'
        },
        {
          id: 'c81e728d-9d4c-3f63-af06-7f89cc14862c',
          ethnicityCode: '2',
          ethnicityDescription: 'White - South European'
        }
      ] as EthnicityCode[]);

      state = {
        observedEthnicities: []
      };

      resultState = pcfReferencedataReducer(state, action);
    });

    it('should populate the state with observed ethnicities methods', () => {
      expect(resultState).toMatchSnapshot();
    });
  });
});
