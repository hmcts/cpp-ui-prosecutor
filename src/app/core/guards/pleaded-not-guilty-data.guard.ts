import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SjpService } from '../../contexts/sjp';
import { Injectable } from '@angular/core';
import { catchError, mapTo, take, tap, switchMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { State } from '../reducers';
import { LoadPleadedNotGuiltyCases } from '../actions/entities';
import { getRegion } from '../selectors';

@Injectable()
export class PleadedNotGuiltyDataGuard implements CanActivate {
  constructor(
    private store: Store<State>,
    private sjpService: SjpService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(getRegion),
      take(1),
      switchMap(region => {
        return this.sjpService.getPendingDatesToAvoid(region.selectedRegion).pipe(
          tap(pleadedNotGuiltyCasesDetail =>
            this.store.dispatch(new LoadPleadedNotGuiltyCases(pleadedNotGuiltyCasesDetail))
          ),
          mapTo(true),
          catchError(() => this.router.navigate(['/technical-error']).then(() => false)),
          take(1)
        );
      })
    );
  }
}
