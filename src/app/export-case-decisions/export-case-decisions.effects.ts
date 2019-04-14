import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  LoadResultedCaseCount,
  LoadResultedCaseCountSuccess,
  ResultedCaseCountActionTypes
} from './export-case-decisions.actions';
import { MiReportService } from '../contexts/mi-report';
import { ApiError } from '../core/actions/api';

@Injectable()
export class ExportCaseDecisionsEffects {
  @Effect()
  loadCaseCount$: Observable<Action> = this.actions$.pipe(
    ofType<LoadResultedCaseCount>(ResultedCaseCountActionTypes.LOAD_RESULTED_CASE_COUNT),
    switchMap(action =>
      this.miReport.getResultedCaseCount(action.param).pipe(map(result => new LoadResultedCaseCountSuccess(result)))
    ),
    catchError(err => of(new ApiError(err)))
  );

  constructor(private actions$: Actions, private miReport: MiReportService) {}
}
