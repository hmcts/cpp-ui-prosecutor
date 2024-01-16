import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { ProsecutionCaseFileService } from '../prosecution-case-file.service';
import { ManualCaseDetailsState } from '../../../core/reducers/manual-case-details';
import { CppHttp } from '@cpp/core';

describe('ProsecutionCaseFileService', () => {
  let prosecution: ProsecutionCaseFileService;
  let commandSync: jest.Mock;
  let query: jest.Mock;

  beforeEach(() => {
    commandSync = jest.fn();
    query = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        ProsecutionCaseFileService,
        {
          provide: CppHttp,
          useValue: {
            commandSync,
            query
          }
        }
      ]
    });
    prosecution = TestBed.get(ProsecutionCaseFileService);
  });

  describe('createManualCaseSJP', () => {
    it('Should createManualCaseSJP with payload', () => {
      const response = { body: '*' };
      const response$ = cold('-a|', { a: response });
      const expected$ = cold('-b|', { b: response });

      commandSync.mockReturnValue(response$);

      const payload = {
        caseDetails: {
          initiationCode: 'J'
        }
      } as ManualCaseDetailsState;

      const command$ = prosecution.createManualCaseSJP(payload);

      expect(command$).toBeObservable(expected$);
      expect(commandSync).toHaveBeenCalledWith({
        url: '/prosecutioncasefile-service/command/api/rest/prosecutioncasefile/initiate-sjp-prosecution',
        requestType: 'application/vnd.prosecutioncasefile.command.initiate-sjp-prosecution+json',
        body: payload,
        successEvent: 'public.prosecutioncasefile.manual-case-received'
      });
    });
  });
});
