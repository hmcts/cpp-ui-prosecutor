import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DischargeOffenceDecision, FinancialPenaltyOffenceDecision } from '../../../contexts/sjp';
import { formatString, formatCurrency } from '../../../contexts/sjp/util/sjp-util';

@Component({
  selector: 'financial-offence-decision',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="offenceDecision.decisionType === 'DISCHARGE'">{{ dischargeType }}</div>
    <div *ngIf="offenceDecision.decisionType == 'FINANCIAL_PENALTY' && fine">Fine {{ fine }}</div>
    <div *ngIf="offenceDecision.decisionType == 'FINANCIAL_PENALTY' && excisePenalty">Excise penalty {{ excisePenalty }}</div>
    <div *ngIf="(offenceDecision.decisionType == 'FINANCIAL_PENALTY' || 'DISCHARGE') && backDuty">Back duty {{ backDuty }}</div>
    <div>{{ compensation }}</div>
    <div *ngIf="offenceDecision.guiltyPleaTakenIntoAccount">
      {{ "Defendant's guilty plea Taken into account when imposing sentence" }}
    </div>
  `
})
export class FinancialOffenceDecisionComponent {
  @Input() offenceDecision: FinancialPenaltyOffenceDecision | DischargeOffenceDecision;

  get dischargeType(): string {
    if (this.asDischarge().dischargeType === 'ABSOLUTE') {
      return 'Discharged Absolutely';
    } else {
      return formatString(
        'Discharged conditionally for {0} {1}',
        this.asDischarge()
          .dischargedFor.value.toString()
          .toLowerCase(),
        this.asDischarge().dischargedFor.unit.toLowerCase()
      );
    }
  }

  get compensation() {
    if (this.offenceDecision.compensation > 0) {
      return 'To pay compensation of ' + formatCurrency(this.offenceDecision.compensation);
    } else {
      return this.offenceDecision.noCompensationReason ?
        'No compensation ordered because ' + this.offenceDecision.noCompensationReason : null;
    }
  }

  get fine() {
    if (this.asFinancialPenalty().fine > 0) {
      return formatCurrency(this.asFinancialPenalty().fine);
    }
    return null;
  }

  get excisePenalty() {
    if (this.asFinancialPenalty().excisePenalty > 0) {
      return formatCurrency(this.asFinancialPenalty().excisePenalty);
    }
    return null;
  }

  get backDuty() {
    if (this.asFinancialPenalty().backDuty > 0) {
      return formatCurrency(this.asFinancialPenalty().backDuty);
    }
    return null;
  }

  get noCompensationReason() {
    if (this.asFinancialPenalty().noCompensationReason) {
      return this.asFinancialPenalty().noCompensationReason;
    }
    return null;
  }

  asDischarge() {
    return this.offenceDecision as DischargeOffenceDecision;
  }

  asFinancialPenalty() {
    return this.offenceDecision as FinancialPenaltyOffenceDecision;
  }
}
