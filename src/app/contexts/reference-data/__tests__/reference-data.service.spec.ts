import { HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CppHttp } from '@cpp/core';
import { ProsecutionOrganisationType } from '@cpp/reference-data';
import { cold } from 'jasmine-marbles';
import { NonStandardProsecutor } from '../../../core';
import { MotReason } from '../../../core/model/reference-data-interfaces/mot-reason';
import { ReferenceDataService } from '../reference-data.service';

describe('ReferenceDataService', () => {
  let referenceData: ReferenceDataService;
  let commandSync: jest.Mock;
  let query: jest.Mock;

  beforeEach(() => {
    commandSync = jest.fn();
    query = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        ReferenceDataService,
        {
          provide: CppHttp,
          useValue: { query, commandSync }
        }
      ]
    });
    referenceData = TestBed.inject(ReferenceDataService);
  });

  describe('getOffenceWithdrawalReasons', () => {
    it('Should fetch reference data getOffenceWithdrawalReasons', () => {
      const response = { initiationTypes: [{ id: 1, code: 'C', description: 'Charge' }] };
      const expected = [];
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: expected });

      query.mockReturnValue(response$);

      const query$ = referenceData.getOffenceWithdrawalReasons();

      expect(query$).toBeObservable(expected$);
      expect(query).toHaveBeenCalledWith({
        url: '/referencedata-query-api/query/api/rest/referencedata/offence-withdraw-request-reasons',
        requestType: 'application/vnd.referencedata.offence-withdraw-request-reasons+json'
      });
    });
  });

  describe('getPoliceForces', () => {
    it('Should fetch reference data getPoliceForces', () => {
      const response = { policeForces: [] };
      const expected = [];
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: expected });

      query.mockReturnValue(response$);

      const query$ = referenceData.getPoliceForces();

      expect(query$).toBeObservable(expected$);
      expect(query).toHaveBeenCalledWith({
        url: '/referencedata-query-api/query/api/rest/referencedata/police-forces',
        requestType: 'application/vnd.referencedata.police-forces+json'
      });
    });
  });

  describe('getRemandStatuses', () => {
    it('Should fetch reference data getRemandStatuses', () => {
      const response = { bailStatuses: [] };
      const expected = [];
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: expected });

      query.mockReturnValue(response$);

      const query$ = referenceData.getRemandStatuses();

      expect(query$).toBeObservable(expected$);
      expect(query).toHaveBeenCalledWith({
        url: '/referencedata-query-api/query/api/rest/referencedata/bail-statuses',
        requestType: 'application/vnd.referencedata.bail-statuses+json'
      });
    });
  });

  describe('getCaseTypes', () => {
    it('Should fetch reference data with all the case types', () => {
      const response = { initiationTypes: [{ id: 1, code: 'C', description: 'Charge' }] };
      const expected = [{ id: 1, code: 'C', description: 'Charge' }];
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: expected });

      query.mockReturnValue(response$);

      const query$ = referenceData.getCaseTypes();

      expect(query$).toBeObservable(expected$);
      expect(query).toHaveBeenCalledWith({
        url: '/referencedata-query-api/query/api/rest/referencedata/initiation-types',
        requestType: 'application/vnd.reference-data.initiation-types+json'
      });
    });
  });

  describe('getSummonsCode', () => {
    it('Should fetch reference data with all the summon codes', () => {
      const response = {
        summonsCodes: [{ id: 1, summonsCode: 'O', summonsCodeDescription: 'Other' }]
      };
      const expected = [{ id: 1, summonsCode: 'O', summonsCodeDescription: 'Other' }];
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: expected });

      query.mockReturnValue(response$);

      const query$ = referenceData.getSummonsCode();

      expect(query$).toBeObservable(expected$);
      expect(query).toHaveBeenCalledWith({
        url: '/referencedata-query-api/query/api/rest/referencedata/summons-codes',
        requestType: 'application/vnd.referencedata.summons-codes+json'
      });
    });
  });

  describe('getOffenderCode', () => {
    it('Should fetch reference data with all the offender codes', () => {
      const response = {
        offenderCodes: [{ id: 1, code: 'PO', description: 'Persistent offender' }]
      };
      const expected = [{ id: 1, code: 'PO', description: 'Persistent offender' }];
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: expected });

      query.mockReturnValue(response$);

      const query$ = referenceData.getOffenderCode();

      expect(query$).toBeObservable(expected$);
      expect(query).toHaveBeenCalledWith({
        url: '/referencedata-query-api/query/api/rest/referencedata/offender-codes',
        requestType: 'application/vnd.referencedata.offender-codes+json'
      });
    });
  });

  describe('getObservedEthnicity', () => {
    it('Should fetch reference data with all the observed ethnicity codes', () => {
      const response = { observedEthnicities: [{ id: 1, code: 'A', description: 'Asian' }] };
      const expected = [{ id: 1, code: 'A', description: 'Asian' }];
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: expected });

      query.mockReturnValue(response$);

      const query$ = referenceData.getObservedEthnicities();

      expect(query$).toBeObservable(expected$);
      expect(query).toHaveBeenCalledWith({
        url: '/referencedata-query-api/query/api/rest/referencedata/observed-ethnicities',
        requestType: 'application/vnd.referencedata.observed-ethnicities+json'
      });
    });
  });

  describe('getSelfDefinedEthnicity', () => {
    it('Should fetch reference data with all the self ethnicity codes', () => {
      const response = { ethnicities: [{ id: 1, code: 'A', description: 'Asian' }] };
      const expected = [{ id: 1, code: 'A', description: 'Asian' }];
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: expected });

      query.mockReturnValue(response$);

      const query$ = referenceData.getEthnicities();

      expect(query$).toBeObservable(expected$);
      expect(query).toHaveBeenCalledWith({
        url: '/referencedata-query-api/query/api/rest/referencedata/ethnicities',
        requestType: 'application/vnd.reference-data.ethnicities+json'
      });
    });
  });

  describe('getCustodyStatus', () => {
    it('Should fetch reference data with all the custody codes', () => {
      const response = { custodyStatuses: [{ id: 1, statusCode: 'B', statusDescription: 'Bail' }] };
      const expected = [{ id: 1, code: 'B', description: 'Bail' }];
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: expected });

      query.mockReturnValue(response$);

      const query$ = referenceData.getCustodyStatus();

      expect(query$).toBeObservable(expected$);
      expect(query).toHaveBeenCalledWith({
        url: '/referencedata-query-api/query/api/rest/referencedata/custody-statuses',
        requestType: 'application/vnd.referencedata.custody-statuses+json'
      });
    });
  });

  describe('getVehicleCode', () => {
    it('Should fetch reference data with all the vehicle codes', () => {
      const response = { vehicleCodes: [{ id: 1, code: 'O', description: 'Other' }] };
      const expected = [{ id: 1, code: 'O', description: 'Other' }];
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: expected });

      query.mockReturnValue(response$);

      const query$ = referenceData.getVehicleCode();

      expect(query$).toBeObservable(expected$);
      expect(query).toHaveBeenCalledWith({
        url: '/referencedata-query-api/query/api/rest/referencedata/vehicle-codes',
        requestType: 'application/vnd.referencedata.vehicle-codes+json'
      });
    });
  });

  describe('getOffenceDateCode', () => {
    it('Should fetch reference data with all the offence date codes', () => {
      const response = { offenceDateCodes: [{ id: 1, dateCode: 'O', dateCodeDescription: 'On' }] };
      const expected = [{ id: 1, dateCode: 'O', dateCodeDescription: 'On' }];
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: expected });

      query.mockReturnValue(response$);

      const query$ = referenceData.getOffenceDateCode();

      expect(query$).toBeObservable(expected$);
      expect(query).toHaveBeenCalledWith({
        url: '/referencedata-query-api/query/api/rest/referencedata/offence-date-codes',
        requestType: 'application/vnd.referencedata.offence-date-codes+json'
      });
    });
  });

  describe('getAlcoholLevelMethod', () => {
    it('Should fetch reference data with all the alcohol level methods', () => {
      const response = {
        alcoholLevelMethods: [{ id: 1, methodCode: 'Blood', methodDescription: 'Blood' }]
      };
      const expected = [{ id: 1, methodCode: 'Blood', methodDescription: 'Blood' }];
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: expected });

      query.mockReturnValue(response$);

      const query$ = referenceData.getAlcoholLevelMethod();

      expect(query$).toBeObservable(expected$);
      expect(query).toHaveBeenCalledWith({
        url: '/referencedata-query-api/query/api/rest/referencedata/alcohol-level-methods',
        requestType: 'application/vnd.referencedata.alcohol-level-methods+json'
      });
    });
  });

  describe('getNationalities', () => {
    it('Should fetch reference data with all the nationalities', () => {
      const response = { countryNationality: [{ id: 1, isoCode: 'B', nationality: 'British' }] };
      const expected = [{ id: 1, isoCode: 'B', nationality: 'British' }];
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: expected });

      query.mockReturnValue(response$);

      const query$ = referenceData.getNationalities();

      expect(query$).toBeObservable(expected$);
      expect(query).toHaveBeenCalledWith({
        url: '/referencedata-query-api/query/api/rest/referencedata/country-nationality',
        requestType: 'application/vnd.referencedata.query.country-nationality+json'
      });
    });
  });

  describe('getVerdictTypes', () => {
    it('Should fetch reference data with all the verdict types', () => {
      const response = {
        verdictTypes: [{ id: 1, verdictCode: 'NOT_GUILY', description: 'Found not guilty' }]
      };
      const expected = [{ id: 1, verdictCode: 'NOT_GUILY', description: 'Found not guilty' }];
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: expected });

      query.mockReturnValue(response$);

      const query$ = referenceData.getVerdictTypes();

      expect(query$).toBeObservable(expected$);
      expect(query).toHaveBeenCalledWith({
        url: '/referencedata-query-api/query/api/rest/referencedata/verdict-types',
        requestType: 'application/vnd.reference-data.verdict-types+json'
      });
    });
  });

  describe('getMotReasons', () => {
    it('Should fetch reference data with all the mode of trial reasons', () => {
      const response: { modeOfTrialReasons: MotReason[] } = {
        modeOfTrialReasons: [
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
        ]
      };
      const expected = [
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
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: expected });

      query.mockReturnValue(response$);

      const query$ = referenceData.getMotReasons();

      expect(query$).toBeObservable(expected$);
      expect(query).toHaveBeenCalledWith({
        url: '/referencedata-query-api/query/api/rest/referencedata/mode-of-trial-reasons',
        requestType: 'application/vnd.referencedata.mode-of-trial-reasons+json'
      });
    });
  });

  describe('createProsecutor', () => {
    it('should create the prosecutor', () => {
      const prosecutor: NonStandardProsecutor = {
        id: 'id',
        address: {
          address1: 'address1',
          address2: 'address2',
          address3: 'address3',
          address4: 'address4',
          address5: 'address5',
          postcode: 'NW4 1SDD'
        },
        sequenceNumber: 1,
        contactEmailAddress: 'a@a.com',
        fullName: 'D Limited',
        prosecutorCategory: ProsecutionOrganisationType.LOCAL_AUTHORITIES
      };

      const response = { body: prosecutor };
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: response });

      commandSync.mockReturnValue(response$);
      const command$ = referenceData.createProsecutor(prosecutor);
      const { id, ...body } = prosecutor;
      expect(command$).toBeObservable(expected$);
      expect(commandSync).toHaveBeenCalledWith({
        url: `/referencedata-command-api/command/api/rest/referencedata/non-standard-prosecutor/id`,
        requestType: 'application/vnd.referencedata.add-non-standard-prosecutor+json',
        successEvent: 'public.referencedata.event.non-standard-prosecutor-added',
        errorEvent: 'public.referencedata.event.non-standard-prosecutor-rejected',
        body
      });
    });
  });

  describe('getOrganisationsByType', () => {
    it('should fetch organisations by type', () => {
      const params = new HttpParams().append('orgType', 'NPS');

      const response$ = cold('-a|', { a: { organisationTypes: [] } });
      const expected$ = cold('-b|', { b: [] });

      query.mockReturnValue(response$);

      const query$ = referenceData.getOrganisationsByType('NPS');

      expect(query$).toBeObservable(expected$);
      expect(query).toHaveBeenCalledWith({
        url: '/referencedata-query-api/query/api/rest/referencedata/organisation',
        requestType: 'application/vnd.referencedata.query.organisation.byOrgType+json',
        params
      });
    });
  });

  describe('getProsecutorByCode', () => {
    it('should prosecutor by code', () => {
      const params = new HttpParams().append('prosecutorCode', 'DVLA');

      const response$ = cold('-a|', { a: { prosecutors: [] } });
      const expected$ = cold('-b|', { b: { cpsFlag: true } });

      query.mockReturnValue(response$);

      const query$ = referenceData.getProsecutorByCode('DVLA');

      expect(query$).toBeObservable(expected$);
      expect(query).toHaveBeenCalledWith({
        url: '/referencedata-query-api/query/api/rest/referencedata/prosecutors',
        requestType: 'application/vnd.referencedata.query.prosecutors+json',
        params
      });
    });
  });
});
