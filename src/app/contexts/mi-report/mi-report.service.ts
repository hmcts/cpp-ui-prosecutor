import { Injectable, inject } from '@angular/core';
import { CppHttp } from '@cpp/core';
import { Observable } from 'rxjs';
import { CaseCountResult } from './mi-report.interface';

@Injectable({
  providedIn: 'root'
})
export class MiReportService {
  private http = inject(CppHttp);

  private readonly query = '/mireportdata-query-api/query/api/rest/mireportdata/sjp';


  constructor() {}

  getResultedCaseCount({ fromDate, toDate }): Observable<CaseCountResult> {
    return this.http.query({
      url: `${this.query}/resulted-cases-count?fromDate=${fromDate}&toDate=${toDate}`,
      requestType: 'application/vnd.mireportdata.sjp-resulted-cases-count+json'
    });
  }
}
