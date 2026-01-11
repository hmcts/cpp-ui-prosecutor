import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, take, tap, switchMap } from 'rxjs/operators';
import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../reducers';
import { SjpService } from '../../contexts/sjp';
import { LoadOnlinePleaSuccess } from '../../case-overview/case-overview.action';
import { getCase } from '../selectors';

@Injectable({
  providedIn: 'root'
})
export class OnlinePleaGuard implements CanActivate {
  private store = inject<Store<State>>(Store);
  private router = inject(Router);
  private sjpService = inject(SjpService);

  constructor() {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(getCase),
      take(1),
      switchMap(({ id, defendant }) =>
        this.sjpService.getDefendantsOnlinePlea(id, defendant.id).pipe(
          tap(onlinePlea => this.store.dispatch(new LoadOnlinePleaSuccess(onlinePlea))),
          mapTo(true)
        )
      ),
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
  }
}
