import { Injectable, inject } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { LoadOffenceDateCodesSuccessAction } from '../actions/pcf-reference-data.actions';
import { State } from '../reducers';
import { getOffenceDateCodes } from '../selectors';
import { ReferenceDataService } from '../../contexts/reference-data';

@Injectable({
  providedIn: 'root'
})
export class OffenceDateCodesGuard implements CanActivate {
  private store = inject<Store<State>>(Store);
  private referenceData = inject(ReferenceDataService);


  constructor() {}

  hasOffenceDateCodesInStore(): Observable<boolean> {
    return this.store.pipe(
      select(getOffenceDateCodes),
      map(codes => codes && codes.length > 0),
      take(1)
    );
  }

  hasOffenceDateCodesInApi(): Observable<boolean> {
    return this.referenceData.getOffenceDateCode().pipe(
      map(codes => new LoadOffenceDateCodesSuccessAction(codes)),
      tap(action => this.store.dispatch(action)),
      map(Boolean),
      catchError(() => {
        return of(false);
      })
    );
  }

  canActivate(): Observable<boolean> {
    return this.hasOffenceDateCodesInStore().pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }
        return this.hasOffenceDateCodesInApi();
      })
    );
  }
}
