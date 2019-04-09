import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../reducers';
import { getPleadedNotGuiltyCasesDetail, getDefendantDetailsUpdates } from '../core/selectors';
import { PleadedNotGuiltyCaseResult, DefendantDetailsUpdatesResult } from '../contexts/sjp';

@Component({
  selector: 'prosecutor-dashboard-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <prosecutor-dashboard
      [pleadedNotGuiltyCasesDetail]="pleadedNotGuiltyCasesDetail$ | async"
      [defendantDetailsUpdates]="defendantDetailsUpdates$ | async"
    ></prosecutor-dashboard>
  `
})
export class DashboardContainer {
  pleadedNotGuiltyCasesDetail$: Observable<PleadedNotGuiltyCaseResult>;
  defendantDetailsUpdates$: Observable<DefendantDetailsUpdatesResult>;

  constructor(private store: Store<State>) {
    this.pleadedNotGuiltyCasesDetail$ = this.store.pipe(select(getPleadedNotGuiltyCasesDetail));
    this.defendantDetailsUpdates$ = this.store.pipe(select(getDefendantDetailsUpdates));
  }
}
