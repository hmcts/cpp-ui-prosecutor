import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../../reducers';
import { Store } from '@ngrx/store';
import { SjpService } from '../../contexts/sjp';
import { catchError, mapTo, take, tap } from 'rxjs/operators';
import { LoadCasesMissingSjpNoticeSuccess } from './cases-missing-sjp-notices.action';

@Injectable()
export class CasesMissingSjpNoticesGuard implements CanActivate {
  constructor(private store: Store<State>, private sjpService: SjpService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.sjpService.getCasesMissingSjpNotice().pipe(
      tap(result => this.store.dispatch(new LoadCasesMissingSjpNoticeSuccess(result))),
      mapTo(true),
      catchError(() => this.router.navigate(['/technical-error']).then(() => false)),
      take(1)
    );
  }
}
