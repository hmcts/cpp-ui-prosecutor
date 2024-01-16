import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { reducers } from '../../reducers';
import { CreateManualCase, CreateManualCaseSuccess } from '../../actions';
import { ManualCaseDetailsState } from '../../reducers/manual-case-details';
import { ManualCaseDetailsEffects } from '..';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ProsecutionCaseFileService } from '../../../contexts/prosecution-case-file';
import { Observable, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';

describe('Reference Data Effects', () => {
  let effects: ManualCaseDetailsEffects;
  let actions$: Observable<any>;

  let createManualCaseSJP: jest.Mock;
  let createManualCaseCC: jest.Mock;
  let navigate: jest.Mock;

  beforeEach(() => {
    createManualCaseSJP = jest.fn();
    createManualCaseCC = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers, { runtimeChecks: {} }), RouterTestingModule],
      providers: [
        ManualCaseDetailsEffects,
        provideMockActions(() => actions$),
        {
          provide: ProsecutionCaseFileService,
          useValue: {
            createManualCaseSJP,
            createManualCaseCC
          }
        },
        {
          provide: Router,
          useValue: { navigate }
        }
      ]
    });

    effects = TestBed.get(ManualCaseDetailsEffects);
    actions$ = TestBed.get(Actions);
  });

  describe('createManualCase$', () => {
    const mockCase = {
      caseDetails: {
        caseId: 'case-id',
        initiationCode: 'J',
        prosecutor: {
          prosecutingAuthority: 'DVLA'
        }
      },
      defendants: [
        {
          id: 'defendant-id',
          offences: [
            {
              offenceId: 'offence-id'
            }
          ]
        }
      ]
    } as ManualCaseDetailsState;

    const createManualCaseAction = new CreateManualCase(mockCase);

    it('should return the case reference after storing the details in the API ', () => {
      const createManualCaseSuccess = new CreateManualCaseSuccess();

      actions$ = hot('-a', { a: createManualCaseAction });
      const expected$ = cold('-b', { b: createManualCaseSuccess });

      createManualCaseSJP.mockReturnValue(of({ prosecutorCaseReference: 'abcd', caseId: 'a-b-c-d' }));
      expect(effects.createManualCase$).toBeObservable(expected$);
      expect(navigate).toHaveBeenCalledWith(['manual-case', 'case-created', 'abcd', 'a-b-c-d']);
    });
  });
});
