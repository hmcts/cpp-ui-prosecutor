import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../core/reducers';
import { catchError, mapTo, switchMap, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ReferenceDataService } from '../../contexts/reference-data';
import { getOffenceWithdrawalReasons } from '../../core/selectors';
import { LoadOffenceWithdrawalReasonsSuccess } from '../../core/actions';

@Injectable()
export class OffenceWithdrawalReasonsGuard implements CanActivate {
  constructor(
    private store: Store<State>,
    private referenceDataService: ReferenceDataService,
    private router: Router
  ) {}

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
          catchError(() => {
            this.router.navigate(['/technical-error']);
            return of(false);
          }),
          take(1)
        );
      })
    );
  }
}
