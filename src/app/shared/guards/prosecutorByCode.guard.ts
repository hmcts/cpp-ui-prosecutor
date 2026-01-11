import { Injectable, inject } from '@angular/core';
import { isEmpty } from 'lodash';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { getUserGroups } from '@cpp/users-groups';
import { Prosecutor } from '@cpp/reference-data';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { ReferenceDataService } from '../../contexts/reference-data';
import { State, ApiError, getProsecutorByUserGroup, LoadProsecutorByUserGroupSuccess } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class ProsecutorByCodeGuard implements CanActivate {
  private referenceDataService = inject(ReferenceDataService);
  private store = inject<Store<State>>(Store);

  constructor() {}

  canActivate(): Observable<boolean> {
    return combineLatest([
      this.store.pipe(select(getProsecutorByUserGroup)),
      this.store.pipe(select(getUserGroups))
    ]).pipe(
      take(1),
      switchMap(([prosecutorByGroup, userGroups]) => {
        if (!isEmpty(prosecutorByGroup)) {
          return of(true);
        }
        const npp = userGroups.find(group => group.prosecutingAuthority);
        return this.referenceDataService.getProsecutorByCode(npp.prosecutingAuthority).pipe(
          map(prosecutor => {
            const nonPoliceProsecutor =
              npp.prosecutingAuthority === 'ALL' ? ({ cpsFlag: true } as Prosecutor) : prosecutor;
            this.store.dispatch(new LoadProsecutorByUserGroupSuccess(nonPoliceProsecutor));
            return true;
          }),
          catchError(error => {
            this.store.dispatch(new ApiError({ error }));
            return of(false);
          })
        );
      })
    );
  }
}
