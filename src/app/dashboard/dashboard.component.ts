import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DefendantDetailsUpdatesResult, PleadedNotGuiltyCaseResult } from '../contexts/sjp';

@Component({
  selector: 'prosecutor-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="8">
      <span pdk-typography="caption-xlarge">Prosecutor</span>
      Single Justice Procedure
    </h1>
    <h2 pdk-typography="heading-medium" pdk-margin-top="8">Search for a case</h2>
    <search-input-container></search-input-container>

    <h2 pdk-typography="heading-medium" pdk-margin-top="8">Other tasks</h2>

    <review-not-guilty-pleas-link [numberOfCases]="pleadedNotGuiltyCasesDetail?.count"></review-not-guilty-pleas-link>

    <defendant-details-updates-link [numberOfUpdates]="defendantDetailsUpdates?.total"></defendant-details-updates-link>

    <div>
      <a href="javascript:void(0)" routerLink="search" pdk-link pdk-section="small">Manage offence withdrawals</a>
    </div>
    <div pdk-margin-top="6">
      <a href="javascript:void(0)" routerLink="export-case-decisions" pdk-link>Export case results by date</a>
    </div>
  `
})
export class DashboardComponent {
  @Input() pleadedNotGuiltyCasesDetail: PleadedNotGuiltyCaseResult;
  @Input() defendantDetailsUpdates: DefendantDetailsUpdatesResult;
}
