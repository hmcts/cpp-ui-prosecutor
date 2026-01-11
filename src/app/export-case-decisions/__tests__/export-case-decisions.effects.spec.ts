import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { ExportCaseDecisionsEffects } from '../export-case-decisions.effects';
import { CaseCountResult, MiReportService } from '../../contexts/mi-report';
import { LoadResultedCaseCount, LoadResultedCaseCountSuccess } from '../export-case-decisions.actions';
import { cold, hot } from 'jasmine-marbles';
import { ApiError } from '../../core/actions';
import { provideMockActions } from '@ngrx/effects/testing';

describe('Export case results by date/effects', () => {
  let effects: ExportCaseDecisionsEffects;
  let actions$: Observable<any>;

  let getResultedCaseCount: jest.Mock;

  beforeEach(() => {
    getResultedCaseCount = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        ExportCaseDecisionsEffects,
        {
          provide: MiReportService,
          useValue: {
            getResultedCaseCount
          }
        },
        provideMockActions(() => actions$)
      ],
      teardown: { destroyAfterEach: false }
    });
    effects = TestBed.inject(ExportCaseDecisionsEffects);
    actions$ = TestBed.inject(Actions);
  });

  describe('loadCaseCount$', () => {
    it('should load resulted case count', () => {
      const action = new LoadResultedCaseCount({
        fromDate: '2018-10-10',
        toDate: '2018-10-25'
      });

      actions$ = hot('-a|', { a: action });
      const caseCountResult = {
        casesResultedCount: 10
      } as CaseCountResult;

      getResultedCaseCount.mockReturnValue(cold('-b|', { b: caseCountResult }));

      const expected$ = cold('--c|', {
        c: new LoadResultedCaseCountSuccess(caseCountResult)
      });

      expect(effects.loadCaseCount$).toBeObservable(expected$);
    });

    it('should emit api errors in case of any errors', () => {
      const error = { status: 404 };
      const action = new LoadResultedCaseCount({
        fromDate: '2018-10-10',
        toDate: '2018-10-25'
      });

      actions$ = hot('-a|', { a: action });

      getResultedCaseCount.mockReturnValue(cold('-#', {}, error));
      const expected$ = cold('--(b|)', {
        b: new ApiError(error)
      });

      expect(effects.loadCaseCount$).toBeObservable(expected$);
    });
  });
});
