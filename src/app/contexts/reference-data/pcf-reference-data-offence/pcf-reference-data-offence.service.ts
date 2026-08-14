import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { OffenceType, OffenceTypeDetails } from '../../../core/model/reference-data-interfaces/offence-type';
import { CppHttp } from '@cpp/core';
import { map } from 'rxjs/operators';

const baseUrl = '/referencedataoffences-query-api/query/api/rest/referencedataoffences/offences/';

@Injectable({
  providedIn: 'root'
})
export class PCFReferenceDataOffenceService {
  private readonly api = inject(CppHttp);


  constructor() {}

  searchOffenceTypes(query: string, limit: number, offenceDate = ''): Observable<OffenceType[]> {
    const offenceDateString = offenceDate && `&offenceDate=${offenceDate}`;

    return this.api
      .query<{ offences: OffenceType[] }>({
        url: `${baseUrl}search?q=${query}&limit=${limit}${offenceDateString}`,
        requestType: 'application/vnd.referencedataoffences.offences-search+json'
      })
      .pipe(map(res => res.offences));
  }

  getOffenceTypeById(offenceId: string): Observable<OffenceTypeDetails> {
    return this.api
      .query({
        url: `${baseUrl}${offenceId}`,
        requestType: 'application/vnd.referencedataoffences.offence+json'
      })
      .pipe(
        map((res: any) => {
          return {
            offenceId: res.offenceId,
            drugsOrAlcoholRelated: res.drugsOrAlcoholRelated,
            backDuty: res.backDuty,
            locationRequired: res.locationRequired,
            standardoffencewording: res.details.document.english.standardoffencewording,
            modeOfTrialDerived: res.modeOfTrialDerived
          };
        })
      );
  }
}
