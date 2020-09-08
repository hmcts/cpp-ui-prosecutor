import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { State } from '../core/reducers';
import { SjpService } from '../contexts/sjp';
import { Observable } from 'rxjs';
import { catchError, mapTo, take, tap, switchMap } from 'rxjs/operators';
import { LoadDefendantDetailsUpdates } from '../core/actions';
import { getRegion } from '../core';

@Injectable()
export class DefendantDetailsUpdatesPageDataGuard implements CanActivate {
  constructor(private store: Store<State>, private sjpService: SjpService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(getRegion),
      take(1),
      switchMap(region => {
        return this.sjpService.getDefendantDetailsUpdates(50, region.selectedRegion).pipe(
          tap(cases =>
            this.store.dispatch(new LoadDefendantDetailsUpdates(cases))
          ),
          mapTo(true),
          catchError(() => this.router.navigate(['/technical-error']).then(() => false)),
          take(1)
        );
      })
    );
  }
}
