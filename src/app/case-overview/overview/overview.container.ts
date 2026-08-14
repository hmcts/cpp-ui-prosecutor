import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  FeatureState,
  getCaseDecisionsWithOffenceDecisions,
  getDatesToAvoidFailed,
  getWithdrawOffenceStatus,
  getCaseNotes
} from '../case-overview.selectors';
import { Case, CaseDecision, Defendant, Offence, CaseNotes } from '../../contexts/sjp';
import { ResetCaseOverviewState } from '../case-overview.action';
import { getCase, getDefendant, getOffences } from '../../core/selectors';
import { OverviewComponent } from "./components";
import { AsyncPipe } from '@angular/common';

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
      [caseDecisions]="caseDecisions$ | async"
      [caseNotes]="caseNotes$ | async"
    ></case-overview>
  `,
    imports: [OverviewComponent, AsyncPipe]
})
export class OverviewContainer implements OnDestroy {
  private store = inject<Store<FeatureState>>(Store);

  kase$: Observable<Case>;
  defendant$: Observable<Defendant>;
  offences$: Observable<Offence[]>;
  displayOffencesWithdrawnBanner$: Observable<boolean>;
  displayDatesToAvoidUpdateFailedBanner$: Observable<boolean>;
  caseDecisions$: Observable<CaseDecision[]>;
  caseNotes$: Observable<CaseNotes>;

  constructor() {
    this.kase$ = this.store.pipe(select(getCase));
    this.defendant$ = this.store.pipe(select(getDefendant));
    this.offences$ = this.store.pipe(select(getOffences));
    this.displayOffencesWithdrawnBanner$ = this.store.pipe(select(getWithdrawOffenceStatus));
    this.displayDatesToAvoidUpdateFailedBanner$ = this.store.pipe(select(getDatesToAvoidFailed));
    this.caseDecisions$ = this.store.pipe(select(getCaseDecisionsWithOffenceDecisions));
    this.caseNotes$ = this.store.pipe(select(getCaseNotes));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ResetCaseOverviewState());
  }
}
