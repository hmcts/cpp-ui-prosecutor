import { TestBed } from '@angular/core/testing';
import { Store, select, provideStore } from '@ngrx/store';
import { State, reducers } from '../../reducers';
import { LoadManualCaseDetailsSuccess, StoreManualCaseDefendantsEitherWayOffences } from '../../actions';
import { ManualCase } from '../../model/manual-case';
import {
  getManualCase,
  getManualCaseType,
  getManualCaseDetails,
  getManualCaseDefendants
} from '../manual-case-details';
import { ManualCaseAndDocuments } from '../../model';

let store: Store<State>;

describe('Manual case details selectors', () => {
  const caseDetails = {
    caseId: 'manual-case-id-001',
    initiationCode: 'S',
    summonsCode: 'E'
  } as ManualCase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore(reducers, { runtimeChecks: {} })]
    });

    store = TestBed.inject(Store);
  });

  it('should return default state of store', () => {
    let result;
    store.pipe(select(getManualCaseDetails)).subscribe(value => (result = value));
    expect(result).toEqual({ initiationCode: 'J' });
  });

  it('should getManualCaseType', () => {
    let result;
    store.pipe(select(getManualCaseType)).subscribe(value => (result = value));
    expect(result).toEqual('J');
  });

  it('should getManualCase', () => {
    let result;
    store.pipe(select(getManualCase)).subscribe(value => (result = value));
    expect(result).toEqual({
      caseDetails: { initiationCode: 'J' },
      channel: 'MCC',
      defendants: []
    });
  });

  it('should return getManualCaseDefendants', () => {
    let result;
    store.pipe(select(getManualCaseDefendants)).subscribe(value => (result = value));

    store.dispatch(new StoreManualCaseDefendantsEitherWayOffences({ payload: [] } as any));
    expect(result).toEqual([]);
  });

  it('should return manual-case in the correct state when getManualCaseDetails is called', () => {
    let result;

    store.pipe(select(getManualCaseDetails)).subscribe(value => (result = value));
    store.dispatch(new LoadManualCaseDetailsSuccess({ caseDetails } as ManualCaseAndDocuments));

    expect(result).toEqual(caseDetails);
  });
});
