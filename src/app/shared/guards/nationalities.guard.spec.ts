import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { reducers } from '../../reducers';
import { State, LoadNationalitieSuccessAction } from '../../core';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { NationalitiesGuard } from './nationalities.guard';
import { ReferenceDataService } from '../../contexts/reference-data';

describe('Nationalities Guard', () => {
  let getNationalities: jest.Mock;
  let navigate: jest.Mock;
  let guard: NationalitiesGuard;
  let store: Store<State>;
  let apiErrors$: TestColdObservable;
  let apiSuccessCaseDetails$: TestColdObservable;
  const nationalties = [
    {
      id: '4aaecac5-222b-402d-9047-84803679edac',
      cjsCode: 12,
      isoCode: '12',
      govCode: '12',
      countryName: 'UK',
      nationality: 'British'
    }
  ];

  beforeEach(() => {
    getNationalities = jest.fn();
    navigate = jest.fn();
    apiErrors$ = cold('-(#)');
    apiSuccessCaseDetails$ = cold('-(a|)', { a: nationalties });

    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        NationalitiesGuard,
        {
          provide: ReferenceDataService,
          useValue: {
            getNationalities
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

    guard = TestBed.inject(NationalitiesGuard);
    store = TestBed.inject(Store);
  });

  describe('The store is empty', () => {
    beforeEach(() => {
      jest.spyOn(store, 'dispatch');
    });

    describe(' API returns data', () => {
      it('SUCCESS', () => {
        const activate$ = guard.canActivate();
        getNationalities.mockReturnValue(apiSuccessCaseDetails$);

        const first$ = cold('-(a|)', { a: true });
        const expected$ = cold('-(b|)', { a: first$, b: true });

        expect(activate$).toBeObservable(expected$);
        expect(getNationalities).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(new LoadNationalitieSuccessAction(nationalties));
      });
    });

    describe(' API fails', () => {
      it('when getEthnicities Fails', () => {
        const activate$ = guard.canActivate();
        getNationalities.mockReturnValue(apiErrors$);
        const expected$ = cold('-(a|)', { a: true });

        expect(activate$).toBeObservable(expected$);
        expect(getNationalities).toHaveBeenCalled();
      });
    });
  });

  describe('The store is populated', () => {
    beforeEach(() => {
      store.dispatch(new LoadNationalitieSuccessAction(nationalties));

      jest.spyOn(store, 'dispatch');
    });

    describe('and it contains Case Data for different ID', () => {
      beforeEach(() => {});

      describe(' API returns data', () => {
        it('SUCCESS', () => {
          const activate$ = guard.canActivate();
          getNationalities.mockReturnValue(apiSuccessCaseDetails$);

          const expected$ = cold('(a|)', { a: true });

          expect(activate$).toBeObservable(expected$);
          expect(getNationalities).not.toHaveBeenCalled();
          expect(store.dispatch).not.toHaveBeenCalledWith(new LoadNationalitieSuccessAction(nationalties));
        });
      });
    });
  });
});
