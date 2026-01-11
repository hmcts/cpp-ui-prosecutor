import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CppHttp } from '@cpp/core';
import { OffenceWithdrawalReason } from './reference-data.interface';
import { map } from 'rxjs/operators';

import { HttpParams } from '@angular/common/http';
import { Prosecutor } from '@cpp/reference-data';

import {
  AlcoholLevelMethod,
  BailStatus,
  CaseProp,
  CustodyStatus,
  Ethnicity,
  EthnicityCode,
  Nationality,
  NonStandardProsecutor,
  OffenceDateCode,
  OrganisationDivision,
  PoliceForce,
  SummonsCode
} from '../../core';
import { MotReason } from '../../core/model/reference-data-interfaces/mot-reason';
import { VerdictType } from '../../core/model/reference-data-interfaces/verdicts';

@Injectable({ providedIn: 'root' })
export class ReferenceDataService {
  private http = inject(CppHttp);

  private readonly query = '/referencedata-query-api/query/api/rest/referencedata';


  constructor() {}

  getOffenceWithdrawalReasons(): Observable<OffenceWithdrawalReason[]> {
    return this.http
      .query({
        url: `${this.query}/offence-withdraw-request-reasons`,
        requestType: 'application/vnd.referencedata.offence-withdraw-request-reasons+json'
      })
      .pipe(
        map(
          (result: { offenceWithdrawRequestReasons: OffenceWithdrawalReason[] }) =>
            result.offenceWithdrawRequestReasons || []
        )
      );
  }

  getCaseTypes(): Observable<CaseProp[]> {
    return this.http
      .query<{ initiationTypes: CaseProp[] }>({
        url: `/referencedata-query-api/query/api/rest/referencedata/initiation-types`,
        requestType: 'application/vnd.reference-data.initiation-types+json'
      })
      .pipe(map(res => res.initiationTypes));
  }

  getSummonsCode(): Observable<SummonsCode[]> {
    return this.http
      .query<{ summonsCodes: SummonsCode[] }>({
        url: `/referencedata-query-api/query/api/rest/referencedata/summons-codes`,
        requestType: 'application/vnd.referencedata.summons-codes+json'
      })
      .pipe(map(res => res.summonsCodes));
  }

  getOffenderCode(): Observable<CaseProp[]> {
    return this.http
      .query<{ offenderCodes: CaseProp[] }>({
        url: `/referencedata-query-api/query/api/rest/referencedata/offender-codes`,
        requestType: 'application/vnd.referencedata.offender-codes+json'
      })
      .pipe(map(res => res.offenderCodes));
  }

  getObservedEthnicities(): Observable<EthnicityCode[]> {
    return this.http
      .query<{ observedEthnicities: EthnicityCode[] }>({
        url: `/referencedata-query-api/query/api/rest/referencedata/observed-ethnicities`,
        requestType: 'application/vnd.referencedata.observed-ethnicities+json'
      })
      .pipe(map(res => res.observedEthnicities));
  }

  getEthnicities(): Observable<Ethnicity[]> {
    return this.http
      .query<{ ethnicities: Ethnicity[] }>({
        url: `/referencedata-query-api/query/api/rest/referencedata/ethnicities`,
        requestType: 'application/vnd.reference-data.ethnicities+json'
      })
      .pipe(map(res => res.ethnicities));
  }

  getCustodyStatus(): Observable<CaseProp[]> {
    return this.http
      .query<{ custodyStatuses: CustodyStatus[] }>({
        url: `/referencedata-query-api/query/api/rest/referencedata/custody-statuses`,
        requestType: 'application/vnd.referencedata.custody-statuses+json'
      })
      .pipe(
        map(res =>
          res.custodyStatuses.map(({ id, statusCode: code, statusDescription: description }) => ({
            id,
            code,
            description
          }))
        )
      );
  }

  getVehicleCode(): Observable<CaseProp[]> {
    return this.http
      .query<{ vehicleCodes: CaseProp[] }>({
        url: `/referencedata-query-api/query/api/rest/referencedata/vehicle-codes`,
        requestType: 'application/vnd.referencedata.vehicle-codes+json'
      })
      .pipe(map(res => res.vehicleCodes));
  }

  getOffenceDateCode(): Observable<OffenceDateCode[]> {
    return this.http
      .query<{ offenceDateCodes: OffenceDateCode[] }>({
        url: `/referencedata-query-api/query/api/rest/referencedata/offence-date-codes`,
        requestType: 'application/vnd.referencedata.offence-date-codes+json'
      })
      .pipe(map(res => res.offenceDateCodes));
  }

  getAlcoholLevelMethod(): Observable<AlcoholLevelMethod[]> {
    return this.http
      .query<{ alcoholLevelMethods: AlcoholLevelMethod[] }>({
        url: `/referencedata-query-api/query/api/rest/referencedata/alcohol-level-methods`,
        requestType: 'application/vnd.referencedata.alcohol-level-methods+json'
      })
      .pipe(map(res => res.alcoholLevelMethods));
  }

  getNationalities(): Observable<Nationality[]> {
    return this.http
      .query<{ countryNationality: Nationality[] }>({
        url: `/referencedata-query-api/query/api/rest/referencedata/country-nationality`,
        requestType: 'application/vnd.referencedata.query.country-nationality+json'
      })
      .pipe(map(res => res.countryNationality));
  }

  getPoliceForces(): Observable<PoliceForce[]> {
    return this.http
      .query<{ policeForces: PoliceForce[] }>({
        url: `/referencedata-query-api/query/api/rest/referencedata/police-forces`,
        requestType: 'application/vnd.referencedata.police-forces+json'
      })
      .pipe(map(res => res.policeForces));
  }

  getRemandStatuses(): Observable<BailStatus[]> {
    return this.http
      .query<{ bailStatuses: BailStatus[] }>({
        url: `/referencedata-query-api/query/api/rest/referencedata/bail-statuses`,
        requestType: 'application/vnd.referencedata.bail-statuses+json'
      })
      .pipe(map(res => res.bailStatuses));
  }

  getVerdictTypes(): Observable<VerdictType[]> {
    return this.http
      .query<{ verdictTypes: VerdictType[] }>({
        url: `/referencedata-query-api/query/api/rest/referencedata/verdict-types`,
        requestType: 'application/vnd.reference-data.verdict-types+json'
      })
      .pipe(map(res => res.verdictTypes));
  }

  getMotReasons(): Observable<MotReason[]> {
    return this.http
      .query<{ modeOfTrialReasons: MotReason[] }>({
        url: `/referencedata-query-api/query/api/rest/referencedata/mode-of-trial-reasons`,
        requestType: 'application/vnd.referencedata.mode-of-trial-reasons+json'
      })
      .pipe(map(res => res.modeOfTrialReasons));
  }

  getOrganisationsByType(organisationType: 'NPS'): Observable<OrganisationDivision[]> {
    const params = new HttpParams().append('orgType', organisationType);
    return this.http
      .query<{ organisationTypes: OrganisationDivision[] }>({
        url: `/referencedata-query-api/query/api/rest/referencedata/organisation`,
        requestType: 'application/vnd.referencedata.query.organisation.byOrgType+json',
        params
      })
      .pipe(map(({ organisationTypes }) => organisationTypes));
  }

  getProsecutorByCode(prosecutorCode: string): Observable<Prosecutor> {
    const params = new HttpParams().append('prosecutorCode', prosecutorCode);
    return this.http
      .query<{ prosecutors: Prosecutor[] }>({
        url: `/referencedata-query-api/query/api/rest/referencedata/prosecutors`,
        requestType: 'application/vnd.referencedata.query.prosecutors+json',
        params
      })
      .pipe(map(({ prosecutors }) => prosecutors[0] || ({ cpsFlag: true } as Prosecutor)));
  }

  createProsecutor({ id, ...prosecutor }: Partial<NonStandardProsecutor>): Observable<Prosecutor> {
    return this.http.commandSync({
      url: `/referencedata-command-api/command/api/rest/referencedata/non-standard-prosecutor/${id}`,
      requestType: 'application/vnd.referencedata.add-non-standard-prosecutor+json',
      body: prosecutor,
      successEvent: 'public.referencedata.event.non-standard-prosecutor-added',
      errorEvent: 'public.referencedata.event.non-standard-prosecutor-rejected'
    });
  }
}
