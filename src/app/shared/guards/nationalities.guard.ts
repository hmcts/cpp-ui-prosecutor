import { Injectable, inject } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map, tap, switchMap, catchError, take } from 'rxjs/operators';
import { State, getNationalities, LoadNationalitieSuccessAction, ApiError } from '../../core';
import { ReferenceDataService } from '../../contexts/reference-data';

@Injectable({
  providedIn: 'root'
})
export class NationalitiesGuard implements CanActivate {
  private store = inject<Store<State>>(Store);
  private pcfReferenceData = inject(ReferenceDataService);

  constructor() {}

  hasNationalitiesInStore(): Observable<boolean> {
    return this.store.pipe(
      select(getNationalities),
      map(nationalities => !!nationalities && nationalities.length > 0),
      take(1)
    );
  }

  hasNationalitiesInApi(): Observable<boolean> {
    return this.pcfReferenceData.getNationalities().pipe(
      tap(nationalities => {
        this.store.dispatch(new LoadNationalitieSuccessAction(nationalities));
      }),
      map(nationalities => !!nationalities),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    return this.hasNationalitiesInStore().pipe(
      switchMap(hasNationalities => (hasNationalities ? of(hasNationalities) : this.hasNationalitiesInApi())),
      tap({
        error: error => this.store.dispatch(new ApiError(error))
      }),
      catchError(() => of(true))
    );
  }
}
