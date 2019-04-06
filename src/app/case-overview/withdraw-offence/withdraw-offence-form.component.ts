import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Offence, WithdrawOffenceParam } from '../../contexts/sjp';
import { ValidationError } from '@cpp/pdk/form/form.interfaces';
import { WITHDRAW_OFFENCE_FORM_ERROR_MESSAGE, WITHDRAW_OFFENCE_FORM_REASON_OPTIONS } from './reason-mappings';

interface FormValues {
  [key: string]: {
    withdraw: boolean;
    reason: string;
  };
}

@Component({
  selector: 'withdraw-list-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form pdk-form (errors)="errors.emit($event)" (validSubmit)="mapFormValues(form.value)" novalidate>
      <div *ngIf="offences.length > 1">
        <h1 pdk-typography="heading-medium">
          <span>Would you like to withdraw the case (all offences)?</span>
        </h1>
        <div *ngIf="caseWithdrawnStatus" pdk-margin-vertical="5">
          <pdk-badge>
            Case Pending Withdrawal
          </pdk-badge>
        </div>
        <pdk-form-field>
          <pdk-radio-group inline #case="ngModel" [(ngModel)]="caseWithdrawn" name="case.withdraw" required>
            <pdk-radio-button [value]="true">Yes</pdk-radio-button>
            <pdk-radio-button [value]="false">No</pdk-radio-button>
          </pdk-radio-group>

          <ng-container *ngIf="case.value">
            <pdk-form-field
              pdk-margin-top="5"
              labelHidden="true"
              label="Reason for withdrawing"
              labelType="small"
              [errorMessages]="errorMessages"
            >
              <label pdk-label="small">Reason for withdrawing</label>
              <pdk-radio-group [ngModel]="caseReason" name="case.reason" [options]="reasonOptions" required>
              </pdk-radio-group>
            </pdk-form-field>
          </ng-container>
        </pdk-form-field>

        <h1 pdk-typography="heading-medium" pdk-margin-vertical="5">
          <span>Or</span>
        </h1>
      </div>

      <h1 pdk-typography="heading-medium" pdk-margin-top="5">
        <span [ngPlural]="offences.length">
          <ng-template ngPluralCase="=1">Would you like to withdraw the following offence?</ng-template>
          <ng-template ngPluralCase="other">Would you like to withdraw any of the following offences?</ng-template>
        </span>
      </h1>

      <div *ngFor="let offence of offences; let i = index">
        <offence-withdrawal-component
          [index]="offences.length > 1 ? i + 1 : 0"
          [offence]="offence"
          [caseWithdrawn]="caseWithdrawn"
        ></offence-withdrawal-component>
      </div>

      <div pdk-margin-top="5" pdk-margin-bottom="0">
        <button pdk-button type="submit" [disabled]="this.form.untouched">Confirm</button>

        <div pdk-margin-top="0">
          <a
            pdk-link
            pdk-typography="body-medium"
            data-test-id="cancel-withdrawal"
            href="javascript:void(0)"
            routerLink="../../../../"
          >
            Cancel
          </a>
        </div>
      </div>
    </form>
  `
})
export class WithdrawOffenceFormComponent implements OnInit {
  public readonly reasonOptions = WITHDRAW_OFFENCE_FORM_REASON_OPTIONS;
  public readonly errorMessages = WITHDRAW_OFFENCE_FORM_ERROR_MESSAGE;

  caseReason = '';
  caseWithdrawn = false;

  @ViewChild(NgForm) form: NgForm;

  @Input() caseWithdrawnStatus: boolean;
  @Input() offences: Offence[];
  @Output() errors = new EventEmitter<ValidationError[]>();
  @Output() submitOffenceWithdrawals = new EventEmitter<WithdrawOffenceParam[]>();

  ngOnInit(): void {
    this.caseWithdrawn = this.caseWithdrawnStatus;
    if (this.caseWithdrawnStatus) {
      this.caseReason = this.offences[0].withdrawalRequestReason;
    }
  }

  mapFormValues(values: FormValues[]) {
    if (this.caseWithdrawn) {
      const caseWithdrawnState = this.offences.reduce((accumulator, currentValue) => {
        return [...accumulator, { offenceId: currentValue.id, reason: values['case.reason'] }];
      }, []);
      this.submitOffenceWithdrawals.emit(caseWithdrawnState);
    } else {
      const selectedOffencesWithdrawnState = Object.keys(values).reduce((accumulator, key) => {
        const [offenceId, identifier] = key.split('.');
        return identifier === 'reason' ? [...accumulator, { offenceId, reason: values[key] }] : accumulator;
      }, []);
      this.submitOffenceWithdrawals.emit(selectedOffencesWithdrawnState);
    }
  }
}
