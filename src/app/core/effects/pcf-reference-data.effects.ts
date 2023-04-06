import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as ReferenceDataActions from '../actions/pcf-reference-data.actions';
import { ApiError } from '../actions';
import { State } from '../reducers';
import {
  getEthnicities,
  getNationalities,
  getObservedEthnicities,
} from '../selectors';

import { saveAs } from 'file-saver';
import { ReferenceDataService } from '../../contexts/reference-data';

@Injectable()
export class PCFReferenceDataEffects {
  @Effect()
  loadEthnicities$: Observable<Action> = this.actions$.pipe(
    ofType<ReferenceDataActions.LoadEthnicitiesAction>(ReferenceDataActions.LOAD_ETHNICITIES),
    withLatestFrom(this.store.pipe(select(getEthnicities))),
    filter(([_, enthnicites]) => enthnicites.length === 0),
    switchMap(() =>
      this.referenceData.getEthnicities().pipe(
        map((ethnicities) => new ReferenceDataActions.LoadEthnicitiesSuccessAction(ethnicities)),
        catchError((error) => of(new ApiError(error)))
      )
    )
  );

  @Effect()
  loadObservedEthnicities$: Observable<Action> = this.actions$.pipe(
    ofType<ReferenceDataActions.LoadObservedEthnicitiesAction>(
      ReferenceDataActions.LOAD_OBSERVED_ETHNICITIES
    ),
    withLatestFrom(this.store.pipe(select(getObservedEthnicities))),
    filter(([_, enthnicites]) => enthnicites.length === 0),
    switchMap(() =>
      this.referenceData.getObservedEthnicities().pipe(
        map(
          (ethnicities) =>
            new ReferenceDataActions.LoadObservedEthnicitiesSuccessAction(ethnicities)
        ),
        catchError((error) => of(new ApiError(error)))
      )
    )
  );

  @Effect()
  loadNationalities$: Observable<Action> = this.actions$.pipe(
    ofType<ReferenceDataActions.LoadNationalitiesAction>(ReferenceDataActions.LOAD_NATIONALITIES),
    withLatestFrom(this.store.pipe(select(getNationalities))),
    filter(([_, nationalities]) => nationalities.length === 0),
    switchMap(() =>
      this.referenceData.getNationalities().pipe(
        map(
          (nationalities) => new ReferenceDataActions.LoadNationalitieSuccessAction(nationalities)
        ),
        catchError((error) => of(new ApiError(error)))
      )
    )
  );


  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private referenceData: ReferenceDataService
  ) {}
}
