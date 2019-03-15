import { TestBed } from '@angular/core/testing';
import { PleadedNotGuiltyCasesDataGuard } from '../pleaded-not-guilty-cases-data-guard.service';
import { Store, StoreModule } from '@ngrx/store';
import { reducers, State } from '../../../reducers';
import { PleadedNotGuiltyCasesDetail, SjpService } from '../../../contexts/sjp';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { LoadPleadedNotGuiltyCases } from '../../actions/entities';

describe('PleadedNotGuiltyCasesDataGuard', () => {
  let pleadedNotGuiltyCasesDataGuard: PleadedNotGuiltyCasesDataGuard;
  let store: Store<State>;
  let getPendingDatesToAvoid: jest.Mock;
  let navigate: jest.Mock;

  beforeEach(() => {
    getPendingDatesToAvoid = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      declarations: [],
      imports: [StoreModule.forRoot(reducers)],
      providers: [
        PleadedNotGuiltyCasesDataGuard,
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
      ]
    });

    pleadedNotGuiltyCasesDataGuard = TestBed.get(PleadedNotGuiltyCasesDataGuard);
    store = TestBed.get(Store);
    jest.spyOn(store, 'dispatch');
  });

  it('should resolve to true On successful service call', () => {
    const pendingDatesToAvoidPayLoad = {} as PleadedNotGuiltyCasesDetail;
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
