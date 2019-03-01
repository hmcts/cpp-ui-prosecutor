import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CppHttp } from '@cpp/core';
import { SearchResult } from './search.interface';

@Injectable()
export class SearchService {
  private readonly query = '/sjp-query-api/query/api/rest/sjp';

  constructor(private http: CppHttp) {}

  getCasesDetails(searchKeyword: string): Observable<SearchResult> {
    return this.http.query({
      url: `${this.query}/search?q=${searchKeyword}`,
      requestType: 'application/vnd.sjp.query.case-search-results+json'
    });
  }
}
