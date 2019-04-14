import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ExportCaseDecisionsEffects } from '../export-case-decisions.effects';
import { CaseCountResult, MiReportService } from '../../contexts/mi-report';
import { LoadResultedCaseCount, LoadResultedCaseCountSuccess } from '../export-case-decisions.actions';
import { cold, hot } from 'jasmine-marbles';
import { ApiError } from '../../core/actions';

export class MockActions extends Actions {
  constructor() {
    super();
  }

  set stream(source: Observable<any>) {
    // tslint:disable-next-line
    this.source = source;
  }
}

describe('Export case results by date/effects', () => {
  let effects: ExportCaseDecisionsEffects;
  let actions$: MockActions;

  let getResultedCaseCount: jest.Mock;

  beforeEach(() => {
    getResultedCaseCount = jest.fn();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ExportCaseDecisionsEffects,
        {
          provide: MiReportService,
          useValue: {
            getResultedCaseCount
          }
        },
        {
          provide: Actions,
          useClass: MockActions
        }
      ]
    });
    effects = TestBed.get(ExportCaseDecisionsEffects);
    actions$ = TestBed.get(Actions);
  });

  describe('loadCaseCount$', () => {
    it('should load resulted case count', () => {
      const action = new LoadResultedCaseCount({
        fromDate: '2018-10-10',
        toDate: '2018-10-25'
      });

      actions$.stream = hot('-a|', { a: action });
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

      actions$.stream = hot('-a|', { a: action });

      getResultedCaseCount.mockReturnValue(cold('-#', {}, error));
      const expected$ = cold('--(b|)', {
        b: new ApiError(error)
      });

      expect(effects.loadCaseCount$).toBeObservable(expected$);
    });
  });
});
