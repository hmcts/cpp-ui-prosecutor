import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { Store } from '@ngrx/store';
import { ApiError } from '../../core/actions';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { CaseOverviewEffects } from '../case-overview.effects';
import { CaseOverviewActions, GetCaseById, GetCaseByIdSuccess } from '../case-overview.action';
import { MOCK_CASE } from './test-mock-data';
import { SjpService } from '../../contexts/sjp';

export class TestActions extends Actions {
  set stream(source: Observable<any>) {
    // tslint:disable-next-line
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('Case Overview Effects', () => {
  let effects: CaseOverviewEffects;
  let actions$: TestActions;

  let getCaseById: jest.Mock;
  let dispatch: jest.Mock;
  let action: CaseOverviewActions;

  beforeEach(() => {
    getCaseById = jest.fn();
    dispatch = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        CaseOverviewEffects,
        {
          provide: SjpService,
          useValue: {
            getCaseById
          }
        },
        {
          provide: Actions,
          useFactory: getActions
        },
        {
          provide: Store,
          useValue: {
            dispatch
          }
        },
        RouterTestingModule
      ]
    });
    effects = TestBed.get(CaseOverviewEffects);
    actions$ = TestBed.get(Actions);
  });

  describe('getCasesDetails', () => {
    beforeEach(() => {
      action = new GetCaseById('case-id-test');
      actions$.stream = hot('-a', { a: action });
    });

    it('should respond with success', () => {
      const expected$ = cold('---b', {
        b: new GetCaseByIdSuccess(MOCK_CASE)
      });

      const response$ = cold('--a', { a: MOCK_CASE });
      getCaseById.mockReturnValue(response$);
      expect(effects.getOffences).toBeObservable(expected$);
    });

    it('should error', () => {
      const error = { status: 400 };
      const apiError = new ApiError(error);

      const error$ = cold('--#', {}, error);
      const expected$ = cold('---e-', { e: apiError });

      getCaseById.mockReturnValue(error$);
      expect(effects.getOffences).toBeObservable(expected$);
    });
  });
});
