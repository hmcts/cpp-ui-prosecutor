import { ChangeDetectionStrategy, Component } from '@angular/core';
import { State } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { CsvFileUploadDetails } from '../../contexts/staging-tfl';
import { Observable } from 'rxjs';
import { getCsvFileUploadDetails } from './check-csv-upload.selector';

@Component({
  selector: 'check-csv-upload-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <check-csv-upload [csvFileUploadDetails]="csvFileUploadDetails$ | async"></check-csv-upload>
  `
})
export class CheckCsvUploadContainer {
  csvFileUploadDetails$: Observable<CsvFileUploadDetails[]>;

  constructor(private store: Store<State>) {
    this.csvFileUploadDetails$ = this.store.pipe(select(getCsvFileUploadDetails));
  }
}
