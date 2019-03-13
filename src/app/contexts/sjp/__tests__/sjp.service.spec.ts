import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { CommonModule } from '@angular/common';
import { CppHttp, HttpModule } from '@cpp/core';
import { SjpService } from '../sjp.service';
import { Case, CaseDetails, SearchResult } from '../sjp.interface';

describe('SjpService', () => {
  let http: CppHttp;
  let service: SjpService;
  let mockQuery: jest.Mock;

  beforeEach(() => {
    mockQuery = jest.fn();

    TestBed.configureTestingModule({
      imports: [HttpModule, CommonModule],
      providers: [
        SjpService,
        {
          provide: CppHttp,
          useValue: {
            query: mockQuery
          }
        }
      ]
    });
    http = TestBed.get(CppHttp);
    service = TestBed.get(SjpService);
  });

  describe('getCaseById', () => {
    it('should make a call', () => {
      const kase = { id: 'caseId' } as Case;
      const expected$ = cold('-b|', { b: kase });
      const response$ = cold('-a|', { a: kase });

      mockQuery.mockReturnValue(response$);

      const query$ = service.getCaseById('case-id-test');

      expect(query$).toBeObservable(expected$);

      expect(http.query).toHaveBeenCalledWith({
        url: '/sjp-query-api/query/api/rest/sjp/cases/case-id-test',
        requestType: 'application/vnd.sjp.query.case+json'
      });
    });
  });

  describe('getCasesDetails', () => {
    it('should make a call', () => {
      const result = {
        foundCasesWithOutdatedDefendantsName: true,
        results: [{ caseId: 'caseId' } as CaseDetails]
      } as SearchResult;
      const expected$ = cold('-b|', { b: result });
      const response$ = cold('-a|', { a: result });

      mockQuery.mockReturnValue(response$);

      const query$ = service.getCasesDetails('testing');

      expect(query$).toBeObservable(expected$);

      expect(http.query).toHaveBeenCalledWith({
        url: '/sjp-query-api/query/api/rest/sjp/search?q=testing',
        requestType: 'application/vnd.sjp.query.case-search-results+json'
      });
    });
  });
});
