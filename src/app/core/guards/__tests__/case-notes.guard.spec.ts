import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';
import { reducers, State } from '../../reducers';
import { SjpService } from '../../../contexts/sjp';
import { Router } from '@angular/router';
import { CaseNotesGuard } from '../case-notes.guard';
import { cold } from 'jasmine-marbles';
import { LoadCaseNotesSuccess } from '../../actions';
import { MOCK_CASE_NOTES } from '../../../case-overview/__tests__/test-mock-data';

describe('CaseNotesGuard', () => {
  let getCaseNotes;
  let navigate;
  let guard: CaseNotesGuard;
  let store: Store<State>;

  const routeSnapshot = {
    params: { caseId: 'caseId' }
  } as any;

  beforeEach(() => {
    getCaseNotes = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        CaseNotesGuard,
        {
          provide: SjpService,
          useValue: {
            getCaseNotes
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

    guard = TestBed.inject(CaseNotesGuard);
    store = TestBed.inject(Store);
    jest.spyOn(store, 'dispatch');
  });

  it('Should get case notes', () => {
    const caseNotes$ = cold('-a|', { a: MOCK_CASE_NOTES });
    const expected$ = cold('-(b|)', { b: true });

    getCaseNotes.mockReturnValue(caseNotes$);
    const activate$ = guard.canActivate(routeSnapshot);

    expect(activate$).toBeObservable(expected$);
    expect(store.dispatch).toHaveBeenCalledWith(new LoadCaseNotesSuccess(MOCK_CASE_NOTES));
    expect(navigate).not.toHaveBeenCalled();
  });

  it('should redirect when an error occurs', () => {
    const error$ = cold('--#');

    getCaseNotes.mockReturnValue(error$);
    navigate.mockReturnValue(Promise.resolve(true));
    const activate$ = guard.canActivate(routeSnapshot);
    activate$.subscribe(val => {
      expect(val).toBeFalsy();
      expect(navigate).toHaveBeenCalledWith(['/technical-error']);
    });
  });
});
