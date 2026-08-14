import { Injectable, inject } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map, tap, switchMap, catchError, take } from 'rxjs/operators';
import { State, ApiError, getEthnicities, LoadEthnicitiesSuccessAction } from '../../core';
import { ReferenceDataService } from '../../contexts/reference-data';

@Injectable({
  providedIn: 'root'
})
export class EthnicitiesGuard implements CanActivate {
  private store = inject<Store<State>>(Store);
  private pcfReferenceData = inject(ReferenceDataService);

  constructor() {}

  hasEthnicitiesInStore(): Observable<boolean> {
    return this.store.pipe(
      select(getEthnicities),
      map(ethnicities => !!ethnicities && ethnicities.length > 0),
      take(1)
    );
  }

  hasEthnicitiesInApi(): Observable<boolean> {
    return this.pcfReferenceData.getEthnicities().pipe(
      tap(ethnicities => {
        this.store.dispatch(new LoadEthnicitiesSuccessAction(ethnicities));
      }),
      map(ethnicities => !!ethnicities),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    return this.hasEthnicitiesInStore().pipe(
      switchMap(hasEthnicities => (hasEthnicities ? of(hasEthnicities) : this.hasEthnicitiesInApi())),
      tap({
        error: error => this.store.dispatch(new ApiError(error))
      }),
      catchError(() => of(true))
    );
  }
}
