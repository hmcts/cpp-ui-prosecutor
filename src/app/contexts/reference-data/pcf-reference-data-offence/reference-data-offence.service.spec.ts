import { TestBed } from '@angular/core/testing';
import { PCFReferenceDataOffenceService } from '../pcf-reference-data-offence';
import { cold } from 'jasmine-marbles';
import { OffenceType, OffenceTypeDetails } from '../../../core/model/reference-data-interfaces/offence-type';
import { CppHttp } from '@cpp/core';
describe('PCFReferenceDataOffenceService', () => {
  let service: PCFReferenceDataOffenceService;
  let http: CppHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CppHttp, useValue: { query: jasmine.createSpy() } }]
    });
    http = TestBed.inject(CppHttp);
    service = TestBed.inject(PCFReferenceDataOffenceService);
  });

  describe('#searchOffenceTypes', () => {
    it('Should buikld the right url and return the offences', () => {
      const offences: OffenceType[] = [
        {
          offenceId: '17bd3b5b-de61-46cb-a395-0f46e70774c4',
          cjsOffenceCode: 'GA96101',
          title: 'Aircraft commander / tug driver fail to stop after aircraft accident within Gatwick Airport',
          legislation: 'whatever'
        },
        {
          offenceId: '42a5fdfe-1642-4358-99c3-7d5816927944',
          cjsOffenceCode: 'GA96011',
          title: 'Allow a vehicle to be on Gatwick Airport after being forbidden to do so by a PC / airport official',
          legislation: 'whatever'
        }
      ];

      const offencesResponse: { offences: OffenceType[] } = {
        offences
      };

      const searchOffencesResponse$ = cold('-a|', { a: offencesResponse });
      const expected$ = cold('-b|', { b: offences });

      http.query = jasmine.createSpy().and.returnValue(searchOffencesResponse$);

      expect(service.searchOffenceTypes('test', 20, '2001-01-01')).toBeObservable(expected$);
      expect(http.query).toHaveBeenCalledWith({
        // tslint:disable-next-line:max-line-length
        url: `/referencedataoffences-query-api/query/api/rest/referencedataoffences/offences/search?q=test&limit=20&offenceDate=2001-01-01`,
        requestType: 'application/vnd.referencedataoffences.offences-search+json'
      });
    });
  });

  describe('#getOffenceTypeById', () => {
    it('Should buikld the right url and return the offence', () => {
      const offenceId = '2bac3503-f6d7-47ec-bcea-bae541512b41';
      const offenceResponse: any = {
        offenceId,
        drugsOrAlcoholRelated: 'Y',
        locationRequired: 'Y',
        backDuty: false,
        details: {
          document: {
            english: {
              standardoffencewording: 'some standard offence Wording'
            }
          }
        }
      };

      const offence: OffenceTypeDetails = {
        offenceId,
        drugsOrAlcoholRelated: 'Y',
        locationRequired: 'Y',
        backDuty: false,
        standardoffencewording: 'some standard offence Wording'
      };

      const searchOffencesResponse$ = cold('-a|', { a: offenceResponse });
      const expected$ = cold('-b|', { b: offence });

      http.query = jasmine.createSpy().and.returnValue(searchOffencesResponse$);

      expect(service.getOffenceTypeById('test-offence-id-001')).toBeObservable(expected$);
      expect(http.query).toHaveBeenCalledWith({
        // tslint:disable-next-line:max-line-length
        url: `/referencedataoffences-query-api/query/api/rest/referencedataoffences/offences/test-offence-id-001`,
        requestType: 'application/vnd.referencedataoffences.offence+json'
      });
    });
  });
});
