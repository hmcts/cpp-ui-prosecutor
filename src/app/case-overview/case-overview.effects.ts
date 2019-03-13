import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiError } from '../core/actions';
import { CaseOverviewTypes, GetCaseById, GetCaseByIdSuccess } from './case-overview.action';
import { SjpService } from '../contexts/sjp';

@Injectable()
export class CaseOverviewEffects {
  constructor(private actions$: Actions, private sjpService: SjpService) {}

  @Effect()
  getOffences: Observable<Action> = this.actions$.pipe(
    ofType<GetCaseById>(CaseOverviewTypes.GET_CASE_BY_ID),
    switchMap(action => {
      return this.sjpService.getCaseById(action.payload).pipe(
        map(response => new GetCaseByIdSuccess(response)),
        catchError(err => of(new ApiError(err)))
      );
    })
  );
}
