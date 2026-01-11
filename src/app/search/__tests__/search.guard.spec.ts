import { provideStore, Store } from '@ngrx/store';
import { reducers, State } from '../../reducers';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { SearchGuard } from '../search.guard';
import { SearchResult, SjpService } from '../../contexts/sjp';
import { SearchSuccess } from '../search.action';

describe('SearchGuard', () => {
  let guard: SearchGuard;
  let store: Store<State>;
  let getCasesDetails: jest.Mock;
  let navigate: jest.Mock;

  const snapshot = {
    params: { keyword: 'keyword' }
  } as any;

  beforeEach(() => {
    getCasesDetails = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        SearchGuard,
        {
          provide: SjpService,
          useValue: {
            getCasesDetails
          }
        },
        {
          provide: Router,
          useValue: {
            navigate
          }
        }
      ],
      teardown: { destroyAfterEach: false }
    });

    guard = TestBed.inject(SearchGuard);
    store = TestBed.inject(Store);
    jest.spyOn(store, 'dispatch');
  });

  it('should fetch the data remotely and resolve the route if its not set', () => {
    const searchResult = {
      foundCasesWithOutdatedDefendantsName: true
    } as SearchResult;

    const searchResult$ = cold('-a|', { a: searchResult });
    const expected$ = cold('-(b|)', { b: true });

    getCasesDetails.mockReturnValue(searchResult$);
    const activate$ = guard.canActivate(snapshot);

    expect(activate$).toBeObservable(expected$);
    expect(store.dispatch).toHaveBeenCalledWith(new SearchSuccess({ ...searchResult, keyword: 'keyword' }));
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should resolve to false and navigate to unauthorised access page on 403 response', () => {
    const error$ = cold('--#', { status: 403 });

    getCasesDetails.mockReturnValue(error$);

    const activate$ = guard.canActivate(snapshot);

    expect(store.dispatch).not.toHaveBeenCalled();
    navigate.mockReturnValue(Promise.resolve(true));
    activate$.subscribe(value => {
      expect(value).toBeFalsy();
      expect(navigate).toHaveBeenCalledWith(['/unauthorised-access']);
    });
  });

  it('should resolve to false and navigate to not found page on 404 response', () => {
    const error$ = cold('--#', { status: 404 });

    getCasesDetails.mockReturnValue(error$);

    const activate$ = guard.canActivate(snapshot);

    expect(store.dispatch).not.toHaveBeenCalled();
    navigate.mockReturnValue(Promise.resolve(true));
    activate$.subscribe(value => {
      expect(value).toBeFalsy();
      expect(navigate).toHaveBeenCalledWith(['/page-not-found']);
    });
  });

  it('should reject the activation and redirect when an error occurs during resolution', () => {
    const error$ = cold('---#');

    getCasesDetails.mockReturnValue(error$);
    navigate.mockReturnValue(Promise.resolve(true));
    const activate$ = guard.canActivate(snapshot);

    // promise cannot be tested with marbles as Promise.resolve is asynchronous
    activate$.subscribe(val => {
      expect(val).toBeFalsy();
      expect(navigate).toHaveBeenCalledWith(['/technical-error']);
    });
  });
});
