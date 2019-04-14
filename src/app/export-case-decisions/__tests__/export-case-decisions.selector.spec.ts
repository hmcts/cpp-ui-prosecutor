import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { exportCaseDecisionsReducer } from '../export-case-decisions.reducer';
import { LoadResultedCaseCountSuccess } from '../export-case-decisions.actions';
import { CaseCountResult } from '../../contexts/mi-report';
import { FeatureState, getResultedCaseCount } from '../export-case-decisions.selector';
import { reducers } from '../../reducers';
import { take } from 'rxjs/operators';

describe('export case results by date/selectors', () => {
  let state: FeatureState;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers), StoreModule.forFeature('resultedCaseCount', exportCaseDecisionsReducer)]
    });
    const store = TestBed.get(Store);
    store.dispatch(
      new LoadResultedCaseCountSuccess({
        casesResultedCount: 10
      } as CaseCountResult)
    );
    store.pipe(take(1)).subscribe(val => (state = val));
  });

  describe('getResultedCaseCount', () => {
    it('should select resulted case count', () => {
      expect(getResultedCaseCount(state)).toMatchSnapshot();
    });
  });
});
