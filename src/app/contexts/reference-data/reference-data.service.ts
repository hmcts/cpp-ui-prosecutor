import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CppHttp } from '@cpp/core';
import { OffenceWithdrawalReason } from './reference-data.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class ReferenceDataService {
  private readonly query = '/referencedata-query-api/query/api/rest/referencedata';

  constructor(private http: CppHttp) {}

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
}
