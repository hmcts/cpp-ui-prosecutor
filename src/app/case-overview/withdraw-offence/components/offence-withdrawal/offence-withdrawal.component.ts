import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Offence } from '../../../../contexts/sjp/index';
import { Option } from '../../../../shared/interfaces';
import { PdkDividerComponent, PdkFoldableTextComponent, PdkFormFieldComponent, PdkBadge, PdkRadioGroupComponent, PdkRadioButtonComponent, PdkCore } from "@cpp/pdk";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'offence-withdrawal-component',
    changeDetection: ChangeDetectionStrategy.OnPush,
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
    template: `
    @if (offence) {
      <div pdk-margin-vertical="5" pdk-typography="body-medium">
        <pdk-divider></pdk-divider>
        <div pdk-margin="0">
          <b
            >Offence @if (index) {
            <span>{{ index }}</span
              >
              }: {{ offence.title }}</b
              >
            </div>
            <pdk-foldable-text pdk-margin-top="2">
              {{ offence.wording }}
            </pdk-foldable-text>
            @if (!caseWithdrawn) {
              <pdk-form-field>
                @if (offence.withdrawalRequestReasonId) {
                  <div pdk-margin-vertical="5">
                    <pdk-badge>
                      Pending Withdrawal
                    </pdk-badge>
                  </div>
                }
                <pdk-radio-group [inline]="true" #reason="ngModel" [(ngModel)]="displayReason" name="{{ offence.id }}.withdraw" [required]="true">
                  <pdk-radio-button [value]="true">Yes</pdk-radio-button>
                  <pdk-radio-button [value]="false">No</pdk-radio-button>
                </pdk-radio-group>
                @if (reason.value) {
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
                      [required]="true"
                      >
                    </pdk-radio-group>
                  </pdk-form-field>
                }
              </pdk-form-field>
            }
          </div>
        }
    `,
    imports: [PdkCore, PdkDividerComponent, PdkFoldableTextComponent, PdkFormFieldComponent, PdkBadge, PdkRadioGroupComponent, PdkRadioButtonComponent, FormsModule]
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
