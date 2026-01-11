import { Injectable, inject } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { State } from '../reducers';

import { LoadMotReasonsSuccess } from '../actions/pcf-reference-data.actions';
import { getMotReasons } from '../selectors';
import { ReferenceDataService } from '../../contexts/reference-data';

@Injectable({
  providedIn: 'root'
})
export class MotReasonsGuard implements CanActivate {
  private store = inject<Store<State>>(Store);
  private referenceData = inject(ReferenceDataService);


  constructor() {}

  hasMotReasonsInStore(): Observable<boolean> {
    return this.store.pipe(
      select(getMotReasons),
      map(verdictTypes => verdictTypes && verdictTypes.length > 0),
      take(1)
    );
  }

  hasMotReasonsInApi(): Observable<boolean> {
    return this.referenceData.getMotReasons().pipe(
      map(verdictTypes => new LoadMotReasonsSuccess(verdictTypes || [])),
      tap(action => this.store.dispatch(action)),
      map(Boolean),
      catchError(() => {
        return of(false);
      })
    );
  }

  canActivate(): Observable<boolean> {
    return this.hasMotReasonsInStore().pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        return this.hasMotReasonsInApi();
      })
    );
  }
}
