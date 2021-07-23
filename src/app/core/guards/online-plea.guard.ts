import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, take, tap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../reducers';
import { SjpService } from '../../contexts/sjp';
import { LoadOnlinePleaSuccess } from 'src/app/case-overview/case-overview.action';
import { getCase } from '../selectors';

@Injectable()
export class OnlinePleaGuard implements CanActivate {
  constructor(private store: Store<State>, private router: Router, private sjpService: SjpService) {}

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
