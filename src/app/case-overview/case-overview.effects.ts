import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ApiError } from '../core/actions';
import { CaseOverviewTypes, GetCaseById, GetCaseByIdSuccess } from './case-overview.action';
import { SjpService } from '../contexts/sjp';
import { WithdrawOffences, WithdrawOffencesSuccess, WithdrawOffencesTypes } from './case-overview.action';
import { Router } from '@angular/router';

@Injectable()
export class CaseOverviewEffects {
  constructor(private actions$: Actions, private sjpService: SjpService, private router: Router) {}

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

  @Effect()
  withdrawOffences: Observable<Action> = this.actions$.pipe(
    ofType<WithdrawOffences>(WithdrawOffencesTypes.WITHDRAW_OFFENCES),
    tap(actions => console.log),
    switchMap(({ offences, caseId }) =>
      this.sjpService.withdrawOffences(offences, caseId).pipe(
        switchMap(() =>
          this.sjpService.getCaseById(caseId).pipe(
            switchMap(kase => [new GetCaseByIdSuccess(kase), new WithdrawOffencesSuccess()]),
            tap(() => this.router.navigate(['case-overview', caseId]))
          )
        )
      )
    ),
    catchError(err => of(new ApiError(err)))
  );
}
