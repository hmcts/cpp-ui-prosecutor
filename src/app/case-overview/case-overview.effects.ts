import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action, select, Store } from '@ngrx/store';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ApiError, LoadCaseSuccess } from '../core/actions';
import { SjpService } from '../contexts/sjp';
import { CaseOverviewActionType, WithdrawOffences, WithdrawOffencesSuccess } from './case-overview.action';
import { Router } from '@angular/router';
import { getCase, getRole } from '../core/selectors';
import { State } from '../reducers';

@Injectable()
export class CaseOverviewEffects {
  @Effect()
  withdrawOffences: Observable<Action> = this.actions$.pipe(
    ofType<WithdrawOffences>(CaseOverviewActionType.WITHDRAW_OFFENCES),
    withLatestFrom(this.store.pipe(select(getCase)), this.store.pipe(select(getRole))),
    switchMap(([{ offences }, { id: caseId }, role]) =>
      this.sjpService.withdrawOffences(offences, caseId).pipe(
        switchMap(() =>
          this.sjpService.getCaseById(caseId).pipe(
            switchMap(kase => [new LoadCaseSuccess(kase), new WithdrawOffencesSuccess()]),
            tap(() => this.router.navigate([role, 'case-overview', caseId]))
          )
        )
      )
    ),
    catchError(err => of(new ApiError(err)))
  );

  constructor(
    private actions$: Actions,
    private sjpService: SjpService,
    private router: Router,
    private store: Store<State>
  ) {}
}
