import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Offence } from '../../contexts/sjp';

@Component({
  selector: 'withdraw-offence-list',
  template: `
    <div>
      <h1 pdk-typography="heading-xlarge" pdk-margin-top="5" pdk-margin-bottom="5">Manage offence withdrawals</h1>
    </div>
    <div pdk-typography="body" pdk-margin-bottom="5">You can ask a legal adviser to withdraw offences or the case.</div>

    <pdk-grid container>
      <pdk-grid three-quarters pdk-margin-top="5">
        <withdraw-list-form [offences]="this.offences" (submitOffencesWithdrawalRequest)="this.formSubmit.emit($event)">
        </withdraw-list-form>
      </pdk-grid>
    </pdk-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithdrawOffenceListComponent {
  @Input() offences: Offence[];
  @Output() formSubmit = new EventEmitter<any>();
}
