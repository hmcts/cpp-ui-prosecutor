import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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
  private actions$ = inject(Actions);
  private miReport = inject(MiReportService);

  loadCaseCount$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<LoadResultedCaseCount>(ResultedCaseCountActionTypes.LOAD_RESULTED_CASE_COUNT),
      switchMap(action =>
        this.miReport.getResultedCaseCount(action.param).pipe(map(result => new LoadResultedCaseCountSuccess(result)))
      ),
      catchError(err => of(new ApiError(err)))
    )
  );

  constructor() {}
}
