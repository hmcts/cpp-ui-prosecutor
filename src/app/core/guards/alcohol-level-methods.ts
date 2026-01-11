import { Injectable, inject } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { LoadAlcoholLevelMethodsSuccessAction } from '../actions/pcf-reference-data.actions';
import { State } from '../reducers';
import { getAlcoholLevelMethods } from '../selectors';
import { ReferenceDataService } from '../../contexts/reference-data';

@Injectable({
  providedIn: 'root'
})
export class AlcoholLevelMethodsGuard implements CanActivate {
  private store = inject<Store<State>>(Store);
  private referenceData = inject(ReferenceDataService);

constructor() {}

  hasAlcoholLevelMethodsInStore(): Observable<boolean> {
    return this.store.pipe(
      select(getAlcoholLevelMethods),
      map(codes => codes && codes.length > 0),
      take(1)
    );
  }

  hasAlcoholLevelMethodsInApi(): Observable<boolean> {
    return this.referenceData.getAlcoholLevelMethod().pipe(
      map(codes => new LoadAlcoholLevelMethodsSuccessAction(codes)),
      tap(action => this.store.dispatch(action)),
      map(Boolean),
      catchError(() => {
        return of(false);
      })
    );
  }

  canActivate(): Observable<boolean> {
    return this.hasAlcoholLevelMethodsInStore().pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        return this.hasAlcoholLevelMethodsInApi();
      })
    );
  }
}
