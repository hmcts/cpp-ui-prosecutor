import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { getPleadedNotGuiltyCasesDetail } from '../core/selectors';
import { State } from '../core/reducers';
import { PleadedNotGuiltyCasesDetail } from '../contexts/sjp';

@Component({
  selector: 'review-not-guilty-pleas-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <review-not-guilty-pleas
      [pleadedNotGuiltyCasesDetail]="pleadedNotGuiltyCasesDetail$ | async"
    ></review-not-guilty-pleas>
  `
})
export class ReviewNotGuiltyPleasContainer {
  pleadedNotGuiltyCasesDetail$: Observable<PleadedNotGuiltyCasesDetail>;

  constructor(private store: Store<State>) {
    this.pleadedNotGuiltyCasesDetail$ = this.store.pipe(select(getPleadedNotGuiltyCasesDetail));
  }
}
