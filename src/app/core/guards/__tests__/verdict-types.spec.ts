import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { reducers, State } from '../../reducers';
import { LoadVerdictTypesSuccess } from '../../actions';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { ReferenceDataService } from '../../../contexts/reference-data';
import { VerdictTypesGuard } from '../verdict-types';

describe('Verdict types Guard', () => {
  let getVerdictTypes: jest.Mock;
  let navigate: jest.Mock;
  let guard: VerdictTypesGuard;
  let store: Store<State>;
  let apiErrors$: TestColdObservable;
  let apiSuccessCaseDetails$: TestColdObservable;

  const verdictTypes = [
    {
      id: 'c3d85040-c090-3150-898c-0532b926282f',
      description: 'Found not guilty',
      category: 'Not Guilty',
      categoryType: 'NOT_GUILTY',
      sequence: 20,
      jurisdiction: 'CROWN',
      verdictCode: 'N',
      jurySplitAvailable: 'No',
      cjsVerdictCode: 'N'
    },
    {
      id: 'dfd71ee7-039d-3d93-ae37-98ef38aec6e4',
      description: 'Found guilty',
      category: 'Guilty',
      categoryType: 'GUILTY_BY_JURY_CONVICTED',
      sequence: 10,
      jurisdiction: 'CROWN',
      verdictCode: 'G',
      jurySplitAvailable: 'Yes',
      cjsVerdictCode: 'G'
    },
    {
      id: '898382ec-9f37-3b87-ba16-9aeb49b8c075',
      description: 'Found not guilty - prosecution offers no evidence',
      category: 'Not Guilty',
      categoryType: 'NOT_GUILTY',
      sequence: 95,
      jurisdiction: 'MAGISTRATES',
      verdictCode: 'NGNE',
      jurySplitAvailable: 'No',
      cjsVerdictCode: 'N'
    },
    {
      id: '8f14e45f-ceea-367a-9a36-dedd4bea2543',
      description: 'Found not guilty but guilty of lesser offence not charged namely',
      category: 'Guilty but of lesser offence',
      categoryType: 'GUILTY_BUT_OF_LESSER_OFFENCE_BY_JURY_CONVICTED',
      sequence: 70,
      jurisdiction: 'CROWN',
      verdictCode: 'NGLOC',
      jurySplitAvailable: 'Yes',
      cjsVerdictCode: 'A'
    },
    {
      id: 'c4ca4238-a0b9-3382-8dcc-509a6f75849b',
      description: 'Found guilty',
      category: 'Guilty',
      categoryType: 'GUILTY',
      sequence: 10,
      jurisdiction: 'MAGISTRATES',
      verdictCode: 'G',
      jurySplitAvailable: 'No',
      cjsVerdictCode: 'G'
    },
    {
      id: 'c81e728d-9d4c-3f63-af06-7f89cc14862c',
      description: 'Found not guilty',
      category: 'Not Guilty',
      categoryType: 'NOT_GUILTY',
      sequence: 20,
      jurisdiction: 'MAGISTRATES',
      verdictCode: 'N',
      jurySplitAvailable: 'No',
      cjsVerdictCode: 'N'
    }
  ];

  beforeEach(() => {
    getVerdictTypes = jest.fn();
    navigate = jest.fn();
    apiErrors$ = cold('-(#)');
    apiSuccessCaseDetails$ = cold('-(a|)', { a: verdictTypes });

    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        VerdictTypesGuard,
        {
          provide: ReferenceDataService,
          useValue: {
            getVerdictTypes
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

    guard = TestBed.inject(VerdictTypesGuard);
    store = TestBed.inject(Store);
  });

  describe('The store is empty', () => {
    beforeEach(() => {
      jest.spyOn(store, 'dispatch');
    });

    describe(' API returns data', () => {
      it('SUCCESS', () => {
        const activate$ = guard.canActivate();
        getVerdictTypes.mockReturnValue(apiSuccessCaseDetails$);

        const first$ = cold('-(a|)', { a: true });
        const expected$ = cold('-(b|)', { a: first$, b: true });

        expect(activate$).toBeObservable(expected$);
        expect(getVerdictTypes).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(new LoadVerdictTypesSuccess(verdictTypes));
      });
    });

    describe(' API fails', () => {
      it('when getVerdictTypes Fails', () => {
        const activate$ = guard.canActivate();
        getVerdictTypes.mockReturnValue(apiErrors$);
        const expected$ = cold('-(a|)', { a: false });

        expect(activate$).toBeObservable(expected$);
        expect(getVerdictTypes).toHaveBeenCalled();
      });
    });
  });

  describe('The store is populated', () => {
    beforeEach(() => {
      store.dispatch(new LoadVerdictTypesSuccess(verdictTypes));

      jest.spyOn(store, 'dispatch');
    });

    describe('and it contains Case Data for different ID', () => {
      beforeEach(() => {});

      describe(' API returns data', () => {
        it('SUCCESS', () => {
          const activate$ = guard.canActivate();
          getVerdictTypes.mockReturnValue(apiSuccessCaseDetails$);

          const expected$ = cold('(a|)', { a: true });

          expect(activate$).toBeObservable(expected$);
          expect(getVerdictTypes).not.toHaveBeenCalled();
          expect(store.dispatch).not.toHaveBeenCalledWith(new LoadVerdictTypesSuccess(verdictTypes));
        });
      });
    });
  });
});
