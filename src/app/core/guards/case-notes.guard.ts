import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, take, tap } from 'rxjs/operators';
import { LoadCaseNotesSuccess } from '../actions';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { SjpService } from '../../contexts/sjp';

@Injectable({
  providedIn: 'root'
})
export class CaseNotesGuard implements CanActivate {
  private store = inject<Store<State>>(Store);
  private router = inject(Router);
  private sjpService = inject(SjpService);


  constructor() {}

  canActivate({ params }: ActivatedRouteSnapshot): Observable<boolean> {
    const { caseId } = params;
    return this.sjpService.getCaseNotes(caseId).pipe(
      tap(caseNotes => this.store.dispatch(new LoadCaseNotesSuccess(caseNotes))),
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
