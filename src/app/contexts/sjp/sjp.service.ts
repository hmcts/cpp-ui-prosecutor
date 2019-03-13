import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CppHttp } from '@cpp/core';
import { Case, SearchResult } from './sjp.interface';

@Injectable()
export class SjpService {
  private readonly query = '/sjp-query-api/query/api/rest/sjp';

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
}
