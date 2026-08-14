import { Injectable, inject } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as ReferenceDataActions from '../actions/pcf-reference-data.actions';
import { ApiError } from '../actions';
import { State } from '../reducers';
import { getEthnicities, getNationalities, getObservedEthnicities } from '../selectors';

import { ReferenceDataService } from '../../contexts/reference-data';

@Injectable()
export class PCFReferenceDataEffects {
  private actions$ = inject(Actions);
  private store = inject<Store<State>>(Store);
  private referenceData = inject(ReferenceDataService);

  loadEthnicities$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<ReferenceDataActions.LoadEthnicitiesAction>(ReferenceDataActions.LOAD_ETHNICITIES),
      withLatestFrom(this.store.pipe(select(getEthnicities))),
      filter(([_, enthnicites]) => enthnicites.length === 0),
      switchMap(() =>
        this.referenceData.getEthnicities().pipe(
          map(ethnicities => new ReferenceDataActions.LoadEthnicitiesSuccessAction(ethnicities)),
          catchError(error => of(new ApiError(error)))
        )
      )
    )
  );

  loadObservedEthnicities$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<ReferenceDataActions.LoadObservedEthnicitiesAction>(ReferenceDataActions.LOAD_OBSERVED_ETHNICITIES),
      withLatestFrom(this.store.pipe(select(getObservedEthnicities))),
      filter(([_, enthnicites]) => enthnicites.length === 0),
      switchMap(() =>
        this.referenceData.getObservedEthnicities().pipe(
          map(ethnicities => new ReferenceDataActions.LoadObservedEthnicitiesSuccessAction(ethnicities)),
          catchError(error => of(new ApiError(error)))
        )
      )
    )
  );

  loadNationalities$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType<ReferenceDataActions.LoadNationalitiesAction>(ReferenceDataActions.LOAD_NATIONALITIES),
      withLatestFrom(this.store.pipe(select(getNationalities))),
      filter(([_, nationalities]) => nationalities.length === 0),
      switchMap(() =>
        this.referenceData.getNationalities().pipe(
          map(nationalities => new ReferenceDataActions.LoadNationalitieSuccessAction(nationalities)),
          catchError(error => of(new ApiError(error)))
        )
      )
    )
  );


  constructor() {}
}
