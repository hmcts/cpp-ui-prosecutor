import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PleadedNotGuiltyCaseResult } from '../../contexts/sjp';
import { getPleadedNotGuiltyCasesDetail } from '../../core/selectors';
import { State } from '../../reducers';
import { getCasesWithSjpNoticeCount, getCsvUploadErrorCount, getDocumentsUploadErrorCount } from '../tfl.selectors';

@Component({
  selector: 'tfl-dashboard-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <tfl-dashboard
      [casesMissingSjpNoticeCount]="casesMissingSjpNoticeCount$ | async"
      [pleadedNotGuiltyCasesDetail]="pleadedNotGuiltyCasesDetail$ | async"
      [documentsUploadErrorCount]="documentsUploadErrorCount$ | async"
      [csvUploadErrorCount]="csvUploadErrorCount$ | async"
    >
    </tfl-dashboard>
  `
})
export class TflDashboardContainer {
  pleadedNotGuiltyCasesDetail$: Observable<PleadedNotGuiltyCaseResult>;
  casesMissingSjpNoticeCount$: Observable<number>;
  documentsUploadErrorCount$: Observable<number>;
  csvUploadErrorCount$: Observable<number>;

  constructor(private store: Store<State>) {
    this.pleadedNotGuiltyCasesDetail$ = this.store.pipe(select(getPleadedNotGuiltyCasesDetail));
    this.casesMissingSjpNoticeCount$ = this.store.pipe(select(getCasesWithSjpNoticeCount));
    this.documentsUploadErrorCount$ = this.store.pipe(select(getDocumentsUploadErrorCount));
    this.csvUploadErrorCount$ = this.store.pipe(select(getCsvUploadErrorCount));
  }
}
