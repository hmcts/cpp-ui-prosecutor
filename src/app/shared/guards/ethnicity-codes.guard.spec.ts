import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { reducers } from '../../reducers';
import { State, LoadObservedEthnicitiesSuccessAction } from '../../core';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { EthnicityCodesGuard } from './ethnicity-codes.guard';
import { ReferenceDataService } from '../../contexts/reference-data';

describe('Ethnicities Guard', () => {
  let getObservedEthnicities: jest.Mock;
  let navigate: jest.Mock;
  let guard: EthnicityCodesGuard;
  let store: Store<State>;
  let apiErrors$: TestColdObservable;
  let apiSuccessCaseDetails$: TestColdObservable;
  const ethnicities = [
    {
      id: '4aaecac5-222b-402d-9047-84803679edac',
      ethnicityCode: '01',
      ethnicityDescription: 'desc 1'
    },
    {
      id: '5aaecac5-222b-402d-9047-84803679edac',
      ethnicityCode: '02',
      ethnicityDescription: 'desc 2'
    }
  ];

  beforeEach(() => {
    getObservedEthnicities = jest.fn();
    navigate = jest.fn();
    apiErrors$ = cold('-(#)');
    apiSuccessCaseDetails$ = cold('-(a|)', { a: ethnicities });

    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        EthnicityCodesGuard,
        {
          provide: ReferenceDataService,
          useValue: {
            getObservedEthnicities
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

    guard = TestBed.inject(EthnicityCodesGuard);
    store = TestBed.inject(Store);
  });

  describe('The store is empty', () => {
    beforeEach(() => {
      jest.spyOn(store, 'dispatch');
    });

    describe(' API returns data', () => {
      it('SUCCESS', () => {
        const activate$ = guard.canActivate();
        getObservedEthnicities.mockReturnValue(apiSuccessCaseDetails$);

        const first$ = cold('-(a|)', { a: true });
        const expected$ = cold('-(b|)', { a: first$, b: true });

        expect(activate$).toBeObservable(expected$);
        expect(getObservedEthnicities).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(new LoadObservedEthnicitiesSuccessAction(ethnicities));
      });
    });

    describe(' API fails', () => {
      it('when getEthnicities Fails', () => {
        const activate$ = guard.canActivate();
        getObservedEthnicities.mockReturnValue(apiErrors$);
        const expected$ = cold('-(a|)', { a: true });

        expect(activate$).toBeObservable(expected$);
        expect(getObservedEthnicities).toHaveBeenCalled();
      });
    });
  });

  describe('The store is populated', () => {
    beforeEach(() => {
      store.dispatch(new LoadObservedEthnicitiesSuccessAction(ethnicities));

      jest.spyOn(store, 'dispatch');
    });

    describe('and it contains Case Data for different ID', () => {
      beforeEach(() => {});

      describe(' API returns data', () => {
        it('SUCCESS', () => {
          const activate$ = guard.canActivate();
          getObservedEthnicities.mockReturnValue(apiSuccessCaseDetails$);

          const expected$ = cold('(a|)', { a: true });

          expect(activate$).toBeObservable(expected$);
          expect(getObservedEthnicities).not.toHaveBeenCalled();
          expect(store.dispatch).not.toHaveBeenCalledWith(new LoadObservedEthnicitiesSuccessAction(ethnicities));
        });
      });
    });
  });
});
