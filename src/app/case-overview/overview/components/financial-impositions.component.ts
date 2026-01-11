import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  CaseDecision,
  DischargeOffenceDecision,
  FinancialPenaltyOffenceDecision,
  OffenceDecision
} from '../../../contexts/sjp';
import { formatCurrency } from '../../../contexts/sjp/util/sjp-util';
import { PdkCore, PdkGrid } from "@cpp/pdk";

@Component({
    selector: 'financial-impositions',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div pdk-margin-left="2">
      <div>
        <b pdk-typography="heading-medium">Impositions</b>
      </div>
      <div>
        @if (calcFine() > 0) {
          <pdk-grid container pdk-padding-vertical="1">
            <pdk-grid one-third>
              <b>To pay fine of</b>
            </pdk-grid>
            <pdk-grid two-thirds data-role="imposition-fine-amount">
              {{ formatCurrency(this.calcFine()) }}
            </pdk-grid>
          </pdk-grid>
        }
        @if (showCompensation) {
          <pdk-grid container pdk-padding-vertical="1">
            <pdk-grid one-third>
              <b>To pay compensation of</b>
            </pdk-grid>
            <pdk-grid two-thirds data-role="imposition-compensation-amount">
              {{ formatCurrency(this.calcTotalCompensation()) }}
            </pdk-grid>
          </pdk-grid>
        }
        @if (payment.fineTransferredTo) {
          <pdk-grid container pdk-padding-vertical="1">
            <pdk-grid one-third>
              <b>Transfer of fine made to </b>
            </pdk-grid>
            <pdk-grid two-thirds>
              {{ payment.fineTransferredTo.nationalCourtName }}
            </pdk-grid>
          </pdk-grid>
        }
        @if (calcTotalExcisePenalty() > 0) {
          <pdk-grid container pdk-padding-vertical="1">
            <pdk-grid one-third>
              <b>To pay excise penalty of</b>
            </pdk-grid>
            <pdk-grid two-thirds data-role="imposition-excise-penalty-amount">
              {{ formatCurrency(this.calcTotalExcisePenalty()) }}
            </pdk-grid>
          </pdk-grid>
        }
        @if (calcTotalBackDuty() > 0) {
          <pdk-grid container pdk-padding-vertical="1">
            <pdk-grid one-third>
              <b>To pay back duty of</b>
            </pdk-grid>
            <pdk-grid two-thirds data-role="imposition-backduty-amount">
              {{ formatCurrency(this.calcTotalBackDuty()) }}
            </pdk-grid>
          </pdk-grid>
        }
        @if (showCosts) {
          <pdk-grid container pdk-padding-vertical="1">
            <pdk-grid one-third>
              <b>To pay costs of</b>
            </pdk-grid>
            <pdk-grid two-thirds data-role="imposition-costs-amount">
              {{ this.formatCurrency(this.caseDecision.financialImposition.costsAndSurcharge.costs) }}
            </pdk-grid>
          </pdk-grid>
        }
        @if (!showCosts && reasonForNoCosts) {
          <pdk-grid container pdk-padding-vertical="1">
            <pdk-grid one-third>
              <b>No order for costs because</b>
            </pdk-grid>
            <pdk-grid two-thirds>
              {{ reasonForNoCosts }}
            </pdk-grid>
          </pdk-grid>
        }
        @if (hasVictimSurcharge) {
          <pdk-grid container pdk-padding-vertical="1">
            <pdk-grid one-third>
              <b>To pay victim surcharge of</b>
            </pdk-grid>
            <pdk-grid two-thirds data-role="imposition-surcharge-amount">
              {{ this.formatCurrency(this.caseDecision.financialImposition.costsAndSurcharge.victimSurcharge) }}
            </pdk-grid>
          </pdk-grid>
          @if (caseDecision.financialImposition.costsAndSurcharge.reasonForReducedVictimSurcharge) {
            <pdk-grid container pdk-padding-vertical="1"
              >
              <pdk-grid one-third>
                <b>Victim surcharge reduced because</b>
              </pdk-grid>
              <pdk-grid two-thirds>
                {{ this.caseDecision.financialImposition.costsAndSurcharge.reasonForReducedVictimSurcharge }}
              </pdk-grid>
            </pdk-grid>
          }
        }
        @if (!hasVictimSurcharge && noVictimSurchargeReason) {
          <pdk-grid container pdk-padding-vertical="1">
            <pdk-grid one-third>
              <b>Victim surcharge not imposed because</b>
            </pdk-grid>
            <pdk-grid two-thirds>
              {{ noVictimSurchargeReason }}
            </pdk-grid>
          </pdk-grid>
        }
      </div>
    </div>
    `,
    imports: [PdkCore, PdkGrid]
})
export class FinancialImpositionsComponent {
  mCaseDecision: CaseDecision;
  @Input()
  set caseDecision(value: CaseDecision) {
    this.mCaseDecision = value;
    this.offenceDecisions = value.offenceDecisions
      .filter(a => a.decisionType === 'DISCHARGE' || a.decisionType === 'FINANCIAL_PENALTY');
  }
  get caseDecision() {
    return this.mCaseDecision;
  }
  offenceDecisions: OffenceDecision[];
  formatCurrency = formatCurrency;


  calcTotalCompensation(): number {
    return this.offenceDecisions.reduce((a, b) => a + this.getCompensation(b), 0);
  }

  calcFine(): number {
    const calculatedTotal = this.offenceDecisions
      .map(offenceDecision => offenceDecision as FinancialPenaltyOffenceDecision)
      .filter(offenceDecision => offenceDecision.decisionType === 'FINANCIAL_PENALTY' && !!offenceDecision.fine)
      .reduce((sumOfFine, offenceDecision) => sumOfFine + offenceDecision.fine, 0);
    return calculatedTotal;
  }

  calcTotalExcisePenalty(): number {
    const calculatedTotal = this.offenceDecisions
      .map(offenceDecision => offenceDecision as FinancialPenaltyOffenceDecision)
      .filter(offenceDecision => offenceDecision.excisePenalty > 0)
      .reduce((sumOfExcisePenalty, offenceDecision) => sumOfExcisePenalty + offenceDecision.excisePenalty, 0);
    return calculatedTotal;
  }

  calcTotalBackDuty(): number {
    const calculatedTotal = this.offenceDecisions
      .map(offenceDecision => offenceDecision as FinancialPenaltyOffenceDecision)
      .filter(offenceDecision => offenceDecision.backDuty > 0)
      .reduce((sumOfBackDuty, offenceDecision) => sumOfBackDuty + offenceDecision.backDuty, 0);
    return calculatedTotal;
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
    return this.allAbsoluteDischarge() && this.caseDecision.financialImposition.costsAndSurcharge.victimSurcharge === 0
      ? 'Absolute Discharge'
      : this.caseDecision.financialImposition.costsAndSurcharge.reasonForNoVictimSurcharge;
  }

  get hasVictimSurcharge(): boolean {
    return this.caseDecision.financialImposition.costsAndSurcharge.victimSurcharge > 0;
  }

  get payment() {
    return this.caseDecision.financialImposition.payment;
  }

  get showCosts(): boolean {
    return this.caseDecision.financialImposition.costsAndSurcharge.costs > 0;
  }

  get showCompensation(): boolean {
    return this.calcTotalCompensation() > 0;
  }

  get reasonForNoCosts(): string {
    return this.caseDecision.financialImposition.costsAndSurcharge.reasonForNoCosts;
  }
}
