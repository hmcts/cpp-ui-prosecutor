import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { reducers, State } from '../../reducers';
import { LoadSummonsCodesSuccessAction } from '../../actions';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { SummonsCodesGuard } from '../summons-codes';
import { ReferenceDataService } from '../../../contexts/reference-data';

describe('Summons Codes Guard', () => {
  let getSummonsCode: jest.Mock;
  let navigate: jest.Mock;
  let guard: SummonsCodesGuard;
  let store: Store<State>;
  let apiErrors$: TestColdObservable;
  let apiSuccessCaseDetails$: TestColdObservable;
  const summonsCodes = [
    {
      id: '4aaecac5-222b-402d-9047-84803679edac',
      seqNo: 10,
      summonsCode: 'A',
      summonsCodeDescription: 'Application / Complaint',
      validFrom: '2019-03-01'
    },
    {
      id: '5aaecac5-222b-402d-9047-84803679edac',
      seqNo: 20,
      summonsCode: 'B',
      summonsCodeDescription: 'Breach offences',
      validFrom: '2019-03-01'
    }
  ];

  beforeEach(() => {
    getSummonsCode = jest.fn();
    navigate = jest.fn();
    apiErrors$ = cold('-(#)');
    apiSuccessCaseDetails$ = cold('-(a|)', { a: summonsCodes });

    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        SummonsCodesGuard,
        {
          provide: ReferenceDataService,
          useValue: {
            getSummonsCode
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

    guard = TestBed.inject(SummonsCodesGuard);
    store = TestBed.inject(Store);
  });

  describe('The store is empty', () => {
    beforeEach(() => {
      jest.spyOn(store, 'dispatch');
    });

    describe(' API returns data', () => {
      it('SUCCESS', () => {
        const activate$ = guard.canActivate();
        getSummonsCode.mockReturnValue(apiSuccessCaseDetails$);

        const first$ = cold('-(a|)', { a: true });
        const expected$ = cold('-(b|)', { a: first$, b: true });

        expect(activate$).toBeObservable(expected$);
        expect(getSummonsCode).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(new LoadSummonsCodesSuccessAction(summonsCodes));
      });
    });

    describe(' API fails', () => {
      it('when getSummonsCode Fails', () => {
        const activate$ = guard.canActivate();
        getSummonsCode.mockReturnValue(apiErrors$);
        const expected$ = cold('-(a|)', { a: false });

        expect(activate$).toBeObservable(expected$);
        expect(getSummonsCode).toHaveBeenCalled();
      });
    });
  });

  describe('The store is populated', () => {
    beforeEach(() => {
      store.dispatch(new LoadSummonsCodesSuccessAction(summonsCodes));

      jest.spyOn(store, 'dispatch');
    });

    describe('and it contains Case Data for different ID', () => {
      beforeEach(() => {});

      describe(' API returns data', () => {
        it('SUCCESS', () => {
          const activate$ = guard.canActivate();
          getSummonsCode.mockReturnValue(apiSuccessCaseDetails$);

          const expected$ = cold('(a|)', { a: true });

          expect(activate$).toBeObservable(expected$);
          expect(getSummonsCode).not.toHaveBeenCalled();
          expect(store.dispatch).not.toHaveBeenCalledWith(new LoadSummonsCodesSuccessAction(summonsCodes));
        });
      });
    });
  });
});
