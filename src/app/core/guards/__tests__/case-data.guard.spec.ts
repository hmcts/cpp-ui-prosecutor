import { provideStore, Store } from '@ngrx/store';
import { reducers, State } from '../../reducers';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { CaseDataGuard } from '../case-data.guard';
import { Case, SjpService } from '../../../contexts/sjp';
import { LoadCaseSuccess } from '../../actions';

describe('CaseDataGuard', () => {
  let guard: CaseDataGuard;
  let store: Store<State>;
  let getCaseById: jest.Mock;
  let navigate: jest.Mock;

  const snapshot = {
    params: { caseId: 'caseId' }
  } as any;

  beforeEach(() => {
    getCaseById = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        CaseDataGuard,
        {
          provide: SjpService,
          useValue: {
            getCaseById
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

    guard = TestBed.inject(CaseDataGuard);
    store = TestBed.inject(Store);
    jest.spyOn(store, 'dispatch');
  });

  it('should fetch the data remotely and resolve the route', () => {
    const kase = {
      id: 'caseId'
    } as Case;

    const kase$ = cold('-a|', { a: kase });
    const expected$ = cold('-(b|)', { b: true });

    getCaseById.mockReturnValue(kase$);
    const activate$ = guard.canActivate(snapshot);

    expect(activate$).toBeObservable(expected$);
    expect(store.dispatch).toHaveBeenCalledWith(new LoadCaseSuccess(kase));
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should reject the activation and redirect when an error occurs during resolution', () => {
    const error$ = cold('---#');

    getCaseById.mockReturnValue(error$);
    navigate.mockReturnValue(Promise.resolve(true));
    const activate$ = guard.canActivate(snapshot);
    // promise cannot be tested with marbles as Promise.resolve is asynchronous
    activate$.subscribe(val => {
      expect(val).toBeFalsy();
      expect(navigate).toHaveBeenCalledWith(['/technical-error']);
    });
  });
});
