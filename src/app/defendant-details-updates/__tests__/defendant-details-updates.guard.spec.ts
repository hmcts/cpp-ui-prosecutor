import { provideStore, Store } from '@ngrx/store';
import { reducers, State } from '../../reducers';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { SjpService } from '../../contexts/sjp';
import { DefendantDetailsUpdatesPageDataGuard } from '../defendant-details-updates.guard';
import { LoadDefendantDetailsUpdates } from '../../core/actions';
import { MOCK_DEFENDANT_DETAILS_UPDATES } from '../../dashboard/__tests__/test-mock-data';

describe('DefendantDetailsUpdatesPageDataGuard', () => {
  let guard: DefendantDetailsUpdatesPageDataGuard;
  let store: Store<State>;
  let getDefendantDetailsUpdates: jest.Mock;
  let navigate: jest.Mock;

  beforeEach(() => {
    getDefendantDetailsUpdates = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        DefendantDetailsUpdatesPageDataGuard,
        {
          provide: SjpService,
          useValue: {
            getDefendantDetailsUpdates
          }
        },
        {
          provide: Router,
          useValue: {
            navigate
          }
        }
      ],
      teardown: { destroyAfterEach: false }
    });

    guard = TestBed.inject(DefendantDetailsUpdatesPageDataGuard);
    store = TestBed.inject(Store);
    jest.spyOn(store, 'dispatch');
  });

  it('should fetch the data remotely and resolve the route if its not set', () => {
    const DefendantDetailsUpdatesResult$ = cold('-a|', { a: MOCK_DEFENDANT_DETAILS_UPDATES });
    const expected$ = cold('-(b|)', { b: true });

    getDefendantDetailsUpdates.mockReturnValue(DefendantDetailsUpdatesResult$);
    const activate$ = guard.canActivate();

    expect(activate$).toBeObservable(expected$);
    expect(store.dispatch).toHaveBeenCalledWith(new LoadDefendantDetailsUpdates({ ...MOCK_DEFENDANT_DETAILS_UPDATES }));
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should reject the activation and redirect when an error occurs during resolution', () => {
    const error$ = cold('---#');

    getDefendantDetailsUpdates.mockReturnValue(error$);
    navigate.mockReturnValue(Promise.resolve(true));
    const activate$ = guard.canActivate();

    // promise cannot be tested with marbles as Promise.resolve is asynchronous
    activate$.subscribe(val => {
      expect(val).toBeFalsy();
      expect(navigate).toHaveBeenCalledWith(['/technical-error']);
    });
  });
});
