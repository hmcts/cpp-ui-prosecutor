import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  CaseDecision,
  DischargeOffenceDecision,
  FinancialPenaltyOffenceDecision,
  OffenceDecision
} from '../../../contexts/sjp';
import { formatCurrency } from '../../../contexts/sjp/util/sjp-util';

@Component({
  selector: 'financial-impositions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div pdk-margin-left="2">
      <div>
        <b pdk-typography="heading-medium">Impositions</b>
      </div>
      <div>
        <pdk-grid container pdk-padding-vertical="1" *ngIf="calcFine() > 0">
          <pdk-grid one-third>
            <b>To pay fine of</b>
          </pdk-grid>
          <pdk-grid two-thirds>
            {{ formatCurrency(this.calcFine()) }}
          </pdk-grid>
        </pdk-grid>
        <pdk-grid container pdk-padding-vertical="1">
          <pdk-grid one-third>
            <b>To pay compensation of</b>
          </pdk-grid>
          <pdk-grid two-thirds>
            {{ this.calcTotalCompensation() }}
          </pdk-grid>
        </pdk-grid>
        <pdk-grid container *ngIf="payment.fineTransferredTo" pdk-padding-vertical="1">
          <pdk-grid one-third>
            <b>Transfer of fine made to </b>
          </pdk-grid>
          <pdk-grid two-thirds>
            {{ payment.fineTransferredTo.nationalCourtName }}
          </pdk-grid>
        </pdk-grid>
        <pdk-grid container pdk-padding-vertical="1">
          <pdk-grid one-third>
            <b>To pay costs of</b>
          </pdk-grid>
          <pdk-grid two-thirds>
            {{ this.formatCurrency(this.caseDecision.financialImposition.costsAndSurcharge.costs) }}
          </pdk-grid>
        </pdk-grid>
        <pdk-grid container *ngIf="hasVictimSurcharge" pdk-padding-vertical="1">
          <pdk-grid one-third>
            <b>To pay victim surcharge of</b>
          </pdk-grid>
          <pdk-grid two-thirds>
            {{ this.formatCurrency(this.caseDecision.financialImposition.costsAndSurcharge.victimSurcharge) }}
          </pdk-grid>
        </pdk-grid>

        <pdk-grid container *ngIf="!hasVictimSurcharge" pdk-padding-vertical="1">
          <pdk-grid one-third>
            <b>Victim surcharge not imposed because</b>
          </pdk-grid>
          <pdk-grid two-thirds>
            {{ noVictimSurchargeReason }}
          </pdk-grid>
        </pdk-grid>
      </div>
    </div>
  `
})
export class FinancialImpositionsComponent {
  @Input() caseDecision: CaseDecision;
  formatCurrency = formatCurrency;

  calcTotalCompensation(): string {
    return formatCurrency(this.caseDecision.offenceDecisions.reduce((a, b) => a + this.getCompensation(b), 0));
  }

  calcFine(): number {
    return this.caseDecision.offenceDecisions
      .filter(a => a.decisionType === 'FINANCIAL_PENALTY')
      .map(offenceDecision => offenceDecision as FinancialPenaltyOffenceDecision)
      .reduce((sumOfFine, offenceDecision) => sumOfFine + offenceDecision.fine, 0);
  }

  getCompensation(offenceDecision: OffenceDecision): number {
    return (offenceDecision as (DischargeOffenceDecision | FinancialPenaltyOffenceDecision)).compensation;
  }

  allAbsoluteDischarge(): boolean {
    return this.caseDecision.offenceDecisions.every(
      offenceDecision =>
        offenceDecision.decisionType === 'DISCHARGE' &&
        (offenceDecision as DischargeOffenceDecision).dischargeType === 'ABSOLUTE'
    );
  }

  get noVictimSurchargeReason(): string {
    return this.allAbsoluteDischarge()
      ? 'Absolute Discharge'
      : this.caseDecision.financialImposition.costsAndSurcharge.reasonForNoVictimSurcharge;
  }

  get hasVictimSurcharge(): boolean {
    return this.caseDecision.financialImposition.costsAndSurcharge.victimSurcharge > 0;
  }

  get payment() {
    return this.caseDecision.financialImposition.payment;
  }
}
