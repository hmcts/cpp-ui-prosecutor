import { Injectable } from '@angular/core';
import { CppHttp } from '@cpp/core';
import {
  Case,
  CasesMissingSjpNoticeResult,
  CaseSummary,
  DefendantDetailsUpdatesResult,
  PleadedNotGuiltyCaseResult,
  SearchResult,
  OnlinePlea,
  CaseNotes,
  Region,
} from './sjp.interface';
import { WithdrawOffenceRequestParam } from './sjp-param.interface';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class SjpService {
  private readonly query = '/sjp-query-api/query/api/rest/sjp';
  private readonly command = '/sjp-command-api/command/api/rest/sjp';

  constructor(private http: CppHttp) {}

  getCaseById(caseId: string): Observable<Case> {
    return this.http.query({
      url: `${this.query}/cases/${caseId}`,
      requestType: 'application/vnd.sjp.query.case-with-document-metadata+json'
    });
  }

  getPendingDatesToAvoid(regionId: string = null): Observable<PleadedNotGuiltyCaseResult> {
    let params = new HttpParams();
    if (regionId && regionId !== 'ALL') {
      params = params.set('regionId', regionId);
    }
    return this.http.query({
      url: `${this.query}/cases/pending-dates-to-avoid`,
      params,
      requestType: 'application/vnd.sjp.query.pending-dates-to-avoid+json'
    });
  }

  getCasesMissingSjpNoticeCount(): Observable<CasesMissingSjpNoticeResult> {
    const params = new HttpParams().set('limit', '0').set('daysSincePosting', '14');
    return this.http.query({
      url: `${this.query}/cases-missing-sjpn`,
      params,
      requestType: 'application/vnd.sjp.query.cases-missing-sjpn+json'
    });
  }

  getCasesMissingSjpNotice(): Observable<CaseSummary[]> {
    const params = new HttpParams().set('daysSincePosting', '14');
    return this.http
      .query({
        url: `${this.query}/cases-missing-sjpn`,
        params,
        requestType: 'application/vnd.sjp.query.cases-missing-sjpn+json'
      })
      .pipe(map((result: CasesMissingSjpNoticeResult) => result.cases));
  }

  getCasesDetails(searchKeyword: string): Observable<SearchResult> {
    const params = new HttpParams().set('q', searchKeyword);
    return this.http.query({
      url: `${this.query}/search`,
      params,
      requestType: 'application/vnd.sjp.query.case-search-results+json'
    });
  }

  getDefendantDetailsUpdates(limit: number, regionId: string = null): Observable<DefendantDetailsUpdatesResult> {
    let params = new HttpParams().set('limit', limit.toString());
    if (regionId && regionId !== 'ALL') {
      params = params.set('regionId', regionId);
    }
    return this.http.query({
      url: `${this.query}/defendant-details-updates`,
      params,
      requestType: 'application/vnd.sjp.query.defendant-details-updates+json'
    });
  }

  withdrawOffences(body: WithdrawOffenceRequestParam, caseId: string): Observable<any> {
    return this.http.commandSync({
      url: `${this.command}/cases/${caseId}/offences-withdrawal-requests-status`,
      body,
      requestType: 'application/vnd.sjp.set-offences-withdrawal-requests-status+json',
      successEvent: 'public.sjp.offences-withdrawal-status-set',
      errorEvent: 'public.sjp.case-update-rejected'
    });
  }

  submitDatesToAvoid(datesToAvoid: string, caseId: string, isNew: boolean): Observable<any> {
    const successEvent = isNew ? 'public.sjp.dates-to-avoid-added' : 'public.sjp.dates-to-avoid-updated';

    return this.http.commandSync({
      url: `${this.command}/cases/${caseId}/dates-to-avoid`,
      body: { datesToAvoid },
      requestType: 'application/vnd.sjp.add-dates-to-avoid+json',
      successEvent,
      errorEvent: 'public.sjp.case-update-rejected'
    });
  }

  acknowledgeDefendantDetailsUpdates(caseId: string, defendantId: string): Observable<any> {
    return this.http.commandSync({
      url: `${this.command}/cases/${caseId}/defendant/${defendantId}`,
      body: {},
      requestType: 'application/vnd.sjp.acknowledge-defendant-details-updates+json',
      successEvent: 'public.sjp.defendant-details-updates-acknowledged',
      errorEvent: []
    });
  }

  getDefendantsOnlinePlea(caseId: string, defendantId: string): Observable<OnlinePlea> {
    return this.http.query({
      url: `${this.query}/cases/${caseId}/defendants/${defendantId}/defendants-online-plea`,
      requestType: 'application/vnd.sjp.query.defendants-online-plea+json'
    });
  }

  getCaseNotes(caseId: string): Observable<CaseNotes> {
    return this.http.query({
      url: `${this.query}/cases/${caseId}/notes`,
      requestType: 'application/vnd.sjp.query.case-notes+json'
    });
  }

  getRegions(): Observable<Region[]> {
    return this.http
      .query({
        url: `${this.query}/regions`,
        requestType: 'application/vnd.sjp.query.regions+json'
      })
      .pipe(
        map((result: any) =>
          result.regions.map(region => {
            return { value: region.id, label: region.name };
          })
        )
      );
  }
}
