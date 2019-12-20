import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Case, Offence, WithdrawOffenceParam } from '../../contexts/sjp';
import { ValidationError } from '@cpp/pdk/form/form.interfaces';
import { Option } from '../../shared/interfaces';

@Component({
  selector: 'withdraw-offence-list',
  template: `
    <ol pdk-breadcrumb-list pdk-margin-vertical="4">
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="../../../../../../" pdk-breadcrumb>Home</a>
      </li>
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="../../../../../../search" pdk-breadcrumb>
          Search for a case
        </a>
      </li>
      <li pdk-breadcrumb-list-item>
        <a pdk-breadcrumb href="javascript: void(0)" routerLink="../../../../">Case Overview</a>
      </li>
      <li pdk-breadcrumb-list-item>
        <a pdk-breadcrumb>Withdraw offence</a>
      </li>
    </ol>
    <case-header-badge-container></case-header-badge-container>
    <pdk-error-summary *ngIf="errors" pdk-margin-top="5" focusOnChange title="Fix the following" [errors]="errors">
    </pdk-error-summary>

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithdrawOffenceComponent {
  @Input() offences: Offence[];
  @Input() kase: Case;
  @Input() caseWithdrawnStatus: boolean;
  @Input() offenceWithdrawalReasons: Option[];
  @Output() formSubmit = new EventEmitter<WithdrawOffenceParam[]>();
  errors: ValidationError[];
}
