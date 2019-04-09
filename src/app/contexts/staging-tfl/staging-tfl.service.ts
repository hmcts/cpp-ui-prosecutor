import { Injectable } from '@angular/core';
import { CppHttp } from '@cpp/core';
import { Observable } from 'rxjs';
import { CsvFileUploadDetails, CsvFileUploadStatResult } from './staging-tfl.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class StagingTflService {
  private readonly query = '/stagingtfl-query-api/query/api/rest/stagingtfl';

  constructor(private http: CppHttp) {}

  getFileUploadStats(): Observable<CsvFileUploadStatResult> {
    return this.http.query({
      url: `${this.query}/uploads-status-information`,
      requestType: 'application/vnd.stagingtfl.query.uploads-status-information+json'
    });
  }

  getCsvFilesUploadDetails(): Observable<CsvFileUploadDetails[]> {
    return this.http
      .query({
        url: `${this.query}/csv-files-upload`,
        requestType: 'application/vnd.stagingtfl.query.charged-cases-csv-files-uploads+json'
      })
      .pipe(map((result: { csvsFileUploads: CsvFileUploadDetails[] }) => result.csvsFileUploads));
  }
}
