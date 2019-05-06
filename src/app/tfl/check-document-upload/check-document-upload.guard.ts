import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { Observable } from 'rxjs';
import { catchError, mapTo, take, tap } from 'rxjs/operators';
import { StagingTflService } from '../../contexts/staging-tfl';
import { LoadDocumentUploadDetailsSuccess } from './document-upload.action';

@Injectable()
export class CheckDocumentUploadGuard implements CanActivate {
  constructor(private store: Store<State>, private stagingTflService: StagingTflService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.stagingTflService.getDocumentUploadDetails().pipe(
      tap(result => this.store.dispatch(new LoadDocumentUploadDetailsSuccess(result))),
      mapTo(true),
      catchError(() => this.router.navigate(['/technical-error']).then(() => false)),
      take(1)
    );
  }
}
