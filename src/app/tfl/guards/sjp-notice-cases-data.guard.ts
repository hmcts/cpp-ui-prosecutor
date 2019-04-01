import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    return this.sjpService.getCasesWithSjpNoticeCount().pipe(
      tap(result => this.store.dispatch(new LoadCasesWithSjpNoticeCountSuccess(result))),
      mapTo(true),
      catchError(() => this.router.navigate(['/technical-error']).then(() => false)),
      take(1)
    );
  }
}
