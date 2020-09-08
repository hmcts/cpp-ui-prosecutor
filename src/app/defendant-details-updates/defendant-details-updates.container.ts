import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getDefendantDetailsUpdates, getRegion } from '../core/selectors';
import { AcknowledgeDefendantDetailsUpdatesParam, DefendantDetailsUpdatesResult } from '../contexts/sjp';
import { State } from '../reducers';
import { AcknowledgeDefendantDetailsUpdates } from './defendant-details-updates.action';
import { RegionState } from '../core/reducers/entities.reducer';
import { LoadSelectedRegionSuccess } from '../core';

@Component({
  selector: 'defendant-details-updates-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <defendant-details-updates
      [defendantDetailsUpdates]="defendantDetailsUpdates$ | async"
      (acknowledgeDefendantDetailsUpdatesEmitter)="acknowledgeDefendantDetailsUpdates($event)"
      [region]="region$ | async"
      (setRegion)="setRegion($event)"
      (viewCase)="viewCase($event)"
    >
    </defendant-details-updates>
  `
})
export class DefendantDetailsUpdatesContainer {
  defendantDetailsUpdates$: Observable<DefendantDetailsUpdatesResult>;
  region$: Observable<RegionState>;

  constructor(private store: Store<State>, private router: Router) {
    this.defendantDetailsUpdates$ = this.store.pipe(select(getDefendantDetailsUpdates));
    this.region$ = this.store.pipe(select(getRegion));
  }

  acknowledgeDefendantDetailsUpdates(acknowledgedDefendantDetailsUpdates: AcknowledgeDefendantDetailsUpdatesParam): void {
    this.store.dispatch(new AcknowledgeDefendantDetailsUpdates(acknowledgedDefendantDetailsUpdates));
  }

  setRegion(selectedRegion: string): void {
    this.store.dispatch(new LoadSelectedRegionSuccess(selectedRegion));
    this.router.navigate(['user', 'defendant-details-updates', selectedRegion]);
  }

  viewCase(caseId: string): void {
    this.router.navigate(['user', 'case-overview', caseId]);
  }
}
