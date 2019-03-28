import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Offence, WithdrawOffenceParam } from '../../contexts/sjp';
import { ValidationError } from '@cpp/pdk/form/form.interfaces';

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
      <h1 pdk-typography="heading-medium">
        <span [ngPlural]="offences.length">
          <ng-template ngPluralCase="=1">Would you like to withdraw the following offence?</ng-template>
          <ng-template ngPluralCase="other">Would you like to withdraw any of the following offences?</ng-template>
        </span>
      </h1>

      <div *ngFor="let offence of offences; let i = index">
        <offence-withdrawal-component
          [index]="offences.length > 1 ? i + 1 : 0"
          [offence]="offence"
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
export class WithdrawOffenceFormComponent {
  @ViewChild(NgForm) form: NgForm;

  @Input() offences: Offence[];
  @Output() errors = new EventEmitter<ValidationError[]>();
  @Output() submitOffenceWithdrawals = new EventEmitter<WithdrawOffenceParam[]>();

  mapFormValues(values: FormValues[]) {
    const selectedOffences = Object.keys(values).reduce((aggregator, key) => {
      const [offenceId, identifier] = key.split('.');
      return identifier === 'reason' ? [...aggregator, { offenceId, reason: values[key] }] : aggregator;
    }, []);

    this.submitOffenceWithdrawals.emit(selectedOffences);
  }
}
