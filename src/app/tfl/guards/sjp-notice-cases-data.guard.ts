import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SjpService } from '../../contexts/sjp';
import { Injectable } from '@angular/core';
import { catchError, mapTo, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { LoadCasesWithSjpNoticeCountSuccess } from '../tfl.action';
import { State } from '../../reducers';

@Injectable()
export class SjpNoticeCasesDataGuard implements CanActivate {
  constructor(private store: Store<State>, private sjpService: SjpService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.sjpService.getCasesMissingSjpNoticeCount().pipe(
      tap(result => this.store.dispatch(new LoadCasesWithSjpNoticeCountSuccess(result))),
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
