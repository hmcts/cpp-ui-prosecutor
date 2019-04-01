import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PleadedNotGuiltyCaseResult } from '../../contexts/sjp';
import { getPleadedNotGuiltyCasesDetail } from '../../core/selectors';
import { State } from '../../reducers';
import { getCasesWithSjpNoticeCount } from '../tfl.selectors';

@Component({
  selector: 'tfl-dashboard-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <tfl-dashboard
      [casesWithSjpNoticeCount]="casesWithSjpNoticeCount$ | async"
      [pleadedNotGuiltyCasesDetail]="pleadedNotGuiltyCasesDetail$ | async"
    >
    </tfl-dashboard>
  `
})
export class TflDashboardContainer {
  pleadedNotGuiltyCasesDetail$: Observable<PleadedNotGuiltyCaseResult>;
  casesWithSjpNoticeCount$: Observable<number>;

  constructor(private store: Store<State>) {
    this.pleadedNotGuiltyCasesDetail$ = this.store.pipe(select(getPleadedNotGuiltyCasesDetail));
    this.casesWithSjpNoticeCount$ = this.store.pipe(select(getCasesWithSjpNoticeCount));
  }
}
