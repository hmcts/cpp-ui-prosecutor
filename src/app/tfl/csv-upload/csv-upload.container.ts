import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FeatureState, getCsvUploadStatus } from '../tfl.selectors';
import { ValidationError } from '@cpp/pdk/form/form.interfaces';
import { Observable } from 'rxjs';
import { ResetCsvUploadPageState, SubmitCsvFiles } from '../tfl.action';

@Component({
  selector: 'csv-upload',
  template: `
    <csv-upload-page
      [displayFileSubmittedBanner]="displayFileSubmittedBanner$ | async"
      (formSubmit)="formSubmit($event)"
    ></csv-upload-page>
  `
})
export class CsvUploadContainer implements OnDestroy {
  displayFileSubmittedBanner$: Observable<boolean>;

  constructor(private store: Store<FeatureState>) {
    this.displayFileSubmittedBanner$ = this.store.pipe(select(getCsvUploadStatus));
  }

  formSubmit({ headerCsv, offencesCsv }: { headerCsv: File; offencesCsv: File }) {
    this.store.dispatch(
      new SubmitCsvFiles({
        header: headerCsv,
        offences: offencesCsv
      })
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetCsvUploadPageState());
  }
}
