import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiError } from '../core/actions';
import { CaseOverviewService } from './case-overview.service';
import { CaseOverviewTypes, GetCaseById, GetCaseByIdSuccess } from './case-overview.action';

@Injectable()
export class CaseOverviewEffects {
  constructor(private actions$: Actions, private caseOverviewService: CaseOverviewService) {}

  @Effect()
  getOffences: Observable<Action> = this.actions$.pipe(
    ofType<GetCaseById>(CaseOverviewTypes.GET_CASE_BY_ID),
    switchMap(action => {
      return this.caseOverviewService.getCaseById(action.payload).pipe(
        map(response => new GetCaseByIdSuccess(response)),
        catchError(err => of(new ApiError(err)))
      );
    })
  );
}
