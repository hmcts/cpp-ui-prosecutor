import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { FeatureState, getCase, getDefendant, getOffences } from './case-overview.selectors';
import { Case, Defendant, Offence } from '../contexts/sjp';

@Component({
  selector: 'case-overview-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <case-overview [kase]="kase$ | async" [defendant]="defendant$ | async" [offences]="offences$ | async">
    </case-overview>
  `
})
export class CaseOverviewContainer {
  kase$: Observable<Case>;
  defendant$: Observable<Defendant>;
  offences$: Observable<Offence[]>;

  constructor(private store: Store<FeatureState>) {
    this.kase$ = this.store.pipe(select(getCase));
    this.defendant$ = this.store.pipe(select(getDefendant));
    this.offences$ = this.store.pipe(select(getOffences));
  }
}
