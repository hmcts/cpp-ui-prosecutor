import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CaseCountResult } from '../../contexts/mi-report';

@Component({
  selector: 'download-case-decisions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-inset-text>
      <p pdk-typography="heading-medium">
        {{ caseCountResult.casesResultedCount }}
        case
        <span [ngPlural]="caseCountResult.casesResultedCount">
          <ng-template ngPluralCase="=1">result</ng-template>
          <ng-template ngPluralCase="other">results</ng-template>
        </span>
        found from {{ caseCountResult.fromDate }} to {{ caseCountResult.toDate }}
      </p>
      <a [href]="downloadUrl" target="_blank" pdk-button="secondary" *ngIf="caseCountResult.casesResultedCount">
        Download results in json file
      </a>
    </pdk-inset-text>
  `
})
export class DownloadCaseDecisionsComponent {
  @Input() caseCountResult: CaseCountResult;

  get downloadUrl() {
    return (
      '/api/mireportdata-query-api/query/api/rest/mireportdata/case-export?' +
      `fromDate=${this.caseCountResult.fromDate}&toDate=${this.caseCountResult.toDate}`
    );
  }
}
