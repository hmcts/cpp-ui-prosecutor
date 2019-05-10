import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  FeatureState,
  getDatesToAvoidFailed,
  getWithdrawOffenceStatus,
  getWithdrawOffenceFailed
} from '../case-overview.selectors';
import { Case, Defendant, Offence } from '../../contexts/sjp';
import { ResetCaseOverviewState } from '../case-overview.action';
import { getCase, getDefendant, getOffences } from '../../core/selectors';

@Component({
  selector: 'case-overview-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <case-overview
      [kase]="kase$ | async"
      [defendant]="defendant$ | async"
      [offences]="offences$ | async"
      [displayOffencesWithdrawnBanner]="displayOffencesWithdrawnBanner$ | async"
      [displayDatesToAvoidUpdateFailedBanner]="displayDatesToAvoidUpdateFailedBanner$ | async"
      [displayOffencesWithdrawnFailedBanner]="displayOffencesWithdrawnFailedBanner$ | async"
    ></case-overview>
  `
})
export class OverviewContainer implements OnDestroy {
  kase$: Observable<Case>;
  defendant$: Observable<Defendant>;
  offences$: Observable<Offence[]>;
  displayOffencesWithdrawnBanner$: Observable<boolean>;
  displayOffencesWithdrawnFailedBanner$: Observable<boolean>;
  displayDatesToAvoidUpdateFailedBanner$: Observable<boolean>;

  constructor(private store: Store<FeatureState>) {
    this.kase$ = this.store.pipe(select(getCase));
    this.defendant$ = this.store.pipe(select(getDefendant));
    this.offences$ = this.store.pipe(select(getOffences));
    this.displayOffencesWithdrawnBanner$ = this.store.pipe(select(getWithdrawOffenceStatus));
    this.displayOffencesWithdrawnFailedBanner$ = this.store.pipe(select(getWithdrawOffenceFailed));
    this.displayDatesToAvoidUpdateFailedBanner$ = this.store.pipe(select(getDatesToAvoidFailed));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetCaseOverviewState());
  }
}
