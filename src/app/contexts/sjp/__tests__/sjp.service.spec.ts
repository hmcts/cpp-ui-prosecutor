import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { CommonModule } from '@angular/common';
import { CppHttp, HttpModule } from '@cpp/core';
import { SjpService } from '../sjp.service';
import { Case, CaseDetails, SearchResult } from '../sjp.interface';

const MOCK_CASE_ID = 'mock-case-id';
const MOCK_WITHDRAW_STATE = {
  withdrawalRequestsStatus: [
    {
      offenceId: 'mock-offence-id',
      reason: 'mock-reason'
    }
  ]
};

describe('SjpService', () => {
  let http: CppHttp;
  let service: SjpService;
  let mockQuery: jest.Mock;
  let mockCommandSync: jest.Mock;

  beforeEach(() => {
    mockQuery = jest.fn();
    mockCommandSync = jest.fn();

    TestBed.configureTestingModule({
      imports: [HttpModule, CommonModule],
      providers: [
        SjpService,
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
        requestType: 'application/vnd.sjp.query.case-with-document-metadata+json'
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

  describe('withdrawOffences', () => {
    it('should make a call', () => {
      const response = { body: '*' };
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: response });

      mockCommandSync.mockReturnValue(response$);

      const command$ = service.withdrawOffences(MOCK_WITHDRAW_STATE, MOCK_CASE_ID);

      expect(command$).toBeObservable(expected$);

      expect(mockCommandSync).toHaveBeenCalledWith({
        url: `/sjp-command-api/command/api/rest/sjp/cases/${MOCK_CASE_ID}/offences-withdrawal-requests-status`,
        requestType: 'application/vnd.sjp.set-offences-withdrawal-requests-status+json',
        body: MOCK_WITHDRAW_STATE,
        successEvent: 'public.sjp.offences-withdrawal-status-set',
        errorEvent: []
      });
    });
  });

  describe('getCasesWithSjpNoticeCount', () => {
    it('should make a call', () => {
      const response = { body: '*' };
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: response });

      mockQuery.mockReturnValue(response$);

      const query$ = service.getCasesWithSjpNoticeCount();

      expect(query$).toBeObservable(expected$);

      expect(http.query).toHaveBeenCalledWith({
        url: '/sjp-query-api/query/api/rest/sjp/cases-missing-sjpn?limit=0',
        requestType: 'application/vnd.sjp.query.cases-missing-sjpn+json'
      });
    });
  });

  describe('getPendingDatesToAvoid', () => {
    it('should make a call', () => {
      const response = { body: '*' };
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: response });

      mockQuery.mockReturnValue(response$);

      const query$ = service.getPendingDatesToAvoid();

      expect(query$).toBeObservable(expected$);

      expect(http.query).toHaveBeenCalledWith({
        url: '/sjp-query-api/query/api/rest/sjp/cases/pending-dates-to-avoid',
        requestType: 'application/vnd.sjp.query.pending-dates-to-avoid+json'
      });
    });
  });
});
