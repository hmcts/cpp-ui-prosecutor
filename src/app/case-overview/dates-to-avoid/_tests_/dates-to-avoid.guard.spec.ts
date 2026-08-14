import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { DatesToAvoidGuard } from '../dates-to-avoid.guard';
import { Case } from '../../../contexts/sjp';
import { initialState } from '../../../core/reducers/api.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('DatesToAvoidGuard', () => {
  let guard: DatesToAvoidGuard;
  let store: MockStore<{ case: Case }>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatesToAvoidGuard, provideMockStore({ initialState })],
      teardown: { destroyAfterEach: false }
    });

    guard = TestBed.inject(DatesToAvoidGuard);
    store = TestBed.inject(MockStore);
    jest.spyOn(store, 'dispatch');
  });

  it('should fetch the data from store and resolve the route', () => {
    const kase = {
      assigned: false,
      completed: false
    } as Case;

    store.setState({ case: kase });
    const expected = cold('(a|)', { a: true });
    expect(guard.canActivate()).toBeObservable(expected);
  });

  it('should reject the activation when case is assigned', () => {
    const kase = {
      assigned: true,
      completed: false
    } as Case;

    store.setState({ case: kase });
    const expected = cold('(a|)', { a: false });
    expect(guard.canActivate()).toBeObservable(expected);
  });

  it('should reject the activation when case is completed', () => {
    const kase = {
      assigned: false,
      completed: true
    } as Case;

    store.setState({ case: kase });
    const expected = cold('(a|)', { a: false });
    expect(guard.canActivate()).toBeObservable(expected);
  });
});
