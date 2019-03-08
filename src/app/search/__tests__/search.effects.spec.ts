import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { Store } from '@ngrx/store';
import { ApiError } from '../../core/actions';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { SearchEffects } from '../search.effects';
import { Search, SearchActions, SearchSuccess } from '../search.action';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';
import { MOCK_CASES } from './test-mock-data';

export class TestActions extends Actions {
  constructor() {
    super();
  }

  set stream(source: Observable<any>) {
    // tslint:disable-next-line
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('Search Effects', () => {
  let effects: SearchEffects;
  let actions$: TestActions;

  let getCasesDetails: jest.Mock;
  let dispatch: jest.Mock;
  let action: SearchActions;
  let navigate: jest.Mock;

  beforeEach(() => {
    getCasesDetails = jest.fn();
    dispatch = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        SearchEffects,
        {
          provide: Router,
          useValue: {
            navigate
          }
        },
        {
          provide: SearchService,
          useValue: {
            getCasesDetails
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
    effects = TestBed.get(SearchEffects);
    actions$ = TestBed.get(Actions);
  });

  describe('getCasesDetails', () => {
    beforeEach(() => {
      action = new Search('testing');
      actions$.stream = hot('-a', { a: action });
    });

    it('should respond with success', () => {
      const expected$ = cold('---b', {
        b: new SearchSuccess(MOCK_CASES)
      });

      const response$ = cold('--a', { a: MOCK_CASES });
      getCasesDetails.mockReturnValue(response$);

      expect(effects.getCasesDetails).toBeObservable(expected$);
      expect(navigate).toHaveBeenCalledWith(['/search/results']);
    });

    it('should error', () => {
      const error = { status: 400 };
      const apiError = new ApiError(error);

      const error$ = cold('--#', {}, error);
      const expected$ = cold('---e-', { e: apiError });

      getCasesDetails.mockReturnValue(error$);
      expect(effects.getCasesDetails).toBeObservable(expected$);
    });
  });
});
