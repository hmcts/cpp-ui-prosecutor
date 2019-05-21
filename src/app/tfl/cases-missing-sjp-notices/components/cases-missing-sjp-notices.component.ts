import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CaseDetails, CaseSummary } from '../../../contexts/sjp';

@Component({
  selector: 'cases-missing-sjp-notices',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol pdk-breadcrumb-list pdk-margin-top="4">
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="../../" pdk-breadcrumb>Home</a>
      </li>
      <li pdk-breadcrumb-list-item>
        Send missing SJP Notices to court
      </li>
    </ol>

    <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="6">
      Send missing SJP Notices to court
    </h1>

    <p pdk-typography="heading-medium">
      <span [ngPlural]="casesMissingNotices.length" data-test="cases-number">
        <ng-template ngPluralCase="=0">No cases</ng-template>
        <ng-template ngPluralCase="+1">1 case</ng-template>
        <ng-template ngPluralCase="other">{{ casesMissingNotices.length }} cases</ng-template>
      </span>
      missing notices
    </p>

    <list-cases-missing-sjp-notices [casesMissingNotices]="casesMissingNotices"></list-cases-missing-sjp-notices>

    <div *ngIf="casesMissingNotices.length > 0">
      <p pdk-typography="heading-medium" pdk-margin-vertical="10">
        When you've found the missing notices
      </p>

      <p pdk-typography="body">
        Put the notices in a new zip file and then upload.
      </p>

      <button pdk-button pdk-margin-vertical="5" routerLink="../../upload-documents">
        Go to upload documents
      </button>
    </div>
  `
})
export class CasesMissingSjpNoticesComponent {
  @Input() casesMissingNotices: CaseSummary[];
}
