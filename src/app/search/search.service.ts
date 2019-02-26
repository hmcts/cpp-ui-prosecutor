import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CppHttp } from '@cpp/core';
import { CaseDetails } from './search.container';

@Injectable()
export class SearchService {
  constructor(private http: CppHttp) {}

  getCasesDetails(searchKeyword: string): Observable<CaseDetails[]> {
    return this.http.query({
      url: 'url_placeholder',
      requestType: 'request_type_placeholder'
    });
  }
}

export const MOCK_CASES: CaseDetails[] = [
  {
    defendantName: 'Smith Long Name',
    defendantDOB: '19 Feb 1965',
    caseReferenceNumber: 'TVL43243413213ASD',
    caseStatus: 'Completed',
    prosecutor: 'TV Licensing',
    noticeServed: '9 Jan 2019'
  },
  {
    defendantName: 'Smith Long Name',
    defendantDOB: '19 Feb 1965',
    caseReferenceNumber: 'TVL43243413213ASD',
    caseStatus: 'Completed',
    prosecutor: 'TV Licensing',
    noticeServed: '9 Jan 2019'
  },
  {
    defendantName: 'Smith Long Name',
    defendantDOB: '19 Feb 1965',
    caseReferenceNumber: 'TVL43243413213ASD',
    caseStatus: 'Completed',
    prosecutor: 'TV Licensing',
    noticeServed: '9 Jan 2019'
  }
];
