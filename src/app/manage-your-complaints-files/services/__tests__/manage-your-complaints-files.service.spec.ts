import { TestBed } from '@angular/core/testing';
import { CppHttp } from '@cpp/core';
import { of } from 'rxjs';
import { ManageYourComplaintsFilesService } from '../manage-your-complaints-files.service';

describe('ManageYourComplaintsFilesService', () => {
  let service: ManageYourComplaintsFilesService;
  let mockQuery: jest.Mock;

  beforeEach(() => {
    mockQuery = jest.fn();
    TestBed.configureTestingModule({
      providers: [ManageYourComplaintsFilesService, { provide: CppHttp, useValue: { query: mockQuery } }],
      teardown: { destroyAfterEach: false }
    });
    service = TestBed.inject(ManageYourComplaintsFilesService);
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
});
