import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CppHttp } from '@cpp/core';
import { Case, SearchResult, WithdrawOffenceState } from './sjp.interface';

@Injectable()
export class SjpService {
  private readonly query = '/sjp-query-api/query/api/rest/sjp';
  private readonly command = '/sjp-command-api/command/api/rest/sjp';

  constructor(private http: CppHttp) {}

  getCaseById(caseId: string): Observable<Case> {
    return this.http.query({
      url: `${this.query}/cases/${caseId}`,
      requestType: 'application/vnd.sjp.query.case+json'
    });
  }

  getCasesDetails(searchKeyword: string): Observable<SearchResult> {
    return this.http.query({
      url: `${this.query}/search?q=${searchKeyword}`,
      requestType: 'application/vnd.sjp.query.case-search-results+json'
    });
  }

  withdrawOffences(offences: WithdrawOffenceState, caseId: string): Observable<any> {
    return this.http.commandSync({
      url: `${this.command}/cases/${caseId}/offences-withdrawal-requests-status`,
      body: offences,
      requestType: 'application/vnd.sjp.set-offences-withdrawal-requests-status+json',
      successEvent: 'public.sjp.offences-withdrawal-status-set',
      errorEvent: []
    });
  }
}
