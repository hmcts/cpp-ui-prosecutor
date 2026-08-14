import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Offence, WithdrawOffenceParam } from '../../contexts/sjp';
import { ValidationError } from '@cpp/pdk/form/form.interfaces';
import { Option } from '../../shared/interfaces';
import {
  PdkBadge,
  PdkFormFieldComponent,
  PdkRadioGroupComponent,
  PdkRadioButtonComponent,
  PdkCore,
  PdkForm,
  PdkButtonDirective
} from '@cpp/pdk';
import { OffenceWithdrawalComponent } from './components/offence-withdrawal/offence-withdrawal.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgPlural, NgPluralCase } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface FormValues {
  [key: string]: {
    withdraw: boolean;
    withdrawalRequestReasonId: string;
  };
}

@Component({
  selector: 'withdraw-list-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form pdk-form (errors)="errors.emit($event)" (validSubmit)="mapFormValues(form.value)" novalidate>
      @if (offences.length > 1) {
      <div>
        <h1 pdk-typography="heading-medium">
          <span>Would you like to withdraw the case (all offences)?</span>
        </h1>
        @if (caseWithdrawnStatus) {
        <div pdk-margin-vertical="5">
          <pdk-badge>
            Case Pending Withdrawal
          </pdk-badge>
        </div>
        }
        <pdk-form-field>
          <pdk-radio-group
            [inline]="true"
            #case="ngModel"
            [(ngModel)]="caseWithdrawn"
            name="case.withdraw"
            [required]="true"
          >
            <pdk-radio-button [value]="true">Yes</pdk-radio-button>
            <pdk-radio-button [value]="false">No</pdk-radio-button>
          </pdk-radio-group>
          @if (case.value) {
          <pdk-form-field
            pdk-margin-top="5"
            labelHidden="true"
            label="Reason for withdrawing"
            labelType="small"
            [errorMessages]="errorMessages"
          >
            <pdk-radio-group
              [ngModel]="caseReason"
              name="case.withdrawalRequestReasonId"
              [options]="offenceWithdrawalReasons"
              [required]="true"
            >
            </pdk-radio-group>
          </pdk-form-field>
          }
        </pdk-form-field>
        <h1 pdk-typography="heading-medium" pdk-margin-vertical="5">
          <span>Or</span>
        </h1>
      </div>
      }

      <h1 pdk-typography="heading-medium" pdk-margin-top="5">
        <span [ngPlural]="offences.length">
          <ng-template ngPluralCase="=1">Would you like to withdraw the following offence?</ng-template>
          <ng-template ngPluralCase="other">Would you like to withdraw any of the following offences?</ng-template>
        </span>
      </h1>

      @for (offence of offences; track offence.id; let i = $index) {
      <div>
        <offence-withdrawal-component
          [index]="offences.length > 1 ? i + 1 : 0"
          [offence]="offence"
          [caseWithdrawn]="caseWithdrawn"
          [offenceWithdrawalReasons]="offenceWithdrawalReasons"
        ></offence-withdrawal-component>
      </div>
      }

      <div pdk-margin-top="5" pdk-margin-bottom="0">
        <button pdk-button type="submit" [disabled]="this.form.untouched">Confirm</button>

        <div pdk-margin-top="0">
          <a
            pdk-link
            pdk-typography="body-medium"
            data-test-id="cancel-withdrawal"
            href="javascript:void(0)"
            routerLink="../"
          >
            Cancel
          </a>
        </div>
      </div>
    </form>
  `,
  imports: [
    PdkCore,
    PdkForm,
    PdkBadge,
    PdkFormFieldComponent,
    PdkRadioGroupComponent,
    FormsModule,
    PdkRadioButtonComponent,
    OffenceWithdrawalComponent,
    TranslateModule,
    NgPlural,
    NgPluralCase,
    PdkButtonDirective,
    RouterLink,
    PdkButtonDirective
  ]
})
export class WithdrawOffenceFormComponent implements OnInit {
  public readonly errorMessages = [{ rule: 'required', message: 'Choose a reason' }];

  caseReason = '';
  caseWithdrawn = false;

  @ViewChild(NgForm, { static: true }) form: NgForm;

  @Input() caseWithdrawnStatus: boolean;
  @Input() offences: Offence[];
  @Input() offenceWithdrawalReasons: Option[];
  @Output() errors = new EventEmitter<ValidationError[] | any>();
  @Output() submitOffenceWithdrawals = new EventEmitter<WithdrawOffenceParam[]>();

  ngOnInit(): void {
    this.caseWithdrawn = this.caseWithdrawnStatus;
    if (this.caseWithdrawnStatus) {
      this.caseReason = this.offences[0].withdrawalRequestReasonId;
    }
  }

  mapFormValues(values: FormValues[]) {
    if (this.caseWithdrawn) {
      const caseWithdrawnState = this.offences.reduce((accumulator, currentValue) => {
        return [
          ...accumulator,
          { offenceId: currentValue.id, withdrawalRequestReasonId: values['case.withdrawalRequestReasonId'] }
        ];
      }, []);
      this.submitOffenceWithdrawals.emit(caseWithdrawnState);
    } else {
      const selectedOffencesWithdrawnState = Object.keys(values).reduce((accumulator, key) => {
        const [offenceId, identifier] = key.split('.');
        return identifier === 'withdrawalRequestReasonId'
          ? [...accumulator, { offenceId, withdrawalRequestReasonId: values[key] }]
          : accumulator;
      }, []);
      this.submitOffenceWithdrawals.emit(selectedOffencesWithdrawnState);
    }
  }
}
