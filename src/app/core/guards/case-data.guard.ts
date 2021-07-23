import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { catchError, mapTo, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SjpService } from '../../contexts/sjp';
import { LoadCaseSuccess } from '../actions/entities';

@Injectable()
export class CaseDataGuard implements CanActivate {
  constructor(private store: Store<State>, private router: Router, private sjpService: SjpService) {}

  canActivate({ params }: ActivatedRouteSnapshot): Observable<boolean> {
    const { caseId } = params;
    return this.sjpService.getCaseById(caseId).pipe(
      tap(kase => this.store.dispatch(new LoadCaseSuccess(kase))),
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
