import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { CommonModule } from '@angular/common';
import { CaseOverviewService, CaseOverviewService } from '../case-overview.service';
import { CppHttp, HttpModule } from '@cpp/core';
import { MOCK_CASE } from './test-mock-data';

describe('Case Overview Service', () => {
  let http: CppHttp;
  let service: CaseOverviewService;
  let mockQuery: jest.Mock;

  beforeEach(() => {
    mockQuery = jest.fn();

    TestBed.configureTestingModule({
      imports: [HttpModule, CommonModule],
      providers: [
        CaseOverviewService,
        {
          provide: CppHttp,
          useValue: {
            query: mockQuery
          }
        }
      ]
    });
    http = TestBed.get(CppHttp);
    service = TestBed.get(CaseOverviewService);
  });

  describe('getCaseById', () => {
    it('should make a call', () => {
      const expected$ = cold('-b|', { b: MOCK_CASE });
      const response$ = cold('-a|', { a: MOCK_CASE });

      mockQuery.mockReturnValue(response$);

      const query$ = service.getCaseById('case-id-test');

      expect(query$).toBeObservable(expected$);

      expect(http.query).toHaveBeenCalledWith({
        url: '/sjp-query-api/query/api/rest/sjp/cases/case-id-test',
        requestType: 'application/vnd.sjp.query.case+json'
      });
    });
  });
});
