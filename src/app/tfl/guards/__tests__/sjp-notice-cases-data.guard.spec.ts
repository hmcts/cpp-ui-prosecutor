import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { State } from '../../../reducers';
import { SjpNoticeCasesCountResult, SjpService } from '../../../contexts/sjp';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { SjpNoticeCasesDataGuard } from '../sjp-notice-cases-data.guard';
import { LoadCasesWithSjpNoticeCountSuccess } from '../../tfl.action';
import { tflReducer } from '../../tfl.reducer';

describe('SjpNoticeCasesDataGuard', () => {
  let pleadedNotGuiltyCasesDataGuard: SjpNoticeCasesDataGuard;
  let store: Store<State>;
  let getCasesWithSjpNoticeCount: jest.Mock;
  let navigate: jest.Mock;

  beforeEach(() => {
    getCasesWithSjpNoticeCount = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      declarations: [],
      imports: [StoreModule.forRoot(tflReducer)],
      providers: [
        SjpNoticeCasesDataGuard,
        {
          provide: SjpService,
          useValue: {
            getCasesWithSjpNoticeCount
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

    pleadedNotGuiltyCasesDataGuard = TestBed.get(SjpNoticeCasesDataGuard);
    store = TestBed.get(Store);
    jest.spyOn(store, 'dispatch');
  });

  it('should call the service and load data', () => {
    const sjpNoticeCaseResult = { count: 0 } as SjpNoticeCasesCountResult;
    const sjpNoticeCaseResult$ = cold('-a|', { a: sjpNoticeCaseResult });
    const expected$ = cold('-(b|)', { b: true });

    getCasesWithSjpNoticeCount.mockReturnValue(sjpNoticeCaseResult$);

    const activate$ = pleadedNotGuiltyCasesDataGuard.canActivate();

    expect(activate$).toBeObservable(expected$);
    expect(store.dispatch).toHaveBeenCalledWith(new LoadCasesWithSjpNoticeCountSuccess(sjpNoticeCaseResult));
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should resolve to false and navigate to technical error page on failures', () => {
    const error$ = cold('--#');

    getCasesWithSjpNoticeCount.mockReturnValue(error$);

    const activate$ = pleadedNotGuiltyCasesDataGuard.canActivate();

    expect(store.dispatch).not.toHaveBeenCalled();
    navigate.mockReturnValue(Promise.resolve(true));
    activate$.subscribe(value => {
      expect(value).toBeFalsy();
      expect(navigate).toHaveBeenCalledWith(['/technical-error']);
    });
  });
});
