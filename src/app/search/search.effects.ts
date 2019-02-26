import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Search, SearchSuccess, SearchTypes } from './search.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiError } from '../core/actions/api';
import { SearchService } from './search.service';
import { CaseDetails } from './search.container';

@Injectable()
export class SearchEffects {
  constructor(private actions$: Actions, private searchService: SearchService, private router: Router) {}

  @Effect()
  getCasesDetails: Observable<Action> = this.actions$.pipe(
    ofType<Search>(SearchTypes.SEARCH),
    switchMap(action => {
      return this.searchService.getCasesDetails(action.payload).pipe(
        map(response => new SearchSuccess(response)),
        catchError(err => of(new ApiError(err)))
      );
    })
  );
}
