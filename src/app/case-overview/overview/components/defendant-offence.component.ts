import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Case, Offence, PleaseStatus } from '../../../contexts/sjp';
import { DefendantOffenceWarningsComponent } from "./defendant-offence-warnings.component";
import { PdkFoldableTextComponent, PdkBadge, PdkCore } from "@cpp/pdk";
import { FormatDatePipe } from '../../../shared/pipes/format-date/format-date.pipe';
import { PleaStatusPipe } from '../../../shared/pipes/please-status/plea-status.pipe';

@Component({
    selector: 'defendant-offence',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <h2 pdk-typography="heading-large">
      Offence @if (index) {
      <span>{{ index }}</span>
    }
    </h2>
    <defendant-offence-warnings [offence]="offence"> </defendant-offence-warnings>
    <h3 pdk-typography="heading-medium">{{ offence.title }}</h3>
    <pdk-foldable-text pdk-typography="body-medium">
      {{ offence.wording }}
    </pdk-foldable-text>
    <p pdk-typography="body-small" pdk-margin-vertical="4">
      {{ offence.legislation }}
    </p>
    @if (offence.chargeDate) {
      <p pdk-typography="body-small" pdk-margin-vertical="4">
        On {{ offence.chargeDate | formatDate: 'd MMM y' }}
      </p>
    }
    <div pdk-margin-vertical="6">
      <pdk-badge pdk-margin-right="4">
        {{ plea | pleaStatus }}
      </pdk-badge>
      @if (pendingWithdrawal) {
        <pdk-badge>
          Pending withdrawal
        </pdk-badge>
      }
    </div>
    `,
    imports: [PdkCore, DefendantOffenceWarningsComponent, PdkFoldableTextComponent, PdkBadge, FormatDatePipe, PleaStatusPipe]
})
export class DefendantOffenceComponent {
  @Input() index: number;
  @Input() kase: Case;
  @Input() offence: Offence;

  get plea(): PleaseStatus {
    return this.kase.completed && this.offence.plea === 'GUILTY' ? 'GUILTY_CASE_COMPLETED' : this.offence.plea;
  }

  get pendingWithdrawal(): boolean {
    return this.offence.withdrawalRequestReasonId && !this.kase.completed;
  }
}
