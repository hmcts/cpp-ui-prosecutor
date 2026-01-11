import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { reducers, State } from '../../reducers';
import { LoadMotReasonsSuccess } from '../../actions';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { ReferenceDataService } from '../../../contexts/reference-data';
import { MotReasonsGuard } from '../mot-reasons';

describe('Mode of trail reasons Guard', () => {
  let getMotReasons: jest.Mock;
  let navigate: jest.Mock;
  let guard: MotReasonsGuard;
  let store: Store<State>;
  let apiErrors$: TestColdObservable;
  let apiSuccessCaseDetails$: TestColdObservable;

  const motReasons = [
    {
      id: 'fba9d881-64f3-32d9-909e-e770223212a0',
      seqNum: 10,
      code: '02',
      description: 'Indictable only (previous convictions / relevant firearms offence)'
    },
    {
      id: 'd47268e9-db2e-3aa3-827b-ba3afb7ff94a',
      seqNum: 20,
      code: '05',
      description: 'Court directs trial by jury'
    },
    {
      id: 'f8eb278a-8bce-373e-b365-b45e939da38a',
      seqNum: 30,
      code: '04',
      description: 'Defendant elects trial by jury'
    }
  ];

  beforeEach(() => {
    getMotReasons = jest.fn();
    navigate = jest.fn();
    apiErrors$ = cold('-(#)');
    apiSuccessCaseDetails$ = cold('-(a|)', { a: motReasons });

    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        MotReasonsGuard,
        {
          provide: ReferenceDataService,
          useValue: {
            getMotReasons
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

    guard = TestBed.inject(MotReasonsGuard);
    store = TestBed.inject(Store);
  });

  describe('The store is empty', () => {
    beforeEach(() => {
      jest.spyOn(store, 'dispatch');
    });

    describe(' API returns data', () => {
      it('SUCCESS', () => {
        const activate$ = guard.canActivate();
        getMotReasons.mockReturnValue(apiSuccessCaseDetails$);

        const first$ = cold('-(a|)', { a: true });
        const expected$ = cold('-(b|)', { a: first$, b: true });

        expect(activate$).toBeObservable(expected$);
        expect(getMotReasons).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(new LoadMotReasonsSuccess(motReasons));
      });
    });

    describe(' API fails', () => {
      it('when getMotReasons Fails', () => {
        const activate$ = guard.canActivate();
        getMotReasons.mockReturnValue(apiErrors$);
        const expected$ = cold('-(a|)', { a: false });

        expect(activate$).toBeObservable(expected$);
        expect(getMotReasons).toHaveBeenCalled();
      });
    });
  });

  describe('The store is populated', () => {
    beforeEach(() => {
      store.dispatch(new LoadMotReasonsSuccess(motReasons));

      jest.spyOn(store, 'dispatch');
    });

    describe('and it contains Case Data for different ID', () => {
      beforeEach(() => {});

      describe(' API returns data', () => {
        it('SUCCESS', () => {
          const activate$ = guard.canActivate();
          getMotReasons.mockReturnValue(apiSuccessCaseDetails$);

          const expected$ = cold('(a|)', { a: true });

          expect(activate$).toBeObservable(expected$);
          expect(getMotReasons).not.toHaveBeenCalled();
          expect(store.dispatch).not.toHaveBeenCalledWith(new LoadMotReasonsSuccess(motReasons));
        });
      });
    });
  });
});
