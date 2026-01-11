import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { catchError, mapTo, switchMap, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SjpService } from '../contexts/sjp';
import { FeatureState, getSearchResult } from './search.selectors';
import { SearchSuccess } from './search.action';

@Injectable({
  providedIn: 'root'
})
export class SearchGuard implements CanActivate {
  private store = inject<Store<FeatureState>>(Store);
  private router = inject(Router);
  private sjpService = inject(SjpService);

  constructor() {}

  canActivate({ params }: ActivatedRouteSnapshot): Observable<boolean> {
    const { keyword } = params;

    return this.store.pipe(
      select(getSearchResult),
      take(1),
      switchMap(result => {
        if (result && result.keyword === keyword) {
          return of(true);
        }

        return this.sjpService.getCasesDetails(keyword).pipe(
          tap(searchResult => this.store.dispatch(new SearchSuccess({ ...searchResult, keyword }))),
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
      })
    );
  }
}
