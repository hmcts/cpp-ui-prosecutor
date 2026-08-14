import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { catchError, mapTo, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SjpService } from '../../contexts/sjp';
import { LoadCaseSuccess } from '../actions/entities';

@Injectable({
  providedIn: 'root'
})
export class CaseDataGuard implements CanActivate {
  private store = inject<Store<State>>(Store);
  private router = inject(Router);
  private sjpService = inject(SjpService);

  constructor() {}

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
