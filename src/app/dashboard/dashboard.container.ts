import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Prosecutor } from '@cpp/reference-data';
import { State } from '../reducers';
import {
  getPleadedNotGuiltyCasesDetail,
  getDefendantDetailsUpdates,
  getCasesMissingSJPNotice,
  getProsecutorByUserGroup
} from '../core/selectors';
import {
  PleadedNotGuiltyCaseResult,
  DefendantDetailsUpdatesResult,
  CasesMissingSjpNoticeResult
} from '../contexts/sjp';
import { DashboardComponent } from "./dashboard.component";
import { PdkGrid } from '@cpp/pdk';

@Component({
    selector: 'prosecutor-dashboard-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <prosecutor-dashboard
      [pleadedNotGuiltyCasesDetail]="pleadedNotGuiltyCasesDetail$ | async"
      [defendantDetailsUpdates]="defendantDetailsUpdates$ | async"
      [casesMissingSjpNoticeCount]="casesMissingSjpNoticeCount$ | async"
      [hasNpp]="(nonPoliceProsecutor$ | async).cpsFlag"
    ></prosecutor-dashboard>
    `,
    imports: [DashboardComponent, AsyncPipe, PdkGrid]
})
export class DashboardContainer {
  private store = inject<Store<State>>(Store);

  pleadedNotGuiltyCasesDetail$: Observable<PleadedNotGuiltyCaseResult>;
  defendantDetailsUpdates$: Observable<DefendantDetailsUpdatesResult>;
  casesMissingSjpNoticeCount$: Observable<CasesMissingSjpNoticeResult>;
  nonPoliceProsecutor$: Observable<Prosecutor>;

  constructor() {
    this.pleadedNotGuiltyCasesDetail$ = this.store.pipe(select(getPleadedNotGuiltyCasesDetail));
    this.defendantDetailsUpdates$ = this.store.pipe(select(getDefendantDetailsUpdates));
    this.casesMissingSjpNoticeCount$ = this.store.pipe(select(getCasesMissingSJPNotice));
    this.nonPoliceProsecutor$ = this.store.pipe(select(getProsecutorByUserGroup));
  }
}
