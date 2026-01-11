import { TestBed } from '@angular/core/testing';
import { DefendantDetailsUpdatesLinkDataGuard } from '../defendant-details-updates-data.guard';
import { provideStore, Store } from '@ngrx/store';
import { reducers, State } from '../../../reducers';
import { DefendantDetailsUpdatesResult, SjpService } from '../../../contexts/sjp';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { LoadDefendantDetailsUpdates } from '../../actions/entities';

describe('PleadedNotGuiltyDataGuard', () => {
  let defendantDetailsUpdatesDataGuard: DefendantDetailsUpdatesLinkDataGuard;
  let store: Store<State>;
  let getDefendantDetailsUpdates: jest.Mock;
  let navigate: jest.Mock;

  beforeEach(() => {
    getDefendantDetailsUpdates = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        DefendantDetailsUpdatesLinkDataGuard,
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

    defendantDetailsUpdatesDataGuard = TestBed.inject(DefendantDetailsUpdatesLinkDataGuard);
    store = TestBed.inject(Store);
    jest.spyOn(store, 'dispatch');
  });

  it('should call the service and load data', () => {
    const defendantDetailsUpdatesPayLoad = {} as DefendantDetailsUpdatesResult;
    const defendantDetailsUpdates$ = cold('-a|', { a: defendantDetailsUpdatesPayLoad });
    const expected$ = cold('-(b|)', { b: true });

    getDefendantDetailsUpdates.mockReturnValue(defendantDetailsUpdates$);

    const activate$ = defendantDetailsUpdatesDataGuard.canActivate();

    expect(activate$).toBeObservable(expected$);
    expect(store.dispatch).toHaveBeenCalledWith(new LoadDefendantDetailsUpdates(defendantDetailsUpdatesPayLoad));
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should resolve to false and navigate to technical error page on failure of service call', () => {
    const error$ = cold('--#');

    getDefendantDetailsUpdates.mockReturnValue(error$);

    const activate$ = defendantDetailsUpdatesDataGuard.canActivate();

    expect(store.dispatch).not.toHaveBeenCalled();
    navigate.mockReturnValue(Promise.resolve(true));
    activate$.subscribe(value => {
      expect(value).toBeFalsy();
      expect(navigate).toHaveBeenCalledWith(['/technical-error']);
    });
  });
});
