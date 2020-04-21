import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, mapTo, take, tap } from 'rxjs/operators';
import { LoadCaseNotesSuccess } from '../actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { SjpService } from '../../contexts/sjp';

@Injectable()
export class CaseNotesGuard implements CanActivate {
  constructor(private store: Store<State>, private router: Router, private sjpService: SjpService) {}

  canActivate({ params }: ActivatedRouteSnapshot): Observable<boolean> {
    const { caseId } = params;
    return this.sjpService.getCaseNotes(caseId).pipe(
      tap(caseNotes => this.store.dispatch(new LoadCaseNotesSuccess(caseNotes))),
      mapTo(true),
      catchError(() => this.router.navigate(['/technical-error']).then(() => false)),
      take(1)
    );
  }
}
