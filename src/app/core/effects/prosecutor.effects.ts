import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReferenceDataActions, ReferenceDataService } from '@cpp/reference-data';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import uuid from 'uuid/v4';
import cleanDeep from 'clean-deep';
import { ReferenceDataService as PCFReferenceDataService } from '../../contexts/reference-data';
import { ApiError, createProsecutor, createProsecutorSuccess } from '../actions';
import { ApplicationCreationRoutes, ProsecutorType } from '../model';
import { State } from '../reducers';
import { getQueryParams } from '../selectors/app';

@Injectable()
export class ProsecutorEffects {
  private actions$ = inject(Actions);
  private referenceDataService = inject(ReferenceDataService);
  private pcfReferenceDataService = inject(PCFReferenceDataService);
  private store = inject<Store<State>>(Store);
  private router = inject(Router);


  constructor() {}

  createProsecutor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProsecutor),
      withLatestFrom(this.store.pipe(select(getQueryParams))),
      switchMap(([{ prosecutor, prosecutorType }, queryParams]) =>
        this.pcfReferenceDataService
          .createProsecutor(
            cleanDeep({
              id: uuid(),
              shortName: `${prosecutor.fullName} ${prosecutor.address.postcode}`,
              ...prosecutor
            })
          )
          .pipe(
            switchMap(newProsecutor =>
              this.referenceDataService.fetchProsecutors().pipe(
                tap(() => {
                  if (
                    prosecutorType === ProsecutorType.MANUAL_CASE ||
                    prosecutorType === ProsecutorType.EDIT_MANUAL_CASE
                  ) {
                    const manualCasePath =
                      prosecutorType === ProsecutorType.MANUAL_CASE ? 'prosecutor' : 'edit-prosecutor';

                    this.router.navigate(['manual-case', manualCasePath], {
                      queryParams,
                      replaceUrl: true
                    });
                  } else {
                    const route =
                      prosecutorType === ProsecutorType.APPLICANT
                        ? ApplicationCreationRoutes.APPLICANT
                        : ApplicationCreationRoutes.RESPONDENT;

                    this.router.navigate(['application', route], {
                      queryParams,
                      replaceUrl: true
                    });
                  }
                }),
                switchMap(prosecutors => [
                  ReferenceDataActions.loadProsecutorsSuccess({ prosecutors }),
                  createProsecutorSuccess({
                    prosecutor: {
                      ...newProsecutor,
                      standard: false // Again BE incompetent
                    },
                    prosecutorType
                  })
                ])
              )
            ),
            catchError(error => of(new ApiError(error)))
          )
      )
    )
  );
}
