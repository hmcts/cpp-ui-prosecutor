import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Offence } from '../../../../contexts/sjp/index';
import { REASON_OPTIONS } from '../../reason-mappings';

@Component({
  selector: 'offence-withdrawal-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  template: `
    <div *ngIf="offence" pdk-margin-vertical="5" pdk-typography="body-medium">
      <pdk-divider></pdk-divider>
      <div *ngIf="number" pdk-margin="0">
        <b>Offence {{ number }}: {{ offence.title }}</b>
      </div>
      <pdk-foldable-text pdk-margin-top="2">
        {{ offence.wording }}
      </pdk-foldable-text>

      <div *ngIf="offence.withdrawalRequestReason" pdk-margin-vertical="5">
        <pdk-badge>
          Pending withdrawal
        </pdk-badge>
      </div>

      <pdk-form-field>
        <pdk-radio-group inline #reason="ngModel" [ngModel]="displayReason" name="{{ offence.id }}.withdraw" required>
          <pdk-radio-button [value]="true">Yes</pdk-radio-button>
          <pdk-radio-button [value]="false">No</pdk-radio-button>
        </pdk-radio-group>

        <ng-container *ngIf="reason.value">
          <pdk-form-field
            pdk-margin-top="5"
            labelHidden="true"
            label="Offence {{ number }}: Reason for withdrawing"
            labelType="small"
            errorMessages="errorMessage"
          >
            <label pdk-label="small">Reason for withdrawing</label>
            <pdk-radio-group
              [ngModel]="offence.withdrawalRequestReason"
              name="{{ offence.id }}.reason"
              [options]="reasonOptions"
              required
            >
            </pdk-radio-group>
          </pdk-form-field>
        </ng-container>
      </pdk-form-field>
    </div>
  `
})
export class OffenceWithdrawalComponent {
  reasonOptions = REASON_OPTIONS;

  @Input() number: number;
  @Input() offence: Offence;

  get displayReason() {
    return !!this.offence.withdrawalRequestReason;
  }

  errorMessage = [{ rule: 'required', message: 'Choose a reason' }];
}
