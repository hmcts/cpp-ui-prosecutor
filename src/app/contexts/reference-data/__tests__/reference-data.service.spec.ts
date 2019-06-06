import { TestBed } from '@angular/core/testing';
import { CppHttp } from '@cpp/core';
import { ReferenceDataService } from '../reference-data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { cold } from 'jasmine-marbles';

describe('ReferenceDataService', () => {
  let http: CppHttp;
  let service: ReferenceDataService;
  let mockQuery: jest.Mock;

  beforeEach(() => {
    mockQuery = jest.fn();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ReferenceDataService,
        {
          provide: CppHttp,
          useValue: {
            query: mockQuery
          }
        }
      ]
    });
    http = TestBed.get(CppHttp);
    service = TestBed.get(ReferenceDataService);
  });

  describe('getOffenceWithdrawalReasons', () => {
    it('should make a call', () => {
      const result = [];

      const expected$ = cold('-b|', { b: result });
      const response$ = cold('-a|', { a: result });

      mockQuery.mockReturnValue(response$);
      const query$ = service.getOffenceWithdrawalReasons();

      expect(query$).toBeObservable(expected$);
      expect(http.query).toHaveBeenCalledWith({
        url: '/referencedata-query-api/query/api/rest/referencedata/offence-withdraw-request-reasons',
        requestType: 'application/vnd.referencedata.offence-withdraw-request-reasons+json'
      });
    });
  });
});
