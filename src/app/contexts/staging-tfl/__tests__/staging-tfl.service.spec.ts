import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { CppHttp, provideCppCoreHttpServices } from '@cpp/core';
import { StagingTflService } from '../staging-tfl.service';
import { CsvUploadRequestParam } from '../staging-tfl-param.interface';
import uuid from 'uuid/v4';
import {
  CsvFileUploadDetails,
  CsvFileUploadReport,
  DocumentUploadDetails,
  FileUploadStatResult,
  UploadStatus
} from '../staging-tfl.interface';

describe('StagingTflService', () => {
  let http: CppHttp;
  let service: StagingTflService;
  let mockQuery: jest.Mock;
  let mockCommand: jest.Mock;
  jest.spyOn(uuid, 'v4').mockReturnValue('uuid');

  beforeEach(() => {
    mockQuery = jest.fn();
    mockCommand = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        provideCppCoreHttpServices(),
        StagingTflService,
        {
          provide: CppHttp,
          useValue: {
            query: mockQuery,
            command: mockCommand
          }
        }
      ],
      teardown: { destroyAfterEach: false }
    });

    http = TestBed.inject(CppHttp);
    service = TestBed.inject(StagingTflService);
  });

  describe('getFileUploadStats', () => {
    it('should make a call', () => {
      const fileUploadStats = {
        csvUpload: {
          errorCount: 10
        },
        documentsUpload: {
          errorCount: 10
        }
      } as FileUploadStatResult;
      const expected$ = cold('-b|', { b: fileUploadStats });
      const response$ = cold('-a|', { a: fileUploadStats });

      mockQuery.mockReturnValue(response$);

      const query$ = service.getFileUploadStats();

      expect(query$).toBeObservable(expected$);

      expect(http.query).toHaveBeenCalledWith({
        url: '/stagingtfl-query-api/query/api/rest/stagingtfl/uploads-status-information',
        requestType: 'application/vnd.stagingtfl.query.uploads-status-information+json'
      });
    });
  });

  describe('getCsvFilesUploadDetails', () => {
    it('should make a call', () => {
      const mockFileUploadDetailsResult = {
        csvsFileUploads: [
          {
            headerFilename: 'fileName.csv',
            uploadId: 'uploadId',
            uploadStatus: {
              status: 'SUCCEEDED'
            } as UploadStatus
          } as CsvFileUploadDetails
        ]
      };

      const expected$ = cold('-a|', { a: mockFileUploadDetailsResult.csvsFileUploads });
      const response$ = cold('-b|', { b: mockFileUploadDetailsResult });

      mockQuery.mockReturnValue(response$);

      const query$ = service.getCsvFilesUploadDetails();

      expect(query$).toBeObservable(expected$);

      expect(http.query).toHaveBeenCalledWith({
        url: '/stagingtfl-query-api/query/api/rest/stagingtfl/csv-files-upload',
        requestType: 'application/vnd.stagingtfl.query.charged-cases-csv-files-uploads+json'
      });
    });
  });

  describe('getCsvFileUploadReport', () => {
    it('should make a call', () => {
      const mockUploadReport = {
        uploadId: 'uploadID',
        headerFilename: 'headerFileName.csv'
      } as CsvFileUploadReport;

      const expected$ = cold('-a|', { a: mockUploadReport });
      const response$ = cold('-b|', { b: mockUploadReport });

      mockQuery.mockReturnValue(response$);

      const query$ = service.getCsvFileUploadReport('uploadId');

      expect(query$).toBeObservable(expected$);

      expect(http.query).toHaveBeenCalledWith({
        url: '/stagingtfl-query-api/query/api/rest/stagingtfl/csv-files-upload/uploadId',
        requestType: 'application/vnd.stagingtfl.query.charged-cases-csv-files-upload-by-id+json'
      });
    });
  });

  describe('submitCsvFiles', () => {
    it('should make a call', () => {
      const csvUploadRequestParam = {
        header: new File(['file1'], 'filename1', { type: 'text/html' }),
        offences: new File(['file2'], 'filename2', { type: 'text/html' })
      } as CsvUploadRequestParam;

      const expected$ = cold('-b|', { b: csvUploadRequestParam });
      const response$ = cold('-a|', { a: csvUploadRequestParam });

      mockCommand.mockReturnValue(response$);

      const command$ = service.submitCsvFiles(csvUploadRequestParam);

      const formData = new FormData();
      formData.append('headerFileReference', csvUploadRequestParam.header);
      formData.append('offenceFileReference', csvUploadRequestParam.offences);
      expect(command$).toBeObservable(expected$);

      expect(http.command).toHaveBeenCalledWith({
        url: `/stagingtfl-command-api/command/api/rest/staging-tfl/files/uuid`,
        body: formData
      });
    });
  });

  describe('uploadDocuments', () => {
    it('should make a call', () => {
      const response = { body: '*' };

      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: response });

      mockCommand.mockReturnValue(response$);

      const zipFile = new File(['file1'], 'filename1', { type: 'zip' });
      const command$ = service.uploadDocuments(zipFile);
      const formData = new FormData();
      formData.append('zipFile', zipFile);

      expect(command$).toBeObservable(expected$);

      expect(http.command).toHaveBeenCalledWith({
        url: `/stagingtfl-command-api/command/api/rest/staging-tfl/upload-supporting-documents/uuid`,
        body: formData
      });
    });
  });

  describe('getDocumentUploadDetails', () => {
    it('should make a call', () => {
      const mockFileUploadDetailsResult = {
        supportingDocumentUploads: [
          {
            zipFilename: 'fileName.zipFile',
            bundleUploadId: 'uploadId',
            uploadStatus: {
              status: 'SUCCEEDED'
            } as UploadStatus
          } as DocumentUploadDetails
        ]
      };

      const expected$ = cold('-a|', { a: mockFileUploadDetailsResult.supportingDocumentUploads });
      const response$ = cold('-b|', { b: mockFileUploadDetailsResult });

      mockQuery.mockReturnValue(response$);

      const query$ = service.getDocumentUploadDetails();

      expect(query$).toBeObservable(expected$);

      expect(http.query).toHaveBeenCalledWith({
        url: '/stagingtfl-query-api/query/api/rest/stagingtfl/supporting-documents-upload',
        requestType: 'application/vnd.stagingtfl.query.supporting-documents-upload+json'
      });
    });
  });
});
