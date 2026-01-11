import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from '../core/reducers';
import { SjpService } from '../contexts/sjp';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, take, tap, switchMap } from 'rxjs/operators';
import { LoadDefendantDetailsUpdates } from '../core/actions';
import { getRegion } from '../core';

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
      select(getRegion),
      take(1),
      switchMap(region => {
        return this.sjpService.getDefendantDetailsUpdates(50, region.selectedRegion).pipe(
          tap(cases => this.store.dispatch(new LoadDefendantDetailsUpdates(cases))),
          mapTo(true),
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
