import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getDefendantDetailsUpdates, getFormFilter, SetFilter, SetFilterPayload } from '../core';
import { AcknowledgeDefendantDetailsUpdatesParam, DefendantDetailsUpdatesResult } from '../contexts/sjp';
import { State } from '../reducers';
import { AcknowledgeDefendantDetailsUpdates } from './defendant-details-updates.action';
import { RegionState } from '../core/reducers/entities.reducer';
import { DefendantDetailsUpdatesComponent } from './defendant-details-updates.component';
import { AsyncPipe } from '@angular/common';
import { SelectOption } from '@cpp/pdk';
import { getProsecutorAuthoritiesOptions, PROSECUTOR_DEFAULT_VALUE } from '../search/search.selectors';

@Component({
  selector: 'defendant-details-updates-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <defendant-details-updates
      [defendantDetailsUpdates]="defendantDetailsUpdates$ | async"
      [prosecutorOptions]="prosecutorOptions$ | async"
      (acknowledgeDefendantDetailsUpdatesEmitter)="acknowledgeDefendantDetailsUpdates($event)"
      [region]="region$ | async"
      (setFilter)="setFilter($event)"
      (viewCase)="viewCase($event)"
    >
    </defendant-details-updates>
  `,
  imports: [DefendantDetailsUpdatesComponent, AsyncPipe]
})
export class DefendantDetailsUpdatesContainer {
  private store = inject<Store<State>>(Store);
  private router = inject(Router);

  defendantDetailsUpdates$: Observable<DefendantDetailsUpdatesResult>;
  region$: Observable<RegionState>;
  prosecutorOptions$: Observable<SelectOption[]>;

  constructor() {
    this.defendantDetailsUpdates$ = this.store.pipe(select(getDefendantDetailsUpdates));
    this.region$ = this.store.pipe(select(getFormFilter));
    this.prosecutorOptions$ = this.store.pipe(select(getProsecutorAuthoritiesOptions));
  }

  acknowledgeDefendantDetailsUpdates(
    acknowledgedDefendantDetailsUpdates: AcknowledgeDefendantDetailsUpdatesParam
  ): void {
    this.store.dispatch(new AcknowledgeDefendantDetailsUpdates(acknowledgedDefendantDetailsUpdates));
  }

  setFilter(payload: SetFilterPayload): void {
    this.store.dispatch(new SetFilter(payload));
    const { selectedRegion = 'ALL', prosecutor = PROSECUTOR_DEFAULT_VALUE } = payload;
    this.router.navigate(['user', 'defendant-details-updates', selectedRegion, prosecutor]);
  }

  viewCase(caseId: string): void {
    this.router.navigate(['user', 'case-overview', caseId]);
  }
}
