import { MiReportService } from '../mi-report.service';
import { CppHttp } from '@cpp/core';
import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { CaseCountResult } from '../mi-report.interface';

describe('MiReportService', () => {
  const QUERY = '/mireportdata-query-api/query/api/rest/mireportdata/sjp';

  let miReportService: MiReportService;
  let mockQuery: jest.Mock;

  beforeEach(() => {
    mockQuery = jest.fn();
    TestBed.configureTestingModule({
      providers: [
        MiReportService,
        {
          provide: CppHttp,
          useValue: {
            query: mockQuery
          }
        }
      ],
      teardown: { destroyAfterEach: false }
    });
    miReportService = TestBed.inject(MiReportService);
  });

  describe('getResultedCaseCount()', () => {
    it('should query resulted case count', () => {
      const response = {
        casesResultedCount: 10
      } as CaseCountResult;

      const param = { fromDate: '2019-10-01', toDate: '20190-10-10' };

      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: response });

      mockQuery.mockReturnValue(response$);

      const query$ = miReportService.getResultedCaseCount(param);

      expect(query$).toBeObservable(expected$);
      expect(mockQuery).toHaveBeenCalledWith({
        url: `${QUERY}/resulted-cases-count?fromDate=2019-10-01&toDate=20190-10-10`,
        requestType: 'application/vnd.mireportdata.sjp-resulted-cases-count+json'
      });
    });
  });
});
