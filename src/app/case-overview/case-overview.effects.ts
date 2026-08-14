import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action, select, Store } from '@ngrx/store';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ApiError, LoadCaseSuccess } from '../core/actions';
import { SjpService } from '../contexts/sjp';
import {
  CaseOverviewActionType,
  SubmitDatesToAvoid,
  SubmitDatesToAvoidFailed,
  SubmitDatesToAvoidSuccess,
  WithdrawOffences,
  WithdrawOffencesSuccess,
  WithdrawOffencesFailed
} from './case-overview.action';
import { Router } from '@angular/router';
import { getCase, getRole } from '../core/selectors';
import { State } from '../reducers';

@Injectable()
export class CaseOverviewEffects {
  private actions$ = inject(Actions);
  private sjpService = inject(SjpService);
  private router = inject(Router);
  private store = inject<Store<State>>(Store);

  withdrawOffences: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
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
      catchError(err => {
        if (err.data && (err.data.reason === 'CASE_ASSIGNED' || err.data.reason === 'CASE_COMPLETED')) {
          return this.store.pipe(select(getRole)).pipe(
            switchMap(role =>
              this.sjpService.getCaseById(err.data.caseId).pipe(
                switchMap(newCase => [new LoadCaseSuccess(newCase), new WithdrawOffencesFailed()]),
                tap(() => this.router.navigate([role, 'case-overview', err.data.caseId]))
              )
            ),
            catchError(nestedErr => of(new ApiError(nestedErr)))
          );
        }
        return of(new ApiError(err));
      })
    )
  );

  submitDatesToAvoid: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<SubmitDatesToAvoid>(CaseOverviewActionType.SUBMIT_DATES_TO_AVOID),
      withLatestFrom(this.store.pipe(select(getCase)), this.store.pipe(select(getRole))),
      switchMap(([{ datesToAvoid }, { id: caseId, datesToAvoid: previousDatesToAvoid }, role]) =>
        this.sjpService.submitDatesToAvoid(datesToAvoid, caseId, !previousDatesToAvoid).pipe(
          switchMap(() =>
            this.sjpService.getCaseById(caseId).pipe(
              switchMap(newCase => [new LoadCaseSuccess(newCase), new SubmitDatesToAvoidSuccess()]),
              tap(() => this.router.navigate([role, 'case-overview', caseId, 'dates-to-avoid']))
            )
          )
        )
      ),
      catchError(err => {
        if (err.data && err.data.reason === 'CASE_ASSIGNED') {
          return this.store.pipe(select(getRole)).pipe(
            switchMap(role =>
              this.sjpService.getCaseById(err.data.caseId).pipe(
                switchMap(newCase => [new LoadCaseSuccess(newCase), new SubmitDatesToAvoidFailed()]),
                tap(() => this.router.navigate([role, 'case-overview', err.data.caseId]))
              )
            ),
            catchError(nestedErr => of(new ApiError(nestedErr)))
          );
        }
        return of(new ApiError(err));
      })
    )
  );

  constructor() {}
}
