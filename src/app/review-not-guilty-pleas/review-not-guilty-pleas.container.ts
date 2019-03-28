import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { getPleadedNotGuiltyCasesDetail } from '../core/selectors';
import { PleadedNotGuiltyCaseResult } from '../contexts/sjp';
import { State } from '../reducers';

@Component({
  selector: 'review-not-guilty-pleas-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <review-not-guilty-pleas [pleadedNotGuiltyCasesDetail]="pleadedNotGuiltyCasesDetail$ | async">
    </review-not-guilty-pleas>
  `
})
export class ReviewNotGuiltyPleasContainer {
  pleadedNotGuiltyCasesDetail$: Observable<PleadedNotGuiltyCaseResult>;

  constructor(private store: Store<State>) {
    this.pleadedNotGuiltyCasesDetail$ = this.store.pipe(select(getPleadedNotGuiltyCasesDetail));
  }
}
