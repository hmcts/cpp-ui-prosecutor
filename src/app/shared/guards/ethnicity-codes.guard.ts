import { Injectable, inject } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map, tap, switchMap, catchError, take } from 'rxjs/operators';
import { State, ApiError, getObservedEthnicities, LoadObservedEthnicitiesSuccessAction } from '../../core';
import { ReferenceDataService } from '../../contexts/reference-data';

@Injectable({
  providedIn: 'root'
})
export class EthnicityCodesGuard implements CanActivate {
  private store = inject<Store<State>>(Store);
  private pcfReferenceData = inject(ReferenceDataService);

  constructor() {}

  hasEthnicityCodesInStore(): Observable<boolean> {
    return this.store.pipe(
      select(getObservedEthnicities),
      map(ethnicityCodes => !!ethnicityCodes && ethnicityCodes.length > 0),
      take(1)
    );
  }

  hasEthnicityCodesInApi(): Observable<boolean> {
    return this.pcfReferenceData.getObservedEthnicities().pipe(
      tap(ethnicityCodes => {
        this.store.dispatch(new LoadObservedEthnicitiesSuccessAction(ethnicityCodes));
      }),
      map(ethnicityCodes => !!ethnicityCodes),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    return this.hasEthnicityCodesInStore().pipe(
      switchMap(hasEthnicityCodes => (hasEthnicityCodes ? of(hasEthnicityCodes) : this.hasEthnicityCodesInApi())),
      tap({
        error: error => this.store.dispatch(new ApiError(error))
      }),
      catchError(() => of(true))
    );
  }
}
