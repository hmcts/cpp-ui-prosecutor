import { CanActivate, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../core/reducers';
import { catchError, mapTo, switchMap, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ReferenceDataService } from '../../contexts/reference-data';
import { getOffenceWithdrawalReasons } from '../../core/selectors';
import { LoadOffenceWithdrawalReasonsSuccess } from '../../core/actions';

@Injectable({
  providedIn: 'root'
})
export class OffenceWithdrawalReasonsGuard implements CanActivate {
  private store = inject<Store<State>>(Store);
  private referenceDataService = inject(ReferenceDataService);
  private router = inject(Router);


  constructor() {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(getOffenceWithdrawalReasons),
      take(1),
      switchMap(result => {
        if (result) {
          return of(true);
        }

        return this.referenceDataService.getOffenceWithdrawalReasons().pipe(
          tap(offenceWithdrawReasons =>
            this.store.dispatch(new LoadOffenceWithdrawalReasonsSuccess(offenceWithdrawReasons))
          ),
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
