import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { StagingTflService } from '../../contexts/staging-tfl';
import { LoadDocumentUploadReportSuccess } from './view-document-upload-report.action';
import { State } from '../../reducers';
import { Injectable } from '@angular/core';

@Injectable()
export class ViewDocumentUploadReportGuard implements CanActivate {
  constructor(private store: Store<State>, private stagingTflService: StagingTflService, private router: Router) {}

  canActivate({ params }: ActivatedRouteSnapshot): Observable<boolean> {
    const { uploadId } = params;
    return this.stagingTflService.getDocumentUploadReport(uploadId).pipe(
      map(result => {
        if (result && result.bundleUploadId) {
          this.store.dispatch(new LoadDocumentUploadReportSuccess(result));
          return true;
        }
        return false;
      }),
      catchError(() => this.router.navigate(['/technical-error']).then(() => false)),
      take(1)
    );
  }
}
