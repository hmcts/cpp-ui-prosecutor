import { Injectable } from '@angular/core';
import { CppHttp } from '@cpp/core';
import {
  Case,
  PleadedNotGuiltyCaseResult,
  SearchResult,
  SjpNoticeCasesCountResult,
  DefendantDetailsUpdatesResult
} from './sjp.interface';
import { WithdrawOffenceRequestParam } from './sjp-param.interface';
import { Observable } from 'rxjs';

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

  getPendingDatesToAvoid(): Observable<PleadedNotGuiltyCaseResult> {
    return this.http.query({
      url: `${this.query}/cases/pending-dates-to-avoid`,
      requestType: 'application/vnd.sjp.query.pending-dates-to-avoid+json'
    });
  }

  getCasesWithSjpNoticeCount(): Observable<SjpNoticeCasesCountResult> {
    return this.http.query({
      url: `${this.query}/cases-missing-sjpn?limit=0`,
      requestType: 'application/vnd.sjp.query.cases-missing-sjpn+json'
    });
  }

  getCasesDetails(searchKeyword: string): Observable<SearchResult> {
    return this.http.query({
      url: `${this.query}/search?q=${searchKeyword}`,
      requestType: 'application/vnd.sjp.query.case-search-results+json'
    });
  }

  getDefendantDetailsUpdates(limit: number): Observable<DefendantDetailsUpdatesResult> {
    return this.http.query({
      url: `${this.query}/defendant-details-updates?limit=${limit}`,
      requestType: 'application/vnd.sjp.query.defendant-details-updates+json'
    });
  }

  withdrawOffences(body: WithdrawOffenceRequestParam, caseId: string): Observable<any> {
    return this.http.commandSync({
      url: `${this.command}/cases/${caseId}/offences-withdrawal-requests-status`,
      body,
      requestType: 'application/vnd.sjp.set-offences-withdrawal-requests-status+json',
      successEvent: 'public.sjp.offences-withdrawal-status-set',
      errorEvent: []
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
}
