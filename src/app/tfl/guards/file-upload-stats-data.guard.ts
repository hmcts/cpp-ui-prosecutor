import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, mapTo, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { LoadFileUploadStatsSuccess } from '../tfl.action';
import { State } from '../../reducers';
import { StagingTflService } from '../../contexts/staging-tfl';

@Injectable()
export class FileUploadStatsDataGuard implements CanActivate {
  constructor(private store: Store<State>, private tflStagingService: StagingTflService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.tflStagingService.getFileUploadStats().pipe(
      tap(result => this.store.dispatch(new LoadFileUploadStatsSuccess(result))),
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
