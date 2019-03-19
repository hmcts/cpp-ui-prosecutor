import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { Store } from '@ngrx/store';
import { ApiError } from '../../core/actions';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { CaseOverviewEffects } from '../case-overview.effects';
import {
  CaseOverviewActions,
  GetCaseById,
  GetCaseByIdSuccess,
  WithdrawOffences,
  WithdrawOffencesActions,
  WithdrawOffencesSuccess
} from '../case-overview.action';
import { MOCK_CASE } from './test-mock-data';
import { SjpService } from '../../contexts/sjp';
import { Router } from '@angular/router';

export class TestActions extends Actions {
  set stream(source: Observable<any>) {
    // tslint:disable-next-line
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}
const MOCK_WITHDRAW_STATE = {
  withdrawalRequestsStatus: [
    {
      offenceId: 'mock-offence-id',
      reason: 'mock-reason'
    }
  ]
};
const CASE_ID_TEST = 'case-id-test';

describe('Case Overview Effects', () => {
  let effects: CaseOverviewEffects;
  let actions$: TestActions;

  let getCaseById: jest.Mock;
  let withdrawOffences: jest.Mock;
  let dispatch: jest.Mock;
  let action: CaseOverviewActions | WithdrawOffencesActions;
  let navigate: jest.Mock;

  beforeEach(() => {
    getCaseById = jest.fn();
    withdrawOffences = jest.fn();
    dispatch = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        CaseOverviewEffects,
        {
          provide: Router,
          useValue: {
            navigate
          }
        },
        {
          provide: SjpService,
          useValue: {
            getCaseById,
            withdrawOffences
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
      action = new GetCaseById(CASE_ID_TEST);
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

  describe('withdrawOffences', () => {
    beforeEach(() => {
      action = new WithdrawOffences(MOCK_WITHDRAW_STATE, CASE_ID_TEST);
      actions$.stream = hot('-a', { a: action });
    });

    it('should respond with success', () => {
      const expected$ = cold('----(bc)', {
        b: new GetCaseByIdSuccess(MOCK_CASE),
        c: new WithdrawOffencesSuccess()
      });
      const response$ = cold('-a|', { a: MOCK_CASE });

      getCaseById.mockReturnValue(response$);
      withdrawOffences.mockReturnValue(cold('--x|', { x: true }));

      expect(effects.withdrawOffences).toBeObservable(expected$);
    });

    it('should respond with success and navigate to case overview', () => {
      const expected$ = cold('----(bc)', {
        b: new GetCaseByIdSuccess(MOCK_CASE),
        c: new WithdrawOffencesSuccess()
      });
      const response$ = cold('-a|', { a: MOCK_CASE });

      getCaseById.mockReturnValue(response$);
      withdrawOffences.mockReturnValue(cold('--x|', { x: true }));

      expect(effects.withdrawOffences).toBeObservable(expected$);
      expect(navigate).toHaveBeenCalledWith(['case-overview', MOCK_CASE.id]);
    });
  });
});
