import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { reducers, State } from '../../reducers';
import { LoadEthnicitiesSuccessAction } from '../../core';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { EthnicitiesGuard } from './ethnicities.guard';
import { ReferenceDataService } from '../../contexts/reference-data';

describe('Ethnicities Guard', () => {
  let getEthnicities: jest.Mock;
  let navigate: jest.Mock;
  let guard: EthnicitiesGuard;
  let store: Store<State>;
  let apiErrors$: TestColdObservable;
  let apiSuccessCaseDetails$: TestColdObservable;
  const ethnicities = [
    {
      id: '4aaecac5-222b-402d-9047-84803679edac',
      sequence: 1,
      code: 'code',
      description: 'descrp1'
    },
    {
      id: '5aaecac5-222b-402d-9047-84803679edac',
      sequence: 2,
      code: 'code2',
      description: 'descrp2'
    }
  ];

  beforeEach(() => {
    getEthnicities = jest.fn();
    navigate = jest.fn();
    apiErrors$ = cold('-(#)');
    apiSuccessCaseDetails$ = cold('-(a|)', { a: ethnicities });

    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        EthnicitiesGuard,
        {
          provide: ReferenceDataService,
          useValue: {
            getEthnicities
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

    guard = TestBed.inject(EthnicitiesGuard);
    store = TestBed.inject(Store);
  });

  describe('The store is empty', () => {
    beforeEach(() => {
      jest.spyOn(store, 'dispatch');
    });

    describe(' API returns data', () => {
      it('SUCCESS', () => {
        const activate$ = guard.canActivate();
        getEthnicities.mockReturnValue(apiSuccessCaseDetails$);

        const first$ = cold('-(a|)', { a: true });
        const expected$ = cold('-(b|)', { a: first$, b: true });

        expect(activate$).toBeObservable(expected$);
        expect(getEthnicities).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(new LoadEthnicitiesSuccessAction(ethnicities));
      });
    });

    describe(' API fails', () => {
      it('when getEthnicities Fails', () => {
        const activate$ = guard.canActivate();
        getEthnicities.mockReturnValue(apiErrors$);
        const expected$ = cold('-(a|)', { a: true });

        expect(activate$).toBeObservable(expected$);
        expect(getEthnicities).toHaveBeenCalled();
      });
    });
  });

  describe('The store is populated', () => {
    beforeEach(() => {
      store.dispatch(new LoadEthnicitiesSuccessAction(ethnicities));

      jest.spyOn(store, 'dispatch');
    });

    describe('and it contains Case Data for different ID', () => {
      beforeEach(() => {});

      describe(' API returns data', () => {
        it('SUCCESS', () => {
          const activate$ = guard.canActivate();
          getEthnicities.mockReturnValue(apiSuccessCaseDetails$);

          const expected$ = cold('(a|)', { a: true });

          expect(activate$).toBeObservable(expected$);
          expect(getEthnicities).not.toHaveBeenCalled();
          expect(store.dispatch).not.toHaveBeenCalledWith(new LoadEthnicitiesSuccessAction(ethnicities));
        });
      });
    });
  });
});
