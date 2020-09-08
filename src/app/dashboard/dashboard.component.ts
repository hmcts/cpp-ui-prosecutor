import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  DefendantDetailsUpdatesResult,
  PleadedNotGuiltyCaseResult,
  CasesMissingSjpNoticeResult
} from '../contexts/sjp';

@Component({
  selector: 'prosecutor-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-grid>
      <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="8">
        <span pdk-typography="caption-xlarge">Prosecutor</span>
        Single Justice Procedure
      </h1>
      <h2 pdk-typography="heading-medium" pdk-margin-top="8">Search for a case</h2>
      <search-input-container></search-input-container>
    </pdk-grid>
    <pdk-grid container>
      <pdk-grid two-thirds>
        <h2 pdk-typography="heading-medium" pdk-margin-top="8">Other tasks</h2>

        <review-not-guilty-pleas-link
          [numberOfCases]="pleadedNotGuiltyCasesDetail?.count"
        ></review-not-guilty-pleas-link>

        <defendant-details-updates-link
          [numberOfUpdates]="defendantDetailsUpdates?.total"
        ></defendant-details-updates-link>

        <div>
          <a href="javascript:void(0)" routerLink="search" pdk-link pdk-section="small">Manage offence withdrawals</a>
        </div>
        <div pdk-margin-top="6">
          <a href="javascript:void(0)" routerLink="export-case-decisions" pdk-link>Export case results by date</a>
        </div>
      </pdk-grid>
      <pdk-grid one-third>
        <div *ngIf="casesMissingSjpNoticeCount?.count > 0; else noLink"  pdk-margin-top="8">
          <a href="javascript: void(0);" routerLink="cases-missing-sjp-notices" title="Cases missing SJP notices">
            <pdk-summary-item
              pdk-text-colour="blue"
              hero
              [count]="casesMissingSjpNoticeCount?.count"
              label="cases missing SJP notices"
            >
            </pdk-summary-item>
          </a>
        </div>
        <ng-template #noLink>
          <pdk-summary-item hero [count]="casesMissingSjpNoticeCount?.count" label="cases missing SJP notices">
          </pdk-summary-item>
        </ng-template>
      </pdk-grid>
    </pdk-grid>
  `
})
export class DashboardComponent {
  @Input() pleadedNotGuiltyCasesDetail: PleadedNotGuiltyCaseResult;
  @Input() defendantDetailsUpdates: DefendantDetailsUpdatesResult;
  @Input() casesMissingSjpNoticeCount: CasesMissingSjpNoticeResult;
}
