import { Injectable, inject } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { State } from '../reducers';

import { LoadVerdictTypesSuccess } from '../actions/pcf-reference-data.actions';
import { getVerdictTypes } from '../selectors';
import { ReferenceDataService } from '../../contexts/reference-data';

@Injectable({
  providedIn: 'root'
})
export class VerdictTypesGuard implements CanActivate {
  private store = inject<Store<State>>(Store);
  private referenceData = inject(ReferenceDataService);

  constructor() {}

  hasVerdictTypesInStore(): Observable<boolean> {
    return this.store.pipe(
      select(getVerdictTypes),
      map(verdictTypes => verdictTypes && verdictTypes.length > 0),
      take(1)
    );
  }

  hasVerdictTypesInApi(): Observable<boolean> {
    return this.referenceData.getVerdictTypes().pipe(
      map(verdictTypes => new LoadVerdictTypesSuccess(verdictTypes || [])),
      tap(action => this.store.dispatch(action)),
      map(Boolean),
      catchError(() => {
        return of(false);
      })
    );
  }

  canActivate(): Observable<boolean> {
    return this.hasVerdictTypesInStore().pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        return this.hasVerdictTypesInApi();
      })
    );
  }
}
