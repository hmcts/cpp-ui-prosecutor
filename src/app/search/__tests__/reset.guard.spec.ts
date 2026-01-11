import { provideStore, Store } from '@ngrx/store';
import { reducers, State } from '../../reducers';
import { TestBed } from '@angular/core/testing';
import { ResetSearchResult } from '../search.action';
import { ResetGuard } from '../reset.guard';

describe('ResetGuard', () => {
  let guard: ResetGuard;
  let store: Store<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore(reducers, { runtimeChecks: {} }), ResetGuard],
      teardown: { destroyAfterEach: false }
    });

    guard = TestBed.inject(ResetGuard);
    store = TestBed.inject(Store);
    jest.spyOn(store, 'dispatch');
  });

  it('should dispatch reset event to reset data', () => {
    guard.canActivate();
    expect(store.dispatch).toHaveBeenCalledWith(new ResetSearchResult());
  });
});
