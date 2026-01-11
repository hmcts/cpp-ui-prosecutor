import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { provideStore, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CaseOverviewEffects } from '../case-overview.effects';
import {
  CaseOverviewAction,
  SubmitDatesToAvoid,
  SubmitDatesToAvoidFailed,
  SubmitDatesToAvoidSuccess,
  WithdrawOffences,
  WithdrawOffencesFailed,
  WithdrawOffencesSuccess
} from '../case-overview.action';
import { MOCK_CASE } from './test-mock-data';
import { SjpService } from '../../contexts/sjp';
import { Router } from '@angular/router';
import { reducers, State } from '../../reducers';
import { LoadCaseSuccess } from '../../core/actions';
import { caseOverviewReducer } from '../case-overview.reducer';

describe('Case Overview Effects', () => {
  const withdrawOffenceParam = {
    withdrawalRequestsStatus: [
      {
        offenceId: 'mock-offence-id',
        withdrawalRequestReasonId: 'id'
      }
    ]
  };
  const datesToAvoid = 'datesToAvoid';

  let effects: CaseOverviewEffects;
  let actions$: Observable<any> = new Observable();
  let store: Store<State>;

  let getCaseById: jest.Mock;
  let withdrawOffences: jest.Mock;
  let submitDatesToAvoid: jest.Mock;
  let action: CaseOverviewAction | CaseOverviewAction;
  let navigate: jest.Mock;

  beforeEach(() => {
    getCaseById = jest.fn();
    withdrawOffences = jest.fn();
    submitDatesToAvoid = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        provideStore(
          {
            ...reducers,
            router: (state, routerAction) => ({
              state: {
                params: { role: 'user' }
              }
            }),
            caseOverview: caseOverviewReducer
          },
          {
            runtimeChecks: {}
          }
        ),
        CaseOverviewEffects,
        provideMockActions(() => actions$),
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
            withdrawOffences,
            submitDatesToAvoid
          }
        }
      ],
      teardown: { destroyAfterEach: false }
    });

    effects = TestBed.inject(CaseOverviewEffects);
    actions$ = TestBed.inject(Actions);
    store = TestBed.inject(Store);
    store.dispatch(new LoadCaseSuccess(MOCK_CASE));
  });

  describe('withdrawOffences', () => {
    beforeEach(() => {
      action = new WithdrawOffences(withdrawOffenceParam);
      actions$ = hot('-a', { a: action });
    });

    it('should respond with success', () => {
      const expected$ = cold('----(bc)', {
        b: new LoadCaseSuccess(MOCK_CASE),
        c: new WithdrawOffencesSuccess()
      });
      const response$ = cold('-a|', { a: MOCK_CASE });

      getCaseById.mockReturnValue(response$);
      withdrawOffences.mockReturnValue(cold('--x|', { x: true }));

      expect(effects.withdrawOffences).toBeObservable(expected$);
    });

    it('should respond with success and navigate to case overview', () => {
      const expected$ = cold('----(bc)', {
        b: new LoadCaseSuccess(MOCK_CASE),
        c: new WithdrawOffencesSuccess()
      });
      const response$ = cold('-a|', { a: MOCK_CASE });

      getCaseById.mockReturnValue(response$);
      withdrawOffences.mockReturnValue(cold('--x|', { x: true }));

      expect(effects.withdrawOffences).toBeObservable(expected$);
      expect(navigate).toHaveBeenCalledWith(['user', 'case-overview', MOCK_CASE.id]);
    });

    it('should respond with error when case is assigned and navigate to case overview', () => {
      const MOCK_CASE_ERROR = {
        data: {
          reason: 'CASE_ASSIGNED',
          caseId: MOCK_CASE.id
        }
      };

      const expected$ = cold(
        '---(bc)',
        {
          b: new LoadCaseSuccess(MOCK_CASE),
          c: new WithdrawOffencesFailed()
        },
        MOCK_CASE_ERROR
      );
      const response$ = cold('-a', { a: MOCK_CASE });

      getCaseById.mockReturnValue(response$);
      withdrawOffences.mockReturnValue(cold('-#|', {}, MOCK_CASE_ERROR));

      expect(effects.withdrawOffences).toBeObservable(expected$);
      expect(navigate).toHaveBeenCalledWith(['user', 'case-overview', MOCK_CASE.id]);
    });
  });

  describe('datesToAvoid', () => {
    it('should respond with success', () => {
      action = new SubmitDatesToAvoid(datesToAvoid);
      actions$ = hot('-a', { a: action });

      const expected$ = cold('----(bc)', {
        b: new LoadCaseSuccess(MOCK_CASE),
        c: new SubmitDatesToAvoidSuccess()
      });
      const response$ = cold('-a|', { a: MOCK_CASE });

      getCaseById.mockReturnValue(response$);
      submitDatesToAvoid.mockReturnValue(cold('--x|', { x: true }));

      expect(effects.submitDatesToAvoid).toBeObservable(expected$);
      expect(navigate).toHaveBeenCalledWith(['user', 'case-overview', MOCK_CASE.id, 'dates-to-avoid']);
    });

    it('should respond with error and navigate to case overview', () => {
      const MOCK_CASE_ERROR = {
        data: {
          reason: 'CASE_ASSIGNED',
          caseId: MOCK_CASE.id
        }
      };

      action = new SubmitDatesToAvoid(datesToAvoid);
      actions$ = hot('-a', { a: action });

      const expected$ = cold(
        '---(bc)',
        {
          b: new LoadCaseSuccess(MOCK_CASE),
          c: new SubmitDatesToAvoidFailed()
        },
        MOCK_CASE_ERROR
      );
      const response$ = cold('-a|', { a: MOCK_CASE });

      getCaseById.mockReturnValue(response$);
      submitDatesToAvoid.mockReturnValue(cold('-#|', {}, MOCK_CASE_ERROR));

      expect(effects.submitDatesToAvoid).toBeObservable(expected$);
      expect(navigate).toHaveBeenCalledWith(['user', 'case-overview', MOCK_CASE.id]);
    });
  });
});
