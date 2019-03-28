import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SjpService } from '../../contexts/sjp';
import { Injectable } from '@angular/core';
import { catchError, mapTo, switchMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { State } from '../reducers';
import { LoadPleadedNotGuiltyCases } from '../actions/entities';
import { getPleadedNotGuiltyCasesDetail } from '../selectors';

@Injectable()
export class PleadedNotGuiltyDataGuard implements CanActivate {
  constructor(private store: Store<State>, private sjpService: SjpService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(select(getPleadedNotGuiltyCasesDetail)).pipe(
      take(1),
      switchMap(pleadedNoGuiltyCases => {
        if (pleadedNoGuiltyCases) {
          return of(true);
        }
        return this.sjpService.getPendingDatesToAvoid().pipe(
          tap(pleadedNotGuiltyCasesDetail =>
            this.store.dispatch(new LoadPleadedNotGuiltyCases(pleadedNotGuiltyCasesDetail))
          ),
          mapTo(true)
        );
      }),
      catchError(() => this.router.navigate(['/technical-error']).then(() => false)),
      take(1)
    );
  }
}
