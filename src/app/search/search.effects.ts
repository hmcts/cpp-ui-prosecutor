import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Search, SearchSuccess, SearchTypes } from './search.action';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ApiError } from '../core/actions/api';
import { SjpService } from '../contexts/sjp';

@Injectable()
export class SearchEffects {
  constructor(private actions$: Actions, private sjpService: SjpService, private router: Router) {}

  @Effect()
  getCasesDetails: Observable<Action> = this.actions$.pipe(
    ofType<Search>(SearchTypes.SEARCH),
    switchMap(action => {
      return this.sjpService.getCasesDetails(action.payload).pipe(
        map(response => new SearchSuccess(response)),
        tap(() => this.router.navigate(['/search'])),
        catchError(err => of(new ApiError(err)))
      );
    })
  );
}
