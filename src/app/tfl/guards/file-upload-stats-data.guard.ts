import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
      catchError(() => this.router.navigate(['/technical-error']).then(() => false)),
      take(1)
    );
  }
}
