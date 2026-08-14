import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { getFormFilter, LoadDefendantDetailsUpdates, State } from '../core';
import { SjpService } from '../contexts/sjp';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DefendantDetailsUpdatesPageDataGuard implements CanActivate {
  private store = inject<Store<State>>(Store);
  private sjpService = inject(SjpService);
  private router = inject(Router);

  constructor() {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(getFormFilter),
      take(1),
      switchMap(filter => {
        return this.sjpService.getDefendantDetailsUpdates(50, filter.selectedRegion, filter.prosecutor).pipe(
          tap(cases => this.store.dispatch(new LoadDefendantDetailsUpdates(cases))),
          map(() => true),
          catchError(error => {
            switch (error.status) {
              case 403:
                this.router.navigate(['/unauthorised-access']);
                break;
              case 404:
                this.router.navigate(['/page-not-found']);
                break;
              default:
                this.router.navigate(['/technical-error']);
                break;
            }

            return of(false);
          }),
          take(1)
        );
      })
    );
  }
}
