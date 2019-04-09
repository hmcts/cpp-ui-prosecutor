import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { CommonModule } from '@angular/common';
import { CppHttp, HttpModule } from '@cpp/core';
import { StagingTflService } from '../staging-tfl.service';
import { CsvFileUploadDetails, CsvFileUploadStatResult, UploadStatus } from '../staging-tfl.interface';

describe('StagingTflService', () => {
  let http: CppHttp;
  let service: StagingTflService;
  let mockQuery: jest.Mock;
  let mockCommandSync: jest.Mock;

  beforeEach(() => {
    mockQuery = jest.fn();
    mockCommandSync = jest.fn();

    TestBed.configureTestingModule({
      imports: [HttpModule, CommonModule],
      providers: [
        StagingTflService,
        {
          provide: CppHttp,
          useValue: {
            query: mockQuery,
            commandSync: mockCommandSync
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
});
