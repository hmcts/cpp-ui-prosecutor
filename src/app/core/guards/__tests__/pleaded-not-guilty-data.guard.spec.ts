import { TestBed } from '@angular/core/testing';
import { PleadedNotGuiltyDataGuard } from '../pleaded-not-guilty-data.guard';
import { Store, StoreModule } from '@ngrx/store';
import { reducers, State } from '../../../reducers';
import { PleadedNotGuiltyCaseResult, SjpService } from '../../../contexts/sjp';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { LoadPleadedNotGuiltyCases } from '../../actions/entities';

describe('PleadedNotGuiltyDataGuard', () => {
  let pleadedNotGuiltyCasesDataGuard: PleadedNotGuiltyDataGuard;
  let store: Store<State>;
  let getPendingDatesToAvoid: jest.Mock;
  let navigate: jest.Mock;

  beforeEach(() => {
    getPendingDatesToAvoid = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      declarations: [],
      imports: [StoreModule.forRoot(reducers, { runtimeChecks: {} })],
      providers: [
        PleadedNotGuiltyDataGuard,
        {
          provide: SjpService,
          useValue: {
            getPendingDatesToAvoid
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

    pleadedNotGuiltyCasesDataGuard = TestBed.get(PleadedNotGuiltyDataGuard);
    store = TestBed.get(Store);
    jest.spyOn(store, 'dispatch');
  });

  it('should call the service and load data', () => {
    const pendingDatesToAvoidPayLoad = {} as PleadedNotGuiltyCaseResult;
    const pendingCasesToAvoid$ = cold('-a|', { a: pendingDatesToAvoidPayLoad });
    const expected$ = cold('-(b|)', { b: true });

    getPendingDatesToAvoid.mockReturnValue(pendingCasesToAvoid$);

    const activate$ = pleadedNotGuiltyCasesDataGuard.canActivate();

    expect(activate$).toBeObservable(expected$);
    expect(store.dispatch).toHaveBeenCalledWith(new LoadPleadedNotGuiltyCases(pendingDatesToAvoidPayLoad));
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should resolve to false and navigate to technical error page on failure of service call', () => {
    const error$ = cold('--#');

    getPendingDatesToAvoid.mockReturnValue(error$);

    const activate$ = pleadedNotGuiltyCasesDataGuard.canActivate();

    expect(store.dispatch).not.toHaveBeenCalled();
    navigate.mockReturnValue(Promise.resolve(true));
    activate$.subscribe(value => {
      expect(value).toBeFalsy();
      expect(navigate).toHaveBeenCalledWith(['/technical-error']);
    });
  });
});
