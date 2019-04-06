import { Injectable } from '@angular/core';
import { CppHttp } from '@cpp/core';
import { Observable } from 'rxjs';
import { FileUploadStatResult } from './staging-tfl.interface';

@Injectable()
export class StagingTflService {
  private readonly query = '/stagingtfl-query-api/query/api/rest/stagingtfl';

  constructor(private http: CppHttp) {}

  getFileUploadStats(): Observable<FileUploadStatResult> {
    return this.http.query({
      url: `${this.query}/uploads-status-information`,
      requestType: 'application/vnd.stagingtfl.query.uploads-status-information+json'
    });
  }
}
