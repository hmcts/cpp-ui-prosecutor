import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../reducers';
import { ResetUploadDocumentSuccess, UploadDocuments } from '../tfl.action';
import { getDocumentUploadSuccess } from '../tfl.selectors';

@Component({
  selector: 'upload-documents-container',
  template: `
    <upload-documents [uploadSuccess]="uploadSuccess$ | async" (uploadDocuments)="uploadDocuments($event)">
    </upload-documents>
  `
})
export class UploadDocumentsContainer implements OnDestroy {
  uploadSuccess$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.uploadSuccess$ = this.store.pipe(select(getDocumentUploadSuccess));
  }

  uploadDocuments(zipFile: File) {
    this.store.dispatch(new UploadDocuments(zipFile));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetUploadDocumentSuccess());
  }
}
