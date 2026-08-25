import { Injectable, inject } from '@angular/core';
import { CppHttp } from '@cpp/core';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComplaintsFileRecord, UploadCsvFileResponse } from '../models/manage-your-complaints-files';

@Injectable({ providedIn: 'root' })
export class ManageYourComplaintsFilesService {
  private http = inject(CppHttp);

  searchComplaintsFiles(searchTerm: string): Observable<ComplaintsFileRecord> {
    return this.http.query<ComplaintsFileRecord>({
      url: `/stagingprosecutorscivil-query-api/query/api/rest/stagingprosecutors-civil/submissions/${encodeURIComponent(
        searchTerm
      )}`,
      params: new HttpParams().set('additionalInfo', true),
      requestType: 'application/vnd.stagingprosecutorscivil.submission-details+json'
    });
  }

  uploadSupportingDocument(submissionId: string, file: File): Observable<void> {
    // TODO: replace with the real supporting-documents upload endpoint once available
    return of(undefined);
  }

  fetchErrorReport(submissionId: string): Observable<Blob> {
    // TODO: dummy endpoint - replace with the real error report endpoint once available
    return this.http
      .query<Blob>({
        url: `/stagingprosecutorscivil-query-api/query/api/rest/stagingprosecutors-civil/submissions/${encodeURIComponent(
          submissionId
        )}/error-report`,
        requestType: 'text/csv',
        responseType: 'blob'
      })
      .pipe(map(response => new Blob([response], { type: response.type })));
  }

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
