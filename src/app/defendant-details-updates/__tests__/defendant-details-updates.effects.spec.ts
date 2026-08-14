import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { provideStore, Store } from '@ngrx/store';
import { ApiError, LoadDefendantDetailsUpdates } from '../../core/actions';
import { Observable } from 'rxjs';
import { SjpService } from '../../contexts/sjp';
import { State } from '../../reducers';
import { DefendantDetailsUpdatesEffects } from '../defendant-details-updates.effects';
import { MOCK_DEFENDANT_DETAILS_UPDATES } from '../../dashboard/__tests__/test-mock-data';
import { AcknowledgeDefendantDetailsUpdates } from '../defendant-details-updates.action';
import { reducers } from '../../core/reducers';
import { provideMockActions } from '@ngrx/effects/testing';

describe('DefendantDetailsUpdatesEffects', () => {
  let effects: DefendantDetailsUpdatesEffects;
  let actions$: Observable<any>;
  let store: Store<State>;

  let getDefendantDetailsUpdates: jest.Mock;
  let acknowledgeDefendantDetailsUpdates: jest.Mock;

  beforeEach(() => {
    getDefendantDetailsUpdates = jest.fn();
    acknowledgeDefendantDetailsUpdates = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        DefendantDetailsUpdatesEffects,
        {
          provide: SjpService,
          useValue: {
            getDefendantDetailsUpdates,
            acknowledgeDefendantDetailsUpdates
          }
        },
        provideMockActions(() => actions$)
      ],
      teardown: { destroyAfterEach: false }
    });
    effects = TestBed.inject(DefendantDetailsUpdatesEffects);
    actions$ = TestBed.inject(Actions);
    store = TestBed.inject(Store);
    store.dispatch(new LoadDefendantDetailsUpdates(MOCK_DEFENDANT_DETAILS_UPDATES));
  });

  describe('acknowledgeDefendantDetailsUpdates', () => {
    it('should update defendant details with success', () => {
      const initialData = MOCK_DEFENDANT_DETAILS_UPDATES;

      store.dispatch(new LoadDefendantDetailsUpdates(initialData));

      const acknowledgeParams = { caseId: '1', defendantId: '2' };

      const action = new AcknowledgeDefendantDetailsUpdates(acknowledgeParams);

      actions$ = hot('-a', { a: action });
      acknowledgeDefendantDetailsUpdates.mockReturnValue(cold('-b|', { b: {} }));

      const updatedDetails = { total: 0, defendantDetailsUpdates: [] };

      getDefendantDetailsUpdates.mockReturnValue(cold('-c|', { c: updatedDetails }));

      const expected$ = cold('---d', {
        d: new LoadDefendantDetailsUpdates(updatedDetails)
      });

      expect(effects.defendantDetailsUpdates$).toBeObservable(expected$);
    });

    it('should error', () => {
      const error = { status: 400 };

      const acknowledgeParams = { caseId: '1', defendantId: '2' };

      const action = new AcknowledgeDefendantDetailsUpdates(acknowledgeParams);
      actions$ = hot('-a', { a: action });

      const apiError = new ApiError(error);

      const error$ = cold('--#', {}, error);
      const expected$ = cold('---b-', { b: apiError });

      acknowledgeDefendantDetailsUpdates.mockReturnValue(error$);
      getDefendantDetailsUpdates.mockReturnValue(error$);

      expect(effects.defendantDetailsUpdates$).toBeObservable(expected$);
    });
  });
});
