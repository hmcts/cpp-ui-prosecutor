import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { reducers, State } from '../../reducers';
import { LoadPoliceForcesSuccessAction } from '../../actions';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { PoliceForcesGuard } from '../police-forces';
import { ReferenceDataService } from '../../../contexts/reference-data';

describe('Police Forces Guard', () => {
  let getPoliceForces: jest.Mock;
  let navigate: jest.Mock;
  let guard: PoliceForcesGuard;
  let store: Store<State>;
  let apiErrors$: TestColdObservable;
  let apiSuccessCaseDetails$: TestColdObservable;
  const policeForces = [
    {
      id: '47bb2c5d-cde9-3c13-9ae3-b3f5be9177e7',
      sequence: 3,
      policeForceCode: '2',
      policeForceName: 'London',
      validForSpiOut: true
    },
    {
      id: '97c89e9d-57dc-3936-a88f-9160a4572e3a',
      sequence: 4,
      policeForceCode: '3',
      policeForceName: 'Cumbria',
      validForSpiOut: true,
      oucodeL2Code: '03'
    }
  ];

  beforeEach(() => {
    getPoliceForces = jest.fn();
    navigate = jest.fn();
    apiErrors$ = cold('-(#)');
    apiSuccessCaseDetails$ = cold('-(a|)', { a: policeForces });

    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        PoliceForcesGuard,
        {
          provide: ReferenceDataService,
          useValue: {
            getPoliceForces
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

    guard = TestBed.inject(PoliceForcesGuard);
    store = TestBed.inject(Store);
  });

  describe('The store is empty', () => {
    beforeEach(() => {
      jest.spyOn(store, 'dispatch');
    });

    describe(' API returns data', () => {
      it('SUCCESS', () => {
        const activate$ = guard.canActivate();
        getPoliceForces.mockReturnValue(apiSuccessCaseDetails$);

        const first$ = cold('-(a|)', { a: true });
        const expected$ = cold('-(b|)', { a: first$, b: true });

        expect(activate$).toBeObservable(expected$);
        expect(getPoliceForces).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(new LoadPoliceForcesSuccessAction(policeForces));
      });
    });

    describe(' API fails', () => {
      it('when getPoliceForces Fails', () => {
        const activate$ = guard.canActivate();
        getPoliceForces.mockReturnValue(apiErrors$);
        const expected$ = cold('-(a|)', { a: false });

        expect(activate$).toBeObservable(expected$);
        expect(getPoliceForces).toHaveBeenCalled();
      });
    });
  });

  describe('The store is populated', () => {
    beforeEach(() => {
      store.dispatch(new LoadPoliceForcesSuccessAction(policeForces));

      jest.spyOn(store, 'dispatch');
    });

    describe('and it contains Case Data for different ID', () => {
      beforeEach(() => {});

      describe(' API returns data', () => {
        it('SUCCESS', () => {
          const activate$ = guard.canActivate();
          getPoliceForces.mockReturnValue(apiSuccessCaseDetails$);

          const expected$ = cold('(a|)', { a: true });

          expect(activate$).toBeObservable(expected$);
          expect(getPoliceForces).not.toHaveBeenCalled();
          expect(store.dispatch).not.toHaveBeenCalledWith(new LoadPoliceForcesSuccessAction(policeForces));
        });
      });
    });
  });
});
