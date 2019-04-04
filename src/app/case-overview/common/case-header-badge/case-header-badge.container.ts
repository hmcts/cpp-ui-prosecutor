import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../reducers';
import { Observable } from 'rxjs';
import { Case } from '../../../contexts/sjp';
import { getCase } from '../../../core/selectors';

@Component({
  selector: 'case-header-badge-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <case-header-badge [kase]="$kase | async"></case-header-badge>
  `
})
export class CaseHeaderBadgeContainer {
  $kase: Observable<Case>;

  constructor(private store: Store<State>) {
    this.$kase = this.store.pipe(select(getCase));
  }
}
