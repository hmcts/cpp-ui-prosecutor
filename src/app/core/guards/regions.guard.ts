import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SjpService } from '../../contexts/sjp';
import { Injectable, inject } from '@angular/core';
import { catchError, mapTo, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { LoadRegionsSuccess } from '../actions/entities';

@Injectable({
  providedIn: 'root'
})
export class RegionsGuard implements CanActivate {
  private store = inject<Store<State>>(Store);
  private sjpService = inject(SjpService);
  private router = inject(Router);

  constructor() {}

  canActivate(): Observable<boolean> {
    return this.sjpService.getRegions().pipe(
      tap(regions => {
        regions.unshift(
          {
            label: 'All',
            value: 'ALL'
          },
          {
            label: 'Blank',
            value: 'UNKNOWN'
          }
        );
        this.store.dispatch(new LoadRegionsSuccess(regions));
      }),
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
