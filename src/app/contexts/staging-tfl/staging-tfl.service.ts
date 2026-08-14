import { Injectable, inject } from '@angular/core';
import { CppHttp } from '@cpp/core';
import { Observable } from 'rxjs';
import {
  CsvFileUploadDetails,
  FileUploadStatResult,
  CsvFileUploadReport,
  DocumentUploadDetails
} from './staging-tfl.interface';
import { map } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { CsvUploadRequestParam } from './staging-tfl-param.interface';

@Injectable({
  providedIn: 'root'
})
export class StagingTflService {
  private http = inject(CppHttp);

  private readonly query = '/stagingtfl-query-api/query/api/rest/stagingtfl';
  private readonly command = '/stagingtfl-command-api/command/api/rest/staging-tfl';


  constructor() {}

  getFileUploadStats(): Observable<FileUploadStatResult> {
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

  getCsvFileUploadReport(uploadId: string): Observable<CsvFileUploadReport> {
    return this.http.query({
      url: `${this.query}/csv-files-upload/${uploadId}`,
      requestType: 'application/vnd.stagingtfl.query.charged-cases-csv-files-upload-by-id+json'
    });
  }

  getDocumentUploadDetails(): Observable<DocumentUploadDetails[]> {
    return this.http
      .query({
        url: `${this.query}/supporting-documents-upload`,
        requestType: 'application/vnd.stagingtfl.query.supporting-documents-upload+json'
      })
      .pipe(map((result: { supportingDocumentUploads: DocumentUploadDetails[] }) => result.supportingDocumentUploads));
  }

  getDocumentUploadReport(uploadId: string): Observable<DocumentUploadDetails> {
    return this.http.query({
      url: `${this.query}/supporting-documents-upload/${uploadId}`,
      requestType: 'application/vnd.stagingtfl.query.supporting-documents-upload-by-id+json'
    });
  }

  uploadDocuments(zipFile: File): Observable<void> {
    const formData = new FormData();
    formData.append('zipFile', zipFile);

    return this.http.command({
      url: `${this.command}/upload-supporting-documents/${uuid()}`,
      body: formData
    });
  }
}
