import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CaseSummary } from '../../contexts/sjp';
import { Breadcrumbs } from '../../shared/breadcrumb-links/breadcrumb-links.constant';
import { Breadcrumb } from '../../shared/breadcrumb-links/breadcrumb-links.interface';
import { BreadcrumbLinksComponent } from '../../shared/breadcrumb-links/breadcrumb-links.component';
import { NgPlural, NgPluralCase } from '@angular/common';
import { ListCasesMissingSjpNoticesComponent } from './list-cases-missing-sjp-notices.component';
import { PdkTypographyDirective } from '@cpp/pdk';
@Component({
  selector: 'cases-missing-sjp-notices',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <breadcrumb-links [breadcrumbs]="breadcrumbs" [showTitle]="true"></breadcrumb-links>
    <p pdk-typography="heading-medium">
      <span [ngPlural]="casesMissingNotices.length" data-test="cases-number">
        <ng-template ngPluralCase="=0">No cases</ng-template>
        <ng-template ngPluralCase="+1">1 case</ng-template>
        <ng-template ngPluralCase="other">{{ casesMissingNotices.length }} cases</ng-template>
      </span>
      missing notices
    </p>

    <list-cases-missing-sjp-notices [casesMissingNotices]="casesMissingNotices"></list-cases-missing-sjp-notices>
  `,
  imports: [
    BreadcrumbLinksComponent,
    ListCasesMissingSjpNoticesComponent,
    NgPlural,
    NgPluralCase,
    PdkTypographyDirective
  ]
})
export class CasesMissingSjpNoticesComponent {
  @Input() casesMissingNotices: CaseSummary[];
  breadcrumbs: Breadcrumb[] = [Breadcrumbs.HOME, Breadcrumbs.CASES_MISSING_SJP_NOTICES];
}
