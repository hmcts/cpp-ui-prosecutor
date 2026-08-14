import { Injectable, inject } from '@angular/core';
import { CppHttp } from '@cpp/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ManageYourComplaintsFilesService {
  private http = inject(CppHttp);

  fetchCsvTemplate(): Observable<Blob> {
    return this.http
      .query<Blob>({
        url: '/stagingprosecutorscivil-query-api/query/api/rest/stagingprosecutors-civil/complaints-files-template',
        requestType: 'text/csv',
        responseType: 'blob'
      })
      .pipe(map(response => new Blob([response], { type: response.type })));
  }
}
