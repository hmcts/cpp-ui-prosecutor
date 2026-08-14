import { Injectable, inject } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { State } from '../reducers';

import { LoadRemandStatusesSuccess } from '../actions/pcf-reference-data.actions';
import { getRemandStatuses } from '../selectors';
import { ReferenceDataService } from '../../contexts/reference-data';

@Injectable({
  providedIn: 'root'
})
export class RemandStatusesGuard implements CanActivate {
  private store = inject<Store<State>>(Store);
  private referenceData = inject(ReferenceDataService);

  constructor() {}

  hasRemandStatusesInStore(): Observable<boolean> {
    return this.store.pipe(
      select(getRemandStatuses),
      map(remandStatuses => remandStatuses && remandStatuses.length > 0),
      take(1)
    );
  }

  hasRemandStatusesInApi(): Observable<boolean> {
    return this.referenceData.getRemandStatuses().pipe(
      map(remandStatuses => new LoadRemandStatusesSuccess(remandStatuses || [])),
      tap(action => this.store.dispatch(action)),
      map(Boolean),
      catchError(() => {
        return of(false);
      })
    );
  }

  canActivate(): Observable<boolean> {
    return this.hasRemandStatusesInStore().pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        return this.hasRemandStatusesInApi();
      })
    );
  }
}
