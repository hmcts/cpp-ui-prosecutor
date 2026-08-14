import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { reducers, State } from '../../reducers';
import { LoadOffenceDateCodesSuccessAction } from '../../actions';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { OffenceDateCodesGuard } from '../offence-date-codes';
import { ReferenceDataService } from '../../../contexts/reference-data';

describe('OffenceDate Codes Guard', () => {
  let getOffenceDateCode: jest.Mock;
  let navigate: jest.Mock;
  let guard: OffenceDateCodesGuard;
  let store: Store<State>;
  let apiErrors$: TestColdObservable;
  let apiSuccessCaseDetails$: TestColdObservable;
  const offenceDateCodes = [
    {
      id: '4aaecac5-222b-402d-9047-84803679edac',
      dateCode: '1',
      dateCodeDescription: 'before'
    },
    {
      id: '5aaecac5-222b-402d-9047-84803679edac',
      dateCode: '2',
      dateCodeDescription: 'after'
    }
  ];

  beforeEach(() => {
    getOffenceDateCode = jest.fn();
    navigate = jest.fn();
    apiErrors$ = cold('-(#)');
    apiSuccessCaseDetails$ = cold('-(a|)', { a: offenceDateCodes });

    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        OffenceDateCodesGuard,
        {
          provide: ReferenceDataService,
          useValue: {
            getOffenceDateCode
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

    guard = TestBed.inject(OffenceDateCodesGuard);
    store = TestBed.inject(Store);
  });

  describe('The store is empty', () => {
    beforeEach(() => {
      jest.spyOn(store, 'dispatch');
    });

    describe(' API returns data', () => {
      it('SUCCESS', () => {
        const activate$ = guard.canActivate();
        getOffenceDateCode.mockReturnValue(apiSuccessCaseDetails$);

        const first$ = cold('-(a|)', { a: true });
        const expected$ = cold('-(b|)', { a: first$, b: true });

        expect(activate$).toBeObservable(expected$);
        expect(getOffenceDateCode).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(new LoadOffenceDateCodesSuccessAction(offenceDateCodes));
      });
    });

    describe(' API fails', () => {
      it('when getOffenceDateCodes Fails', () => {
        const activate$ = guard.canActivate();
        getOffenceDateCode.mockReturnValue(apiErrors$);
        const expected$ = cold('-(a|)', { a: false });

        expect(activate$).toBeObservable(expected$);
        expect(getOffenceDateCode).toHaveBeenCalled();
      });
    });
  });

  describe('The store is populated', () => {
    beforeEach(() => {
      store.dispatch(new LoadOffenceDateCodesSuccessAction(offenceDateCodes));

      jest.spyOn(store, 'dispatch');
    });

    describe('and it contains Case Data for different ID', () => {
      beforeEach(() => {});

      describe(' API returns data', () => {
        it('SUCCESS', () => {
          const activate$ = guard.canActivate();
          getOffenceDateCode.mockReturnValue(apiSuccessCaseDetails$);

          const expected$ = cold('(a|)', { a: true });

          expect(activate$).toBeObservable(expected$);
          expect(getOffenceDateCode).not.toHaveBeenCalled();
          expect(store.dispatch).not.toHaveBeenCalledWith(new LoadOffenceDateCodesSuccessAction(offenceDateCodes));
        });
      });
    });
  });
});
