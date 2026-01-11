import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiError, LoadDefendantDetailsUpdates } from '../core/actions';
import { SjpService } from '../contexts/sjp';
import { DefendantDetailsUpdatesAction, DefendantDetailsUpdatesActionType } from './defendant-details-updates.action';

@Injectable()
export class DefendantDetailsUpdatesEffects {
  private actions$ = inject(Actions);
  private sjpService = inject(SjpService);

  defendantDetailsUpdates$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<DefendantDetailsUpdatesAction>(DefendantDetailsUpdatesActionType.ACKNOWLEDGE_DEFENDANT_DETAILS_UPDATES),
      switchMap(action =>
        this.sjpService
          .acknowledgeDefendantDetailsUpdates(
            action.defendantDetailsUpdates.caseId,
            action.defendantDetailsUpdates.defendantId
          )
          .pipe(
            switchMap(() =>
              this.sjpService
                .getDefendantDetailsUpdates(50)
                .pipe(map(result => new LoadDefendantDetailsUpdates(result)))
            ),
            catchError(err => of(new ApiError(err)))
          )
      )
    )
  );

  constructor() {}
}
