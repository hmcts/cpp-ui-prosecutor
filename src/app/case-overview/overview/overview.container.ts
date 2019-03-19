import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { FeatureState, getCase, getDefendant, getOffences, getWithdrawOffenceStatus } from '../case-overview.selectors';
import { Case, Defendant, Offence } from '../../contexts/sjp';
import { WithdrawOffencesClear } from '../case-overview.action';

@Component({
  selector: 'case-overview-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <case-overview
      [kase]="kase$ | async"
      [defendant]="defendant$ | async"
      [offences]="offences$ | async"
      [displayOffencesWithdrawnBanner]="displayOffencesWithdrawnBanner$ | async"
    ></case-overview>
  `
})
export class OverviewContainer implements OnDestroy {
  kase$: Observable<Case>;
  defendant$: Observable<Defendant>;
  offences$: Observable<Offence[]>;
  displayOffencesWithdrawnBanner$: Observable<boolean>;

  constructor(private store: Store<FeatureState>) {
    this.kase$ = this.store.pipe(select(getCase));
    this.defendant$ = this.store.pipe(select(getDefendant));
    this.offences$ = this.store.pipe(select(getOffences));
    this.displayOffencesWithdrawnBanner$ = this.store.pipe(select(getWithdrawOffenceStatus));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new WithdrawOffencesClear());
  }
}
