import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CppHttp } from '@cpp/core';
import { Case, PleadedNotGuiltyCaseResult, SearchResult } from './sjp.interface';
import { WithdrawOffenceRequestParam } from './sjp-param.interface';

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

  getCasesDetails(searchKeyword: string): Observable<SearchResult> {
    return this.http.query({
      url: `${this.query}/search?q=${searchKeyword}`,
      requestType: 'application/vnd.sjp.query.case-search-results+json'
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
}
