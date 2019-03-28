import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { catchError, mapTo, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
      catchError(() => this.router.navigate(['/technical-error']).then(() => false)),
      take(1)
    );
  }
}
