import { Injectable } from '@angular/core';
import { CppHttp } from '@cpp/core';
import { Observable } from 'rxjs';
import { CsvFileUploadDetails, CsvFileUploadStatResult } from './staging-tfl.interface';
import { map } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { CsvUploadRequestParam } from './staging-tfl-param.interface';

@Injectable()
export class StagingTflService {
  private readonly query = '/stagingtfl-query-api/query/api/rest/stagingtfl';
  private readonly command = '/stagingtfl-command-api/command/api/rest/staging-tfl';

  constructor(private http: CppHttp) {}

  getFileUploadStats(): Observable<CsvFileUploadStatResult> {
    return this.http.query({
      url: `${this.query}/uploads-status-information`,
      requestType: 'application/vnd.stagingtfl.query.uploads-status-information+json'
    });
  }

  submitCsvFiles(csvUploadRequestParam: CsvUploadRequestParam): Observable<any> {
    const formData = new FormData();
    formData.append('headerFileReference', csvUploadRequestParam.header);
    formData.append('offenceFileReference', csvUploadRequestParam.offences);

    return this.http.command({
      url: `${this.command}/files/${uuid()}`,
      body: formData
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
