import { ChangeDetectionStrategy, Component } from '@angular/core';
import { State } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { DocumentUploadDetails } from '../../contexts/staging-tfl';
import { Observable } from 'rxjs';
import { getDocumentUploadDetails } from './check-document-upload.selector';

@Component({
  selector: 'check-document-upload-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <check-document-upload [documentUploadDetails]="documentUploadDetails$ | async"></check-document-upload>
  `
})
export class CheckDocumentUploadContainer {
  documentUploadDetails$: Observable<DocumentUploadDetails[]>;

  constructor(private store: Store<State>) {
    this.documentUploadDetails$ = this.store.pipe(select(getDocumentUploadDetails));
  }
}
