import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  `
})
export class DashboardContainer {
  pleadedNotGuiltyCasesDetail$: Observable<PleadedNotGuiltyCaseResult>;
  defendantDetailsUpdates$: Observable<DefendantDetailsUpdatesResult>;
  casesMissingSjpNoticeCount$: Observable<CasesMissingSjpNoticeResult>;
  nonPoliceProsecutor$: Observable<Prosecutor>;

  constructor(private store: Store<State>) {
    this.pleadedNotGuiltyCasesDetail$ = this.store.pipe(select(getPleadedNotGuiltyCasesDetail));
    this.defendantDetailsUpdates$ = this.store.pipe(select(getDefendantDetailsUpdates));
    this.casesMissingSjpNoticeCount$ = this.store.pipe(select(getCasesMissingSJPNotice));
    this.nonPoliceProsecutor$ = this.store.pipe(select(getProsecutorByUserGroup));
  }
}
