import { Store, StoreModule } from '@ngrx/store';
import { reducers, State } from '../../reducers';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { Case, Defendant, SjpService } from '../../../contexts/sjp';
import { LoadCaseSuccess } from '../../actions';
import { OnlinePleaGuard } from '../online-plea.guard';
import { MOCK_ONLINE_PLEA_DETAIL } from 'src/app/case-overview/__tests__/test-mock-data';
import { LoadOnlinePleaSuccess } from 'src/app/case-overview/case-overview.action';

describe('OnlinePleaGuard', () => {
  let guard: OnlinePleaGuard;
  let store: Store<State>;
  let getDefendantsOnlinePlea: jest.Mock;
  let navigate: jest.Mock;

  const routeSnapshot = {
    params: { caseId: 'caseId' }
  } as any;

  beforeEach(() => {
    getDefendantsOnlinePlea = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers)],
      providers: [
        OnlinePleaGuard,
        {
          provide: SjpService,
          useValue: {
            getDefendantsOnlinePlea
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

    guard = TestBed.get(OnlinePleaGuard);
    store = TestBed.get(Store);
    store.dispatch(new LoadCaseSuccess({ defendant: { id: 'defendantId' } as Defendant } as Case));
    jest.spyOn(store, 'dispatch');
  });

  it('should fetch the data remotely and resolve the route', () => {
    const onlinePlea = MOCK_ONLINE_PLEA_DETAIL;

    const defendantsOnlinePlea$ = cold('-a|', { a: onlinePlea });
    const expected$ = cold('-(c|)', { c: true });

    getDefendantsOnlinePlea.mockReturnValue(defendantsOnlinePlea$);
    const activate$ = guard.canActivate();

    expect(activate$).toBeObservable(expected$);
    expect(store.dispatch).toHaveBeenCalledWith(new LoadOnlinePleaSuccess(onlinePlea));
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should reject the activation and redirect when an error occurs during resolution', () => {
    const error$ = cold('---#');

    getDefendantsOnlinePlea.mockReturnValue(error$);
    navigate.mockReturnValue(Promise.resolve(true));

    // promise cannot be tested with marbles as Promise.resolve is asynchronous
    const activate$ = guard.canActivate();
    activate$.subscribe(val => {
      expect(val).toBeFalsy();
      expect(navigate).toHaveBeenCalledWith(['/technical-error']);
    });
  });
});
