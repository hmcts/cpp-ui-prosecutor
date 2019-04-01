import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SjpService } from '../../contexts/sjp';
import { Injectable } from '@angular/core';
import { catchError, mapTo, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { LoadPleadedNotGuiltyCases } from '../actions/entities';

@Injectable()
export class PleadedNotGuiltyDataGuard implements CanActivate {
  constructor(private store: Store<State>, private sjpService: SjpService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.sjpService.getPendingDatesToAvoid().pipe(
      tap(pleadedNotGuiltyCasesDetail =>
        this.store.dispatch(new LoadPleadedNotGuiltyCases(pleadedNotGuiltyCasesDetail))
      ),
      mapTo(true),
      catchError(() => this.router.navigate(['/technical-error']).then(() => false)),
      take(1)
    );
  }
}
