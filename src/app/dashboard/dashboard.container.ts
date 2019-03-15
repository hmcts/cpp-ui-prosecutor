import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../reducers';
import { getPleadedNotGuiltyCasesDetail } from '../core/selectors';
import { PleadedNotGuiltyCasesDetail } from '../contexts/sjp';

@Component({
  selector: 'prosecutor-dashboard-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <prosecutor-dashboard [pleadedNotGuiltyCasesDetail]="pleadedNotGuiltyCasesDetail$ | async"> </prosecutor-dashboard>
  `
})
export class DashboardContainer {
  pleadedNotGuiltyCasesDetail$: Observable<PleadedNotGuiltyCasesDetail>;

  constructor(private store: Store<State>) {
    this.pleadedNotGuiltyCasesDetail$ = this.store.pipe(select(getPleadedNotGuiltyCasesDetail));
  }
}
