import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Offence, WithdrawOffenceState } from '../../contexts/sjp';
import { ValidationError } from '@cpp/pdk/form/form.interfaces';

export interface FormValues {
  [key: string]: WithdrawOffenceFormObj;
}

export interface WithdrawOffenceFormObj {
  withdraw: boolean;
  reason: string;
}

@Component({
  selector: 'withdraw-list-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form pdk-form (errors)="errors.emit($event)" (validSubmit)="mapFormValues(form.value)" novalidate>
      <h1 pdk-typography="heading-medium">Would you like to withdraw any of the following offences?</h1>

      <div *ngFor="let offence of offences; let i = index">
        <offence-withdrawal-component [number]="i + 1" [offence]="offence"></offence-withdrawal-component>
      </div>

      <div pdk-margin-top="5" pdk-margin-bottom="0">
        <button pdk-button type="submit" [disabled]="this.form.untouched">Confirm</button>

        <div pdk-margin-top="0">
          <a
            pdk-link
            pdk-typography="body-medium"
            data-test-id="cancel-withdrawal"
            href="javascript:void(0)"
            routerLink="../../.."
          >
            Cancel
          </a>
        </div>
      </div>
    </form>
  `
})
export class WithdrawOffenceFormComponent {
  @ViewChild(NgForm) form: NgForm;
  @Input() offences: Offence[];
  @Output() errors = new EventEmitter<ValidationError[]>();
  @Output() submitOffenceWithdrawals = new EventEmitter<WithdrawOffenceState>();

  mapFormValues(values: FormValues[]) {
    const offences = Object.keys(values).reduce((aggregator, key) => {
      const [offenceId, identifier] = key.split('.');
      return identifier === 'reason' ? [...aggregator, { offenceId, reason: values[key] }] : aggregator;
    }, []);
    this.submitOffenceWithdrawals.emit({
      withdrawalRequestsStatus: offences
    });
  }
}
