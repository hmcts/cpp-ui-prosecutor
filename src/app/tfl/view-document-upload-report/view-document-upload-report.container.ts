import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../reducers';
import { Observable } from 'rxjs';
import { DocumentUploadDetails } from '../../contexts/staging-tfl';
import { getDocumentUploadReport } from './view-document-upload-report.selector';

@Component({
  selector: 'view-upload-report-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <view-document-upload-report [documentUploadDetails]="documentUploadDetails$ | async"></view-document-upload-report>
  `
})
export class ViewDocumentUploadReportContainer {
  documentUploadDetails$: Observable<DocumentUploadDetails>;

  constructor(store: Store<State>) {
    this.documentUploadDetails$ = store.pipe(select(getDocumentUploadReport));
  }
}
