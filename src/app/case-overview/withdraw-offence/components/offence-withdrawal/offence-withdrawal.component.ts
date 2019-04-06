import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Offence } from '../../../../contexts/sjp/index';
import { WITHDRAW_OFFENCE_FORM_ERROR_MESSAGE, WITHDRAW_OFFENCE_FORM_REASON_OPTIONS } from '../../reason-mappings';

@Component({
  selector: 'offence-withdrawal-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  template: `
    <div *ngIf="offence" pdk-margin-vertical="5" pdk-typography="body-medium">
      <pdk-divider></pdk-divider>
      <div pdk-margin="0">
        <b
          >Offence <span *ngIf="index">{{ index }}</span
          >: {{ offence.title }}</b
        >
      </div>
      <pdk-foldable-text pdk-margin-top="2">
        {{ offence.wording }}
      </pdk-foldable-text>

      <pdk-form-field *ngIf="!caseWithdrawn">
        <div *ngIf="offence.withdrawalRequestReason" pdk-margin-vertical="5">
          <pdk-badge>
            Pending Withdrawal
          </pdk-badge>
        </div>

        <pdk-radio-group inline #reason="ngModel" [ngModel]="displayReason" name="{{ offence.id }}.withdraw" required>
          <pdk-radio-button [value]="true">Yes</pdk-radio-button>
          <pdk-radio-button [value]="false">No</pdk-radio-button>
        </pdk-radio-group>

        <ng-container *ngIf="reason.value">
          <pdk-form-field
            pdk-margin-top="5"
            labelHidden="true"
            label="Offence {{ index > 0 ? index : '' }}: Reason for withdrawing"
            labelType="small"
            [errorMessages]="errorMessages"
          >
            <label pdk-label="small">Reason for withdrawing</label>
            <pdk-radio-group
              [ngModel]="offenceReason"
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
export class OffenceWithdrawalComponent implements OnInit {
  public readonly reasonOptions = WITHDRAW_OFFENCE_FORM_REASON_OPTIONS;
  public readonly errorMessages = WITHDRAW_OFFENCE_FORM_ERROR_MESSAGE;

  @Input() index: number;
  @Input() offence: Offence;
  @Input() caseWithdrawn: boolean;

  offenceReason = '';
  displayReason = false;

  ngOnInit(): void {
    this.offenceReason = this.offence.withdrawalRequestReason;
    this.displayReason = !!this.offence.withdrawalRequestReason;
  }
}
