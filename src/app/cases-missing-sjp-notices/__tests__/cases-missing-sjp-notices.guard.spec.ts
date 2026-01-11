import { CasesMissingSjpNoticesGuard } from '../cases-missing-sjp-notices.guard';
import { reducers, State } from '../../reducers';
import { provideStore, Store } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { CaseSummary, DefendantSummary, SjpService } from '../../contexts/sjp';
import { Router } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { LoadCasesMissingSjpNoticeSuccess } from '../cases-missing-sjp-notices.action';

describe('CasesMissingSjpNoticeGuard', () => {
  let casesMissingSjpNoticeGuard: CasesMissingSjpNoticesGuard;
  let store: Store<State>;
  let getCasesMissingSjpNotice: jest.Mock;
  let navigate: jest.Mock;

  beforeEach(() => {
    getCasesMissingSjpNotice = jest.fn();
    navigate = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        CasesMissingSjpNoticesGuard,
        {
          provide: SjpService,
          useValue: {
            getCasesMissingSjpNotice
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

    casesMissingSjpNoticeGuard = TestBed.inject(CasesMissingSjpNoticesGuard);
    store = TestBed.inject(Store);
    jest.spyOn(store, 'dispatch');
  });

  it('should call the service and load data', () => {
    const mockCasesMissingNotice = [
      {
        id: 'caseId1',
        urn: '22C22222222',
        defendant: {
          id: 'defendantId1',
          title: 'Mr',
          firstName: 'Abel',
          lastName: 'Krumps',
          dateOfBirth: '1972-01-01',
          gender: 'Male',
          nationalInsuranceNumber: 'SR67854OP'
        } as DefendantSummary,
        prosecutingAuthority: 'TFL',
        postingDate: '2019-05-03'
      } as CaseSummary,
      {
        id: 'caseId2',
        urn: '33C2DF22222',
        defendant: {
          id: 'defendantId2',
          title: 'Mrs',
          firstName: 'Linda',
          lastName: 'Craig',
          dateOfBirth: '1980-07-12',
          gender: 'Female',
          nationalInsuranceNumber: 'SR63344OQ'
        } as DefendantSummary,
        prosecutingAuthority: 'TFL',
        postingDate: '2019-05-03'
      } as CaseSummary
    ];

    const casesMissingSjpNotice$ = cold('-a|', { a: mockCasesMissingNotice });
    const expected$ = cold('-(b|)', { b: true });

    getCasesMissingSjpNotice.mockReturnValue(casesMissingSjpNotice$);

    const activate$ = casesMissingSjpNoticeGuard.canActivate();

    expect(activate$).toBeObservable(expected$);
    expect(store.dispatch).toHaveBeenCalledWith(new LoadCasesMissingSjpNoticeSuccess(mockCasesMissingNotice));
    expect(navigate).not.toHaveBeenCalled();
  });
});
