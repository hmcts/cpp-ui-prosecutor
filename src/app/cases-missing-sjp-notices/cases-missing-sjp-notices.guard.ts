import { CanActivate, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { State } from '../reducers';
import { Store } from '@ngrx/store';
import { SjpService } from '../contexts/sjp';
import { catchError, mapTo, take, tap } from 'rxjs/operators';
import { LoadCasesMissingSjpNoticeSuccess } from './cases-missing-sjp-notices.action';

@Injectable({
  providedIn: 'root'
})
export class CasesMissingSjpNoticesGuard implements CanActivate {
  private store = inject<Store<State>>(Store);
  private sjpService = inject(SjpService);
  private router = inject(Router);

  constructor() {}

  canActivate(): Observable<boolean> {
    return this.sjpService.getCasesMissingSjpNotice().pipe(
      tap(result => this.store.dispatch(new LoadCasesMissingSjpNoticeSuccess(result))),
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
