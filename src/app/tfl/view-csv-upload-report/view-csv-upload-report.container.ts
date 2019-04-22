import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../reducers';
import { Observable } from 'rxjs';
import { CsvFileUploadReport } from '../../contexts/staging-tfl';
import { getCsvFileUploadReport } from './view-csv-upload-report.selector';

@Component({
  selector: 'view-csv-upload-report-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <view-csv-upload-report [csvFileUploadReport]="csvFileUploadReport$ | async"> </view-csv-upload-report>
  `
})
export class ViewCsvUploadReportContainer {
  csvFileUploadReport$: Observable<CsvFileUploadReport>;

  constructor(store: Store<State>) {
    this.csvFileUploadReport$ = store.pipe(select(getCsvFileUploadReport));
  }
}
