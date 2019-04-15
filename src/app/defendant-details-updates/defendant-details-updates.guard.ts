import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../core/reducers';
import { SjpService } from '../contexts/sjp';
import { Observable } from 'rxjs';
import { catchError, mapTo, take, tap } from 'rxjs/operators';
import { LoadDefendantDetailsUpdates } from '../core/actions';

@Injectable()
export class DefendantDetailsUpdatesPageDataGuard implements CanActivate {
  constructor(private store: Store<State>, private sjpService: SjpService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.sjpService.getDefendantDetailsUpdates(50).pipe(
      tap(d => this.store.dispatch(new LoadDefendantDetailsUpdates(d))),
      mapTo(true),
      catchError(() => this.router.navigate(['/technical-error']).then(() => false)),
      take(1)
    );
  }
}
