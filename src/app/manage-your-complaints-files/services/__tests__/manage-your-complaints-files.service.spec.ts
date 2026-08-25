import { TestBed } from '@angular/core/testing';
import { CppHttp } from '@cpp/core';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { ManageYourComplaintsFilesService } from '../manage-your-complaints-files.service';
import { ComplaintsFileStatus } from '../../models/manage-your-complaints-files';

describe('ManageYourComplaintsFilesService', () => {
  let service: ManageYourComplaintsFilesService;
  let mockQuery: jest.Mock;
  let mockCommand: jest.Mock;

  beforeEach(() => {
    mockQuery = jest.fn();
    mockCommand = jest.fn();
    TestBed.configureTestingModule({
      providers: [
        ManageYourComplaintsFilesService,
        { provide: CppHttp, useValue: { query: mockQuery, command: mockCommand } }
      ],
      teardown: { destroyAfterEach: false }
    });
    service = TestBed.inject(ManageYourComplaintsFilesService);
  });

  it('should search for a complaints file by submission reference number', done => {
    const complaintsFile = {
      id: 'dummy-id-1',
      status: ComplaintsFileStatus.PENDING,
      warnings: [],
      errors: [],
      type: 'PROSECUTION',
      receivedAt: '16 June 2026',
      filename: 'complaints-list-KM',
      username: 'Sarah Hall',
      caseErrors: [],
      defendantErrors: []
    };
    mockQuery.mockReturnValue(of(complaintsFile));

    service.searchComplaintsFiles('dummy-id-1').subscribe(result => {
      expect(mockQuery).toHaveBeenCalledWith({
        url: '/stagingprosecutorscivil-query-api/query/api/rest/stagingprosecutors-civil/submissions/dummy-id-1',
        params: new HttpParams().set('additionalInfo', true),
        requestType: 'application/vnd.stagingprosecutorscivil.submission-details+json'
      });
      expect(result).toEqual(complaintsFile);
      done();
    });
  });

  it('should fetch the csv template as a blob', done => {
    const blob = new Blob(['a,b,c'], { type: 'text/csv' });
    mockQuery.mockReturnValue(of(blob));

    service.fetchCsvTemplate().subscribe(result => {
      expect(mockQuery).toHaveBeenCalledWith({
        url: '/stagingprosecutorscivil-query-api/query/api/rest/stagingprosecutors-civil/complaints-files-template',
        requestType: 'text/csv',
        responseType: 'blob'
      });
      expect(result).toBeInstanceOf(Blob);
      done();
    });
  });

  it('should fetch the error report for a submission as a blob', done => {
    const blob = new Blob(['a,b,c'], { type: 'text/csv' });
    mockQuery.mockReturnValue(of(blob));

    service.fetchErrorReport('dummy-id-1').subscribe(result => {
      expect(mockQuery).toHaveBeenCalledWith({
        url:
          '/stagingprosecutorscivil-query-api/query/api/rest/stagingprosecutors-civil/submissions/dummy-id-1/error-report',
        requestType: 'text/csv',
        responseType: 'blob'
      });
      expect(result).toBeInstanceOf(Blob);
      done();
    });
  });

  it('should parse the JSON text body returned by the command API into an UploadCsvFileResponse', done => {
    const body = JSON.stringify({
      statusURL: 'https://replace-me.gov.uk/dummy-id-1',
      submissionId: 'dummy-id-1'
    });
    mockCommand.mockReturnValue(of(new HttpResponse({ body, status: 200 })));

    service.postCsvFile(new File(['a,b,c'], 'complaints.csv')).subscribe(result => {
      expect(result).toEqual({
        statusURL: 'https://replace-me.gov.uk/dummy-id-1',
        submissionId: 'dummy-id-1'
      });
      done();
    });
  });
});
