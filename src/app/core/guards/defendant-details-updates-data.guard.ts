import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SjpService } from '../../contexts/sjp';
import { Injectable, inject } from '@angular/core';
import { catchError, mapTo, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { LoadDefendantDetailsUpdates } from '../actions/entities';

@Injectable({ providedIn: 'root' })
export class DefendantDetailsUpdatesLinkDataGuard implements CanActivate {
  private store = inject<Store<State>>(Store);
  private sjpService = inject(SjpService);
  private router = inject(Router);


  constructor() {}

  canActivate(): Observable<boolean> {
    return this.sjpService.getDefendantDetailsUpdates(0).pipe(
      tap(d => this.store.dispatch(new LoadDefendantDetailsUpdates(d))),
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
  }
}
