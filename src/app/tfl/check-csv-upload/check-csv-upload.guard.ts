import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { Observable } from 'rxjs';
import { catchError, mapTo, take, tap } from 'rxjs/operators';
import { StagingTflService } from '../../contexts/staging-tfl';
import { LoadCsvFileUploadDetailsSuccess } from './check-csv-upload.action';

@Injectable()
export class CheckCsvUploadGuard implements CanActivate {
  constructor(private store: Store<State>, private stagingTflService: StagingTflService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.stagingTflService.getCsvFilesUploadDetails().pipe(
      tap(result => this.store.dispatch(new LoadCsvFileUploadDetailsSuccess(result))),
      mapTo(true),
      catchError(() => this.router.navigate(['/technical-error']).then(() => false)),
      take(1)
    );
  }
}
