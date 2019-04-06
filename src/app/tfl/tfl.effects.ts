import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiError } from '../core/actions';
import { SubmitCsvFiles, SubmitCsvFilesSuccess, TflActionType } from './tfl.action';
import { StagingTflService } from '../contexts/staging-tfl';

@Injectable()
export class TflEffects {
  @Effect()
  submitCsvFiles: Observable<Action> = this.actions$.pipe(
    ofType<SubmitCsvFiles>(TflActionType.SUBMIT_CSV_FILES),
    switchMap(({ csvUploadRequestParam }) => {
      return this.stagingTflService.submitCsvFiles(csvUploadRequestParam).pipe(map(() => new SubmitCsvFilesSuccess()));
    }),
    catchError(err => of(new ApiError(err)))
  );

  constructor(private actions$: Actions, private stagingTflService: StagingTflService) {}
}
