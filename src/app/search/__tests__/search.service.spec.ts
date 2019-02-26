import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { CommonModule } from '@angular/common';
import { MOCK_CASES, SearchService } from '../search.service';
import { CppHttp, HttpModule } from '@cpp/core';

describe('Search Service', () => {
  let http: CppHttp;
  let service: SearchService;
  let mockQuery: jest.Mock;

  beforeEach(() => {
    mockQuery = jest.fn();

    TestBed.configureTestingModule({
      imports: [HttpModule, CommonModule],
      providers: [
        SearchService,
        {
          provide: CppHttp,
          useValue: {
            query: mockQuery
          }
        }
      ]
    });
    http = TestBed.get(CppHttp);
    service = TestBed.get(SearchService);
  });

  describe('getCasesDetails', () => {
    it('should make a call', () => {
      const expected$ = cold('-b|', { b: MOCK_CASES });
      const response$ = cold('-a|', { a: MOCK_CASES });

      mockQuery.mockReturnValue(response$);

      const query$ = service.getCasesDetails('testing');

      expect(query$).toBeObservable(expected$);

      expect(http.query).toHaveBeenCalledWith({
        url: 'url_placeholder',
        requestType: 'request_type_placeholder'
      });
    });
  });
});
