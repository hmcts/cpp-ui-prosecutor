import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { CommonModule } from '@angular/common';
import { CppHttp, HttpModule } from '@cpp/core';
import { StagingTflService } from '../staging-tfl.service';
import { CsvUploadRequestParam } from '../staging-tfl-param.interface';
import { v4 as uuid } from 'uuid';
import { CsvFileUploadDetails, CsvFileUploadStatResult, UploadStatus } from '../staging-tfl.interface';

describe('StagingTflService', () => {
  let http: CppHttp;
  let service: StagingTflService;
  let mockQuery: jest.Mock;
  let mockCommand: jest.Mock;

  beforeEach(() => {
    mockQuery = jest.fn();
    mockCommand = jest.fn();

    TestBed.configureTestingModule({
      imports: [HttpModule, CommonModule],
      providers: [
        StagingTflService,
        {
          provide: CppHttp,
          useValue: {
            query: mockQuery,
            command: mockCommand
          }
        }
      ]
    });
    http = TestBed.get(CppHttp);
    service = TestBed.get(StagingTflService);
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
      } as CsvFileUploadStatResult;
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

  describe('submitCsvFiles', () => {
    it('should make a call', () => {
      const csvUploadRequestParam = {
        header: new File(['file1'], 'filename1', { type: 'text/html' }),
        offences: new File(['file2'], 'filename2', { type: 'text/html' })
      } as CsvUploadRequestParam;

      const expected$ = cold('-b|', { b: csvUploadRequestParam });
      const response$ = cold('-a|', { a: csvUploadRequestParam });

      mockCommand.mockReturnValue(response$);
      jest.spyOn(uuid, 'v4').mockReturnValue('uuid');

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
});
