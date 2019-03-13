import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { catchError, mapTo, take, tap } from 'rxjs/operators';
import { GetCaseByIdSuccess } from './case-overview.action';
import { Observable, of } from 'rxjs';
import { SjpService } from '../contexts/sjp';

@Injectable()
export class CaseOverviewGuard implements CanActivate {
  constructor(private store: Store<State>, private router: Router, private sjpService: SjpService) {}

  canActivate({ params }: ActivatedRouteSnapshot): Observable<boolean> {
    const { caseId } = params;
    return this.sjpService.getCaseById(caseId).pipe(
      tap(kase => this.store.dispatch(new GetCaseByIdSuccess(kase))),
      mapTo(true),
      take(1),
      catchError(() => {
        this.router.navigate(['/technical-error']);
        return of(false);
      })
    );
  }
}
