import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Prosecutor, ReferenceDataActions, ReferenceDataService } from '@cpp/reference-data';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, provideStore } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { ReferenceDataService as PCFReferenceDataService } from '../../../contexts/reference-data';
import { ApiError, createProsecutor, createProsecutorSuccess } from '../../actions';
import { ProsecutorType } from '../../model';
import { reducers } from '../../reducers';
import { ProsecutorEffects } from '../prosecutor.effects';

describe('ProsecutorEffects', () => {
  let actions$ = new Observable<Action>();

  let effects: ProsecutorEffects;
  let navigate: jest.Mock;
  let fetchProsecutors: jest.Mock;
  let mockCreateProsecutor: jest.Mock;

  beforeEach(() => {
    navigate = jest.fn();
    fetchProsecutors = jest.fn();
    mockCreateProsecutor = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        ProsecutorEffects,
        provideMockActions(() => actions$),
        {
          provide: ReferenceDataService,
          useValue: {
            fetchProsecutors
          }
        },
        {
          provide: Router,
          useValue: {
            navigate
          }
        },
        {
          provide: PCFReferenceDataService,
          useValue: {
            createProsecutor: mockCreateProsecutor
          }
        },
        provideMockActions(() => actions$)
      ],
      teardown: { destroyAfterEach: false }
    });
    effects = TestBed.inject(ProsecutorEffects);
    actions$ = TestBed.inject(Actions);
  });

  describe('createProsecutor$', () => {
    it('should create prosecutor', () => {
      const prosecutor = {
        id: 'id',
        fullName: 'D limited',
        address: {
          address1: 'address1',
          postcode: 'postcode'
        }
      } as Prosecutor;
      const prosecutorType = ProsecutorType.APPLICANT;
      const action = createProsecutor({ prosecutor, prosecutorType });

      actions$ = hot('              -a-----', { a: action });
      const fetchResponse$ = cold(' -(b|)', { b: [prosecutor] });
      const createResponse$ = cold('-(c|)', { c: prosecutor });
      const expected$ = cold('      ---(de)-', {
        d: ReferenceDataActions.loadProsecutorsSuccess({ prosecutors: [prosecutor] }),
        e: createProsecutorSuccess({
          prosecutor: { ...prosecutor, standard: false },
          prosecutorType
        })
      });

      mockCreateProsecutor.mockReturnValue(createResponse$);
      fetchProsecutors.mockReturnValue(fetchResponse$);
      expect(effects.createProsecutor$).toBeObservable(expected$);
      expect(fetchProsecutors).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledWith(['application', 'applicant'], { replaceUrl: true });
    });

    it('should handle server errors', () => {
      const error = { status: 400 };
      const apiError = new ApiError(error);

      const prosecutor = {
        id: 'id',
        fullName: 'D limited',
        address: {
          address1: 'address1',
          postcode: 'postcode'
        }
      } as Prosecutor;
      const prosecutorType = ProsecutorType.APPLICANT;
      const action = createProsecutor({ prosecutor, prosecutorType });

      actions$ = hot('-a---', { a: action });
      const failed$ = cold('-#', {}, error);
      const expected$ = cold('--e-', { e: apiError });

      mockCreateProsecutor.mockReturnValue(failed$);
      expect(effects.createProsecutor$).toBeObservable(expected$);
    });
  });
});
