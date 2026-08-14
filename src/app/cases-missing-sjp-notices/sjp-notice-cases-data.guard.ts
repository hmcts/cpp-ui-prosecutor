import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SjpService } from '../contexts/sjp';
import { Injectable, inject } from '@angular/core';
import { catchError, mapTo, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { LoadCasesWithSjpNoticeCountSuccess } from '../core';

@Injectable({ providedIn: 'root' })
export class SjpNoticeCasesDataGuard implements CanActivate {
  private store = inject<Store<State>>(Store);
  private sjpService = inject(SjpService);
  private router = inject(Router);


  constructor() {}

  canActivate(): Observable<boolean> {
    return this.sjpService.getCasesMissingSjpNoticeCount().pipe(
      tap(result => this.store.dispatch(new LoadCasesWithSjpNoticeCountSuccess(result))),
      mapTo(true),
      catchError(() => this.router.navigate(['/technical-error']).then(() => false)),
      take(1)
    );
  }
}
