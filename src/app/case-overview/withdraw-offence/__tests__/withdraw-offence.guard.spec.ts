import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { initialState } from '../../../core/reducers/api.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { OffenceWithdrawalReasonsGuard } from '../withdraw-offence.guard';
import { OffenceWithdrawalReason, ReferenceDataService } from '../../../contexts/reference-data';
import { LoadOffenceWithdrawalReasonsSuccess } from '../../../core/actions';
import { Router } from '@angular/router';

describe('OffenceWithdrawReasonsGuard', () => {
  const getOffenceWithdrawalReasons = jest.fn();
  const navigate = jest.fn();

  const offenceWithdrawalReasons = [
    { id: '1', reasonCodeDescription: 'First reason' } as OffenceWithdrawalReason,
    { id: '2', reasonCodeDescription: 'Second reason' } as OffenceWithdrawalReason
  ];

  let guard: OffenceWithdrawalReasonsGuard;
  let referenceDataService: ReferenceDataService;
  let store: MockStore<{ offenceWithdrawalReasons: OffenceWithdrawalReason[] }>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OffenceWithdrawalReasonsGuard,
        {
          provide: ReferenceDataService,
          useValue: {
            getOffenceWithdrawalReasons
          }
        },
        {
          provide: Router,
          useValue: {
            navigate
          }
        },
        provideMockStore({ initialState })
      ],
      teardown: { destroyAfterEach: false }
    });

    guard = TestBed.inject(OffenceWithdrawalReasonsGuard);
    store = TestBed.inject(MockStore);
    referenceDataService = TestBed.inject(ReferenceDataService);
    navigate.mockReturnValue(Promise.resolve(true));
    jest.spyOn(store, 'dispatch');
  });

  it('should allow state transition when offence withdrawal reasons already in store', () => {
    store.setState({ offenceWithdrawalReasons });
    const expected = cold('(a|)', { a: true });
    expect(guard.canActivate()).toBeObservable(expected);
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(referenceDataService.getOffenceWithdrawalReasons).not.toHaveBeenCalled();
  });

  it('should fetch offence withdrawal reasons, store them in store and allow state transition', () => {
    store.setState({ offenceWithdrawalReasons: undefined });

    const offenceWithdrawalReason$ = cold('-a|', { a: offenceWithdrawalReasons });

    getOffenceWithdrawalReasons.mockReturnValue(offenceWithdrawalReason$);

    const expected = cold('-(a|)', { a: true });
    expect(guard.canActivate()).toBeObservable(expected);
    expect(referenceDataService.getOffenceWithdrawalReasons).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(new LoadOffenceWithdrawalReasonsSuccess(offenceWithdrawalReasons));
  });

  it('should navigate to error state when error occurs', () => {
    store.setState({ offenceWithdrawalReasons: undefined });

    const offenceWithdrawalReason$ = cold('-#');

    getOffenceWithdrawalReasons.mockReturnValue(offenceWithdrawalReason$);

    const expected = cold('-(a|)', { a: false });
    expect(guard.canActivate()).toBeObservable(expected);
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(referenceDataService.getOffenceWithdrawalReasons).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(['/technical-error']);
  });
});
