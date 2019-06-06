import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Offence } from '../../../../contexts/sjp/index';
import { Option } from '../../../../shared/interfaces';

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
        <div *ngIf="offence.withdrawalRequestReasonId" pdk-margin-vertical="5">
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
            label="Reason for withdrawing"
            labelForErrorSummary="Offence {{ index > 0 ? index : '' }}: Reason for withdrawing"
            labelType="small"
            [errorMessages]="errorMessages"
          >
            <pdk-radio-group
              [ngModel]="offenceReason"
              name="{{ offence.id }}.withdrawalRequestReasonId"
              [options]="offenceWithdrawalReasons"
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
  public readonly errorMessages = [{ rule: 'required', message: 'Choose a reason' }];

  @Input() offenceWithdrawalReasons: Option[];
  @Input() index: number;
  @Input() offence: Offence;
  @Input() caseWithdrawn: boolean;

  offenceReason = '';
  displayReason = false;

  ngOnInit(): void {
    this.offenceReason = this.offence.withdrawalRequestReasonId;
    this.displayReason = !!this.offence.withdrawalRequestReasonId;
  }
}
