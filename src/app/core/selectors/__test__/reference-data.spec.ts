import { TestBed } from '@angular/core/testing';
import { OrganisationUnit, ReferenceDataActions } from '@cpp/reference-data';
import { provideStore, select, Store } from '@ngrx/store';
import {
  LoadAlcoholLevelMethodsSuccessAction,
  LoadObservedEthnicitiesSuccessAction,
  LoadOffenceDateCodesSuccessAction,
  LoadPoliceForcesSuccessAction,
  LoadRemandStatusesSuccess,
  LoadSummonsCodesSuccessAction
} from '../../actions';
import { LoadMotReasonsSuccess, LoadVerdictTypesSuccess } from '../../actions/pcf-reference-data.actions';
import { CourtCentreWithRooms, EthnicityCode } from '../../model';
import { Option } from '../../model/global/option';
import { State, reducers } from '../../reducers';
import {
  findCourCentres,
  getAlcoholLevelMethods,
  getCourtCentres,
  getEthnicities,
  getMagistrateVerdictOptions,
  getModeOfTrialPleaOptions,
  getMotReasonOptions,
  getMotReasons,
  getNationalities,
  getNonCpsProsecutorCodes,
  getObservedEthnicities,
  getOffenceDateCodes,
  getOffenceDateCodesOptions,
  getPoliceForces,
  getRemandStatuses,
  getSummonsCodes,
  getSummonTypes,
  getVerdictTypes
} from '../reference-data';

let store: Store<State>;

describe('Reference data selectors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore(reducers, { runtimeChecks: {} })]
    });

    store = TestBed.inject(Store);
  });

  describe('getEthnicities', () => {
    it('should return the ethnicities', () => {
      let result;
      store.pipe(select(getEthnicities)).subscribe(value => (result = value));
      expect(result).toEqual([]);
    });
  });

  describe('getNationalities', () => {
    it('should return the ethnicities', () => {
      let result;
      store.pipe(select(getNationalities)).subscribe(value => (result = value));
      expect(result).toEqual([]);
    });
  });

  describe('getCourtCentres', () => {
    it('should return the court centres', () => {
      expect(
        getCourtCentres.projector([
          {
            id: 'id',
            oucodeL3Name: 'oucodeL3Name',
            oucode: 'oucode',
            courtrooms: [],
            oucodeL1Code: 'B'
          }
        ] as OrganisationUnit[])
      ).toMatchSnapshot();
    });
  });

  describe('findCourCentres', () => {
    it('should return the court centres for the given ou-codes', () => {
      expect(
        findCourCentres('oucode', 'oucodeXXX').projector([
          {
            id: 'id',
            oucodeL3Name: 'oucodeL3Name',
            oucode: 'oucode',
            courtrooms: []
          }
        ] as CourtCentreWithRooms[])
      ).toMatchSnapshot();
    });
  });

  describe('getSummonsCodes', () => {
    it('should return the summons codes', () => {
      let result;
      store.pipe(select(getSummonsCodes)).subscribe(value => (result = value));

      const summons = [
        {
          id: '5aaecac5-222b-402d-9047-84803679edac',
          seqNo: 20,
          summonsCode: 'B',
          summonsCodeDescription: 'Breach offences',
          validFrom: '2019-03-01'
        }
      ];

      store.dispatch(new LoadSummonsCodesSuccessAction(summons));

      expect(result).toEqual(summons);
    });
  });

  describe('getSummonTypes', () => {
    it('should return the summon types', () => {
      let result;
      store.pipe(select(getSummonTypes)).subscribe(value => (result = value));

      const summons = [
        {
          id: '5aaecac5-222b-402d-9047-84803679edac',
          seqNo: 20,
          summonsCode: 'B',
          summonsCodeDescription: 'Breach offences',
          validFrom: '2019-03-01'
        }
      ];

      store.dispatch(new LoadSummonsCodesSuccessAction(summons));

      expect(result).toEqual([{ value: summons[0].summonsCode, label: summons[0].summonsCodeDescription }]);
    });
  });

  describe('getRemandStatuses', () => {
    it('should return the remand statuses', () => {
      let result;
      store.pipe(select(getRemandStatuses)).subscribe(value => (result = value));

      const remandStatuses = [
        {
          id: 'dd4073b6-22be-3875-9d63-5da286bb3ece',
          seqNo: 10,
          statusCode: 'B',
          statusDescription: 'Conditional Bail'
        }
      ];

      store.dispatch(new LoadRemandStatusesSuccess(remandStatuses));

      expect(result).toEqual(remandStatuses);
    });
  });

  describe('getVerdictTypes', () => {
    it('should return the verdict types', () => {
      let result;
      store.pipe(select(getVerdictTypes)).subscribe(value => (result = value));

      const verdictTypes = [
        {
          id: 'dd4073b6-22be-3875-9d63-5da286bb3ece',
          code: '123',
          jurisdiction: 'CROWN',
          description: 'description'
        }
      ];

      store.dispatch(new LoadVerdictTypesSuccess(verdictTypes));

      expect(result).toEqual(verdictTypes);
    });
  });

  describe('getMagistrateVerdictOptions', () => {
    it('should return the verdict type options', () => {
      let result;
      store.pipe(select(getMagistrateVerdictOptions)).subscribe(value => (result = value));

      const verdictTypes = [
        {
          id: 'b1f365c5-39a5-3c61-9097-2b19e309eb4b',
          code: '123',
          jurisdiction: 'CROWN',
          description: 'description1'
        },
        {
          id: 'dd4073b6-22be-3875-9d63-5da286bb3ece',
          code: '432',
          jurisdiction: 'MAGISTRATES',
          description: 'description2',
          sequence: 20
        },
        {
          id: 'ad3378c6-cc7a-3c53-8c32-e8a22fd56da1',
          code: '678',
          jurisdiction: 'MAGISTRATES',
          description: 'description3',
          sequence: 10
        }
      ];

      const expected = [
        {
          value: 'ad3378c6-cc7a-3c53-8c32-e8a22fd56da1',
          label: 'description3'
        },
        {
          value: 'dd4073b6-22be-3875-9d63-5da286bb3ece',
          label: 'description2'
        }
      ];

      store.dispatch(new LoadVerdictTypesSuccess(verdictTypes));

      expect(result).toEqual(expected);
    });
  });

  describe('getMotReasons', () => {
    it('should return the mode of trial reasons', () => {
      let result;
      store.pipe(select(getMotReasons)).subscribe(value => (result = value));

      const motReasons = [
        {
          id: 'fba9d881-64f3-32d9-909e-e770223212a0',
          seqNum: 10,
          code: '02',
          description: 'Indictable only (previous convictions / relevant firearms offence)'
        },
        {
          id: 'd47268e9-db2e-3aa3-827b-ba3afb7ff94a',
          seqNum: 20,
          code: '05',
          description: 'Court directs trial by jury'
        }
      ];

      store.dispatch(new LoadMotReasonsSuccess(motReasons));

      expect(result).toEqual(motReasons);
    });
  });

  describe('getMotReasonOptions', () => {
    it('should return the mode of trial reason options', () => {
      let result;
      store.pipe(select(getMotReasonOptions)).subscribe(value => (result = value));

      const motReasons = [
        {
          id: 'fba9d881-64f3-32d9-909e-e770223212a0',
          seqNum: 20,
          code: '02',
          description: 'Indictable only (previous convictions / relevant firearms offence)'
        },
        {
          id: 'd47268e9-db2e-3aa3-827b-ba3afb7ff94a',
          seqNum: 10,
          code: '05',
          description: 'Court directs trial by jury'
        }
      ];

      const expected = [
        {
          value: 'd47268e9-db2e-3aa3-827b-ba3afb7ff94a',
          label: 'Court directs trial by jury'
        },
        {
          value: 'fba9d881-64f3-32d9-909e-e770223212a0',
          label: 'Indictable only (previous convictions / relevant firearms offence)'
        }
      ];

      store.dispatch(new LoadMotReasonsSuccess(motReasons));

      expect(result).toEqual(expected);
    });
  });

  describe('getOffenceDateCodes', () => {
    it('should return the offenceDate codes', () => {
      let result;
      store.pipe(select(getOffenceDateCodes)).subscribe(value => (result = value));

      const offenceDateCodes = [
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
      ];

      store.dispatch(new LoadOffenceDateCodesSuccessAction(offenceDateCodes));

      expect(result).toEqual(offenceDateCodes);
    });
  });

  describe('getAlcoholLevelMethods', () => {
    it('should return alcohol level methods', () => {
      let result;
      store.pipe(select(getAlcoholLevelMethods)).subscribe(value => (result = value));

      const alcoholLevelMethods = [
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
      ];

      store.dispatch(new LoadAlcoholLevelMethodsSuccessAction(alcoholLevelMethods));

      expect(result).toEqual(alcoholLevelMethods);
    });
  });

  describe('getPoliceForces', () => {
    it('should return the offenceDate codes', () => {
      let result;
      store.pipe(select(getPoliceForces)).subscribe(value => (result = value));

      const policeForces = [
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
      ];

      store.dispatch(new LoadPoliceForcesSuccessAction(policeForces));

      expect(result).toEqual(policeForces);
    });
  });

  describe('getObservedEthnicities', () => {
    it('should return the observed ethnicities', () => {
      let result;
      store.pipe(select(getObservedEthnicities)).subscribe(value => (result = value));

      const observedEthnicities: EthnicityCode[] = [
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
      ];

      store.dispatch(new LoadObservedEthnicitiesSuccessAction(observedEthnicities));

      expect(result).toEqual(observedEthnicities);
    });
  });

  describe('getOffenceDateCodesOptions', () => {
    it('should return offencde data codes options', () => {
      let result;
      store.pipe(select(getOffenceDateCodesOptions)).subscribe(value => (result = value));

      const offenceDateCodes = [
        {
          id: '4aaecac5-222b-402d-9047-84803679edac',
          dateCode: '1',
          dateCodeDescription: 'before'
        }
      ];

      const expected = [
        {
          label: 'before',
          value: '1'
        }
      ];

      store.dispatch(new LoadOffenceDateCodesSuccessAction(offenceDateCodes));
      expect(result).toEqual(expected);
    });
  });

  describe('getModeOfTrialPleaOptions', () => {
    it('should return the mode of trial plea options', () => {
      const pleaTypes: any[] = [
        {
          id: 'ad3378c6-cc7a-3c53-8c32-e8a22fd56da1',
          sequence: 10,
          pleaTypeCode: 'NONE',
          pleaTypeDescription: 'No plea',
          pleaTypeGuiltyFlag: 'No',
          pleaTypeCivilFlag: 'No',
          pleaStatusCode: '3',
          pleaTypeUIFlag: true,
          pleaValue: 'NO_PLEA',
          jurisdiction: 'MAGISTRATES',
          motPleaFlag: false
        },
        {
          id: 'b1f365c5-39a5-3c61-9097-2b19e309eb4b',
          sequence: 20,
          pleaTypeCode: 'G',
          pleaTypeDescription: 'Guilty',
          pleaTypeGuiltyFlag: 'Yes',
          pleaTypeCivilFlag: 'No',
          pleaStatusCode: '1',
          pleaTypeUIFlag: true,
          pleaValue: 'GUILTY',
          jurisdiction: 'EITHER',
          motPleaFlag: true
        }
      ];

      let result: Option[];
      store.dispatch(ReferenceDataActions.loadPleaTypesSuccess({ pleaStatusTypes: pleaTypes }));

      store.select(getModeOfTrialPleaOptions).subscribe(value => (result = value));

      expect(result.length).toEqual(1);
      expect(result).toEqual(expect.arrayContaining([expect.objectContaining({ value: 'GUILTY' })]));
    });
  });

  describe('getNonCpsProsecutorCodes', () => {
    it('should return prosecutor codes from user groups', () => {
      const userGroups = [
        { id: '1', name: 'group1', prosecutingAuthority: 'PA1' },
        { id: '2', name: 'group2' }, // no prosecutingAuthority
        { id: '3', name: 'group3', prosecutingAuthority: 'PA2' }
      ] as any[];

      const result = getNonCpsProsecutorCodes.projector(userGroups);

      expect(result).toEqual(['PA1', 'PA2']);
    });

    it('should return an empty array when no prosecutingAuthority present', () => {
      const userGroups = [
        { id: '1', name: 'group1' },
        { id: '2', name: 'group2' }
      ] as any[];

      const result = getNonCpsProsecutorCodes.projector(userGroups);

      expect(result).toEqual([]);
    });
  });
});
