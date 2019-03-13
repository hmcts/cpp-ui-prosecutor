import { CaseOverviewGuard } from '../case-overview.guard';
import { Store, StoreModule } from '@ngrx/store';
import { reducers, State } from '../../reducers';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { GetCaseByIdSuccess } from '../case-overview.action';
import { Case, SjpService } from '../../contexts/sjp';

describe('CaseOverviewGuard', () => {
  let guard: CaseOverviewGuard;
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
      imports: [StoreModule.forRoot(reducers)],
      providers: [
        CaseOverviewGuard,
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
      ]
    });

    guard = TestBed.get(CaseOverviewGuard);
    store = TestBed.get(Store);
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
    expect(store.dispatch).toHaveBeenCalledWith(new GetCaseByIdSuccess(kase));
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should reject the activation and redirect when an error occurs during resolution', () => {
    const error$ = cold('---#');
    const expected$ = cold('---(a|)', { a: false });

    getCaseById.mockReturnValue(error$);
    const activate$ = guard.canActivate(snapshot);

    expect(activate$).toBeObservable(expected$);
    expect(navigate).toHaveBeenCalledWith(['/technical-error']);
  });
});
