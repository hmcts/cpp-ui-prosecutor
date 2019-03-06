import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { CaseOverviewService } from './case-overview.service';
import { catchError, mapTo, take, tap } from 'rxjs/operators';
import { GetCaseByIdSuccess } from './case-overview.action';
import { Observable, of } from 'rxjs';

@Injectable()
export class CaseOverviewGuard implements CanActivate {
  constructor(private store: Store<State>, private router: Router, private caseOverviewService: CaseOverviewService) {}

  canActivate({ params }: ActivatedRouteSnapshot): Observable<boolean> {
    const { caseId } = params;
    return this.caseOverviewService.getCaseById(caseId).pipe(
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
