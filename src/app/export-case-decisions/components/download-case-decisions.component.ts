import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CaseCountResult } from '../../contexts/mi-report';
import { PdkButtonDirective, PdkInsetTextComponent, PdkMarginDirective, PdkTypographyDirective } from '@cpp/pdk';
import { NgPlural, NgPluralCase } from '@angular/common';

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

      @if (caseCountResult.casesResultedCount) {
      <a [href]="jsonDownloadUrl" target="_blank" pdk-button="secondary">
        Download results in json file
      </a>
      @if (role !== 'tfl') {
      <a [href]="csvDownloadUrl" target="_blank" pdk-button="secondary" pdk-margin-left="2">
        Download results in excel/csv file
      </a>
      } }
    </pdk-inset-text>
  `,
  imports: [
    PdkInsetTextComponent,
    NgPlural,
    NgPluralCase,
    PdkTypographyDirective,
    PdkButtonDirective,
    PdkMarginDirective
  ]
})
export class DownloadCaseDecisionsComponent {
  @Input() role: string;
  @Input() caseCountResult: CaseCountResult;

  get jsonDownloadUrl() {
    return (
      '/api/mireportdata-query-api/query/api/rest/mireportdata/case-export?' +
      `fromDate=${this.caseCountResult.fromDate}&toDate=${this.caseCountResult.toDate}`
    );
  }

  get csvDownloadUrl() {
    return `${this.jsonDownloadUrl}&csvExport=true`;
  }
}
