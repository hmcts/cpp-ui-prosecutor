import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';
import { reducers, State } from '../../reducers';
import { CasesMissingSjpNoticeResult, SjpService } from '../../contexts/sjp';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { SjpNoticeCasesDataGuard } from '../sjp-notice-cases-data.guard';
import { LoadCasesWithSjpNoticeCountSuccess } from '../../core';

describe('SjpNoticeCasesDataGuard', () => {
  let pleadedNotGuiltyCasesDataGuard: SjpNoticeCasesDataGuard;
  let store: Store<State>;
  let getCasesMissingSjpNoticeCount: jest.Mock;
  let navigate: jest.Mock;

  beforeEach(() => {
    getCasesMissingSjpNoticeCount = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        SjpNoticeCasesDataGuard,
        {
          provide: SjpService,
          useValue: {
            getCasesMissingSjpNoticeCount
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

    pleadedNotGuiltyCasesDataGuard = TestBed.inject(SjpNoticeCasesDataGuard);
    store = TestBed.inject(Store);
    jest.spyOn(store, 'dispatch');
  });

  it('should call the service and load data', () => {
    const sjpNoticeCaseResult = { count: 0 } as CasesMissingSjpNoticeResult;
    const sjpNoticeCaseResult$ = cold('-a|', { a: sjpNoticeCaseResult });
    const expected$ = cold('-(b|)', { b: true });

    getCasesMissingSjpNoticeCount.mockReturnValue(sjpNoticeCaseResult$);

    const activate$ = pleadedNotGuiltyCasesDataGuard.canActivate();

    expect(activate$).toBeObservable(expected$);
    expect(store.dispatch).toHaveBeenCalledWith(new LoadCasesWithSjpNoticeCountSuccess(sjpNoticeCaseResult));
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should resolve to false and navigate to technical error page on failures', () => {
    const error$ = cold('--#');

    getCasesMissingSjpNoticeCount.mockReturnValue(error$);

    const activate$ = pleadedNotGuiltyCasesDataGuard.canActivate();

    expect(store.dispatch).not.toHaveBeenCalled();
    navigate.mockReturnValue(Promise.resolve(true));
    activate$.subscribe(value => {
      expect(value).toBeFalsy();
      expect(navigate).toHaveBeenCalledWith(['/technical-error']);
    });
  });
});
