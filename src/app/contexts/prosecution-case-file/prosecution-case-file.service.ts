import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ManualCaseDetailsState } from '../../core/reducers/manual-case-details';
import { CppHttp } from '@cpp/core';

@Injectable()
export class ProsecutionCaseFileService {
  constructor(private http: CppHttp) {}

  createManualCaseSJP(payload: ManualCaseDetailsState): Observable<any> {
    return this.http.commandSync({
      url: `/prosecutioncasefile-service/command/api/rest/prosecutioncasefile/initiate-sjp-prosecution`,
      requestType: 'application/vnd.prosecutioncasefile.command.initiate-sjp-prosecution+json',
      successEvent: 'public.prosecutioncasefile.manual-case-received',
      body: payload,
    });
  }
}
