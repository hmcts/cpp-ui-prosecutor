import { RemandStatusesGuard } from '../remand-statuses';
import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { reducers, State } from '../../reducers';
import { LoadRemandStatusesSuccess } from '../../actions';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { ReferenceDataService } from '../../../contexts/reference-data';

describe('Remand Stauses Guard', () => {
  let getRemandStatuses: jest.Mock;
  let navigate: jest.Mock;
  let guard: RemandStatusesGuard;
  let store: Store<State>;
  let apiErrors$: TestColdObservable;
  let apiSuccessCaseDetails$: TestColdObservable;

  const remandStatuses = [
    {
      id: 'dd4073b6-22be-3875-9d63-5da286bb3ece',
      seqNo: 10,
      statusCode: 'B',
      statusDescription: 'Conditional Bail'
    },
    {
      id: 'eaf18bf8-9569-3656-a4ab-64299f9bd513',
      seqNo: 20,
      statusCode: 'U',
      statusDescription: 'Unconditional Bail',
      hasConditions: true
    },
    {
      id: '12e69486-4d01-3403-a50a-7419ca040635',
      seqNo: 30,
      statusCode: 'C',
      statusDescription: 'Remanded into Custody'
    },
    {
      id: '86009c70-759d-3308-8de4-194886ff9a77',
      seqNo: 40,
      statusCode: 'A',
      statusDescription: 'Not applicable'
    },
    {
      id: '4dc146db-9d89-30bf-93b3-b22bc072d666',
      seqNo: 50,
      statusCode: 'L',
      statusDescription: 'Remanded into care of Local Authority'
    },
    {
      id: '34443c87-fa6f-34c0-897f-0cce45773df5',
      seqNo: 60,
      statusCode: 'P',
      statusDescription: 'Conditional Bail with Pre-Release conditions'
    },
    {
      id: '549336f9-2a07-3767-960f-107da761a698',
      seqNo: 70,
      statusCode: 'S',
      statusDescription: 'Remanded into Secure Accommodation'
    }
  ];

  beforeEach(() => {
    getRemandStatuses = jest.fn();
    navigate = jest.fn();
    apiErrors$ = cold('-(#)');
    apiSuccessCaseDetails$ = cold('-(a|)', { a: remandStatuses });

    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        RemandStatusesGuard,
        {
          provide: ReferenceDataService,
          useValue: {
            getRemandStatuses
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

    guard = TestBed.inject(RemandStatusesGuard);
    store = TestBed.inject(Store);
  });

  describe('The store is empty', () => {
    beforeEach(() => {
      jest.spyOn(store, 'dispatch');
    });

    describe(' API returns data', () => {
      it('SUCCESS', () => {
        const activate$ = guard.canActivate();
        getRemandStatuses.mockReturnValue(apiSuccessCaseDetails$);

        const first$ = cold('-(a|)', { a: true });
        const expected$ = cold('-(b|)', { a: first$, b: true });

        expect(activate$).toBeObservable(expected$);
        expect(getRemandStatuses).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(new LoadRemandStatusesSuccess(remandStatuses));
      });
    });

    describe(' API fails', () => {
      it('when getRemandStatuses Fails', () => {
        const activate$ = guard.canActivate();
        getRemandStatuses.mockReturnValue(apiErrors$);
        const expected$ = cold('-(a|)', { a: false });

        expect(activate$).toBeObservable(expected$);
        expect(getRemandStatuses).toHaveBeenCalled();
      });
    });
  });

  describe('The store is populated', () => {
    beforeEach(() => {
      store.dispatch(new LoadRemandStatusesSuccess(remandStatuses));

      jest.spyOn(store, 'dispatch');
    });

    describe('and it contains Case Data for different ID', () => {
      beforeEach(() => {});

      describe(' API returns data', () => {
        it('SUCCESS', () => {
          const activate$ = guard.canActivate();
          getRemandStatuses.mockReturnValue(apiSuccessCaseDetails$);

          const expected$ = cold('(a|)', { a: true });

          expect(activate$).toBeObservable(expected$);
          expect(getRemandStatuses).not.toHaveBeenCalled();
          expect(store.dispatch).not.toHaveBeenCalledWith(new LoadRemandStatusesSuccess(remandStatuses));
        });
      });
    });
  });
});
