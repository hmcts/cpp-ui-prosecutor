import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SjpService } from '../../contexts/sjp';
import { inject, Injectable } from '@angular/core';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { State } from '../reducers';
import { LoadPleadedNotGuiltyCases } from '../actions';
import { getFormFilter } from '../selectors';

@Injectable({ providedIn: 'root' })
export class PleadedNotGuiltyDataGuard implements CanActivate {
  private store = inject<Store<State>>(Store);
  private sjpService = inject(SjpService);
  private router = inject(Router);

  constructor() {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(getFormFilter),
      take(1),
      switchMap(region => {
        return this.sjpService.getPendingDatesToAvoid(region.selectedRegion, region.prosecutor).pipe(
          tap(pleadedNotGuiltyCasesDetail =>
            this.store.dispatch(new LoadPleadedNotGuiltyCases(pleadedNotGuiltyCasesDetail))
          ),
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
