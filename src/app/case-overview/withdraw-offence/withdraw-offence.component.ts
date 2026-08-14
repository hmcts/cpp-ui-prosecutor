import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Case, Offence, WithdrawOffenceParam } from '../../contexts/sjp';
import { ValidationError } from '@cpp/pdk/form/form.interfaces';
import { Option } from '../../shared/interfaces';
import { Breadcrumb } from '../../shared/breadcrumb-links/breadcrumb-links.interface';
import { Breadcrumbs } from '../../shared/breadcrumb-links/breadcrumb-links.constant';
import { BreadcrumbLinksComponent } from '../../shared/breadcrumb-links/breadcrumb-links.component';

import { PdkCore, PdkErrorSummaryComponent, PdkGrid } from '@cpp/pdk';
import { WithdrawOffenceFormComponent } from './withdraw-offence-form.component';
import { CaseHeaderBadgeContainer } from '../common/case-header-badge/case-header-badge.container';

@Component({
  selector: 'withdraw-offence-list',
  template: `
    <breadcrumb-links [caseId]="kase.id" [breadcrumbs]="breadcrumbs"></breadcrumb-links>
    <case-header-badge-container></case-header-badge-container>
    @if (errors) {
    <pdk-error-summary pdk-margin-top="5" focusOnChange title="Fix the following" [errors]="errors">
    </pdk-error-summary>
    }

    <div>
      <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="5" data-test="withdraw-offence-heading">
        Manage offence withdrawals
      </h1>
    </div>
    <div pdk-typography="body" pdk-margin-bottom="5">You can ask a legal adviser to withdraw offences or the case.</div>

    <pdk-grid container>
      <pdk-grid three-quarters pdk-margin-top="5">
        <withdraw-list-form
          [offences]="offences"
          [caseWithdrawnStatus]="caseWithdrawnStatus"
          [offenceWithdrawalReasons]="offenceWithdrawalReasons"
          (errors)="errors = $event"
          (submitOffenceWithdrawals)="formSubmit.emit($event)"
        >
        </withdraw-list-form>
      </pdk-grid>
    </pdk-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BreadcrumbLinksComponent,
    PdkErrorSummaryComponent,
    PdkGrid,
    PdkCore,
    WithdrawOffenceFormComponent,
    CaseHeaderBadgeContainer
  ]
})
export class WithdrawOffenceComponent {
  @Input() offences: Offence[];
  @Input() kase: Case;
  @Input() caseWithdrawnStatus: boolean;
  @Input() offenceWithdrawalReasons: Option[];
  @Output() formSubmit = new EventEmitter<WithdrawOffenceParam[]>();
  errors: ValidationError[];
  breadcrumbs: Breadcrumb[] = [
    Breadcrumbs.HOME,
    Breadcrumbs.SEARCH,
    Breadcrumbs.CASE_OVERVIEW,
    Breadcrumbs.WITHDRAW_OFFENCE
  ];
}
