import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Case, Offence, PleaseStatus } from '../../../contexts/sjp';

@Component({
  selector: 'defendant-offence',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 pdk-typography="heading-large">
      Offence <span *ngIf="index">{{ index }}</span>
    </h2>
    <defendant-offence-warnings [offence]="offence"> </defendant-offence-warnings>
    <h3 pdk-typography="heading-medium">{{ offence.title }}</h3>
    <pdk-foldable-text pdk-typography="body-medium">
      {{ offence.wording }}
    </pdk-foldable-text>
    <p pdk-typography="body-small" pdk-margin-vertical="4">
      {{ offence.legislation }}
    </p>
    <p pdk-typography="body-small" pdk-margin-vertical="4" *ngIf="offence.chargeDate">
      On {{ offence.chargeDate | formatDate: 'd MMM y' }}
    </p>
    <div pdk-margin-vertical="6">
      <pdk-badge pdk-margin-right="4">
        {{ plea | pleaStatus }}
      </pdk-badge>
      <pdk-badge *ngIf="pendingWithdrawal">
        Pending withdrawal
      </pdk-badge>
    </div>
  `
})
export class DefendantOffenceComponent {
  @Input() index: number;
  @Input() kase: Case;
  @Input() offence: Offence;

  get plea(): PleaseStatus {
    return this.kase.completed && this.offence.plea === 'GUILTY' ? 'GUILTY_CASE_COMPLETED' : this.offence.plea;
  }

  get pendingWithdrawal(): boolean {
    return this.offence.withdrawalRequestReason && !this.kase.completed;
  }
}
