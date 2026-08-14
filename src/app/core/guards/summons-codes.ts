import { Injectable, inject } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { LoadSummonsCodesSuccessAction } from '../actions/pcf-reference-data.actions';
import { State } from '../reducers';
import { getSummonsCodes } from '../selectors';
import { ReferenceDataService } from '../../contexts/reference-data';

@Injectable({
  providedIn: 'root'
})
export class SummonsCodesGuard implements CanActivate {
  private store = inject<Store<State>>(Store);
  private referenceData = inject(ReferenceDataService);

  constructor() {}

  hasSummonsCodesInStore(): Observable<boolean> {
    return this.store.pipe(
      select(getSummonsCodes),
      map(summonsCodes => summonsCodes && summonsCodes.length > 0),
      take(1)
    );
  }

  hasSummonsCodesInApi(): Observable<boolean> {
    return this.referenceData.getSummonsCode().pipe(
      map(summonsCodes => new LoadSummonsCodesSuccessAction(summonsCodes)),
      tap(action => this.store.dispatch(action)),
      map(Boolean),
      catchError(() => {
        return of(false);
      })
    );
  }

  canActivate(): Observable<boolean> {
    return this.hasSummonsCodesInStore().pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        return this.hasSummonsCodesInApi();
      })
    );
  }
}
