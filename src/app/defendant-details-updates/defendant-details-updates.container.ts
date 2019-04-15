import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { getDefendantDetailsUpdates } from '../core/selectors';
import { DefendantDetailsUpdatesResult } from '../contexts/sjp';
import { State } from '../reducers';

@Component({
  selector: 'defendant-details-updates-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <defendant-details-updates [defendantDetailsUpdates]="defendantDetailsUpdates$ | async">
    </defendant-details-updates>
  `
})
export class DefendantDetailsUpdatesContainer {
  defendantDetailsUpdates$: Observable<DefendantDetailsUpdatesResult>;

  constructor(private store: Store<State>) {
    this.defendantDetailsUpdates$ = this.store.pipe(select(getDefendantDetailsUpdates));
  }
}
