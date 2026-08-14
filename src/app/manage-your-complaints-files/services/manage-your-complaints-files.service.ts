import { Injectable, inject } from '@angular/core';
import { CppHttp } from '@cpp/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UploadCsvFileResponse } from '../models/manage-your-complaints-files';

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

  postCsvFile(file: File): Observable<UploadCsvFileResponse> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http
      .command({
        url: '/stagingprosecutorscivil-command-api/command/api/rest/stagingprosecutors-civil/complaints-files',
        body: formData
      })
      .pipe(map((response: HttpResponse<string>) => JSON.parse(response.body) as UploadCsvFileResponse));
  }
}
