import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { reducers, State } from '../../reducers';
import { LoadAlcoholLevelMethodsSuccessAction } from '../../actions';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { AlcoholLevelMethodsGuard } from '../alcohol-level-methods';
import { ReferenceDataService } from '../../../contexts/reference-data';

describe('Alcohol Level Methods Guard', () => {
  let getAlcoholLevelMethod: jest.Mock;
  let navigate: jest.Mock;
  let guard: AlcoholLevelMethodsGuard;
  let store: Store<State>;
  let apiErrors$: TestColdObservable;
  let apiSuccessCaseDetails$: TestColdObservable;
  const alcoholLevelMethods = [
    {
      id: 'f833257e-e355-4c72-838b-d236db530226',
      methodCode: 'B01',
      methodDescription: 'Breath'
    },
    {
      id: 'd15a29d0-68b4-4a4f-8c46-c1316d7238eb',
      methodCode: 'B02',
      methodDescription: 'Blood'
    }
  ];

  beforeEach(() => {
    getAlcoholLevelMethod = jest.fn();
    navigate = jest.fn();
    apiErrors$ = cold('-(#)');
    apiSuccessCaseDetails$ = cold('-(a|)', { a: alcoholLevelMethods });

    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        AlcoholLevelMethodsGuard,
        {
          provide: ReferenceDataService,
          useValue: {
            getAlcoholLevelMethod
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

    guard = TestBed.inject(AlcoholLevelMethodsGuard);
    store = TestBed.inject(Store);
  });

  describe('The store is empty', () => {
    beforeEach(() => {
      jest.spyOn(store, 'dispatch');
    });

    describe(' API returns data', () => {
      it('SUCCESS', () => {
        const activate$ = guard.canActivate();
        getAlcoholLevelMethod.mockReturnValue(apiSuccessCaseDetails$);

        const first$ = cold('-(a|)', { a: true });
        const expected$ = cold('-(b|)', { a: first$, b: true });

        expect(activate$).toBeObservable(expected$);
        expect(getAlcoholLevelMethod).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(new LoadAlcoholLevelMethodsSuccessAction(alcoholLevelMethods));
      });
    });

    describe(' API fails', () => {
      it('when getAlcoholLevelMethod Fails', () => {
        const activate$ = guard.canActivate();
        getAlcoholLevelMethod.mockReturnValue(apiErrors$);
        const expected$ = cold('-(a|)', { a: false });

        expect(activate$).toBeObservable(expected$);
        expect(getAlcoholLevelMethod).toHaveBeenCalled();
      });
    });
  });

  describe('The store is populated', () => {
    beforeEach(() => {
      store.dispatch(new LoadAlcoholLevelMethodsSuccessAction(alcoholLevelMethods));

      jest.spyOn(store, 'dispatch');
    });

    describe('and it contains Case Data for different ID', () => {
      beforeEach(() => {});

      describe(' API returns data', () => {
        it('SUCCESS', () => {
          const activate$ = guard.canActivate();
          getAlcoholLevelMethod.mockReturnValue(apiSuccessCaseDetails$);

          const expected$ = cold('(a|)', { a: true });

          expect(activate$).toBeObservable(expected$);
          expect(getAlcoholLevelMethod).not.toHaveBeenCalled();
          expect(store.dispatch).not.toHaveBeenCalledWith(
            new LoadAlcoholLevelMethodsSuccessAction(alcoholLevelMethods)
          );
        });
      });
    });
  });
});
