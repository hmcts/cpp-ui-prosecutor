import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Offence } from '../../contexts/sjp';

@Component({
  selector: 'withdraw-list-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form
      pdk-form
      (errors)="errors.emit($event)"
      (validSubmit)="submitOffencesWithdrawalRequest.emit(form.value)"
      novalidate
    >
      <div *ngIf="this.offences?.length > 1">
        <h1 pdk-typography="heading-medium">Would you like to withdraw the case (all offences)?</h1>
        <pdk-form-field>
          <pdk-radio-group
            inline
            name="all"
            ngModel
            [value]="true"
            [options]="[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]"
            required
          >
          </pdk-radio-group>
        </pdk-form-field>

        <h1 pdk-typography="heading-small" pdk-margin-top="5">Or</h1>
      </div>

      <h1 pdk-typography="heading-medium">Would you like to withdraw any of the following offences?</h1>

      <div *ngFor="let offence of offences; let i = index">
        <offence-component [number]="i + 1" [offence]="offence"></offence-component>
      </div>

      <div pdk-margin-top="5" pdk-margin-bottom="0">
        <button pdk-button type="submit" [disabled]="this.form.invalid">Confirm</button>

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
export class WithdrawOffenceListFormComponent {
  @Input() offences: Offence[];
  @Output() errors = new EventEmitter<any>();
  @Output() submitOffencesWithdrawalRequest = new EventEmitter<any>();

  @ViewChild(NgForm) form: NgForm;
}
