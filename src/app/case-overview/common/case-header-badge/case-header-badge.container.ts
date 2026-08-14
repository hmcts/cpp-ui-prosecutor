import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../reducers';
import { Observable } from 'rxjs';
import { Case } from '../../../contexts/sjp';
import { getCase } from '../../../core/selectors';
import { CaseHeaderBadgeComponent } from "./case-header-badge.component";
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'case-header-badge-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <case-header-badge [kase]="$kase | async"></case-header-badge>
  `,
  imports: [CaseHeaderBadgeComponent, AsyncPipe],
})
export class CaseHeaderBadgeContainer {
  private store = inject<Store<State>>(Store);

  $kase: Observable<Case>;

  constructor() {
    this.$kase = this.store.pipe(select(getCase));
  }
}
