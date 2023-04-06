import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { LoadPoliceForcesSuccessAction } from '../actions/pcf-reference-data.actions';
import { State } from '../reducers';
import { getPoliceForces } from '../selectors';
import { ReferenceDataService } from '../../contexts/reference-data';

@Injectable()
export class PoliceForcesGuard implements CanActivate {
  constructor(private store: Store<State>, private referenceData: ReferenceDataService) {}

  hasPoliceForcesInStore(): Observable<boolean> {
    return this.store.pipe(
      select(getPoliceForces),
      map((codes) => codes && codes.length > 0),
      take(1)
    );
  }

  hasPoliceForcesInApi(): Observable<boolean> {
    return this.referenceData.getPoliceForces().pipe(
      map((codes) => new LoadPoliceForcesSuccessAction(codes)),
      tap((action) => this.store.dispatch(action)),
      map(Boolean),
      catchError(() => {
        return of(false);
      })
    );
  }

  canActivate(): Observable<boolean> {
    return this.hasPoliceForcesInStore().pipe(
      switchMap((inStore) => {
        if (inStore) {
          return of(inStore);
        }
        return this.hasPoliceForcesInApi();
      })
    );
  }
}
