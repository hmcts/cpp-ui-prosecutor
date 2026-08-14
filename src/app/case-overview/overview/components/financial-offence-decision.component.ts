import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DischargeOffenceDecision, FinancialPenaltyOffenceDecision } from '../../../contexts/sjp';
import { formatString, formatCurrency } from '../../../contexts/sjp/util/sjp-util';
import { DisqualificationPeriodPipe } from '../../../shared/pipes/disqualification-period/disqualification-period.pipe';
import { DISQUALIFICATION_DECISION_TEXT } from './disqualification/disqualification.constants';

@Component({
    selector: 'financial-offence-decision',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    @if (offenceDecision.decisionType === 'DISCHARGE') {
      <div data-role="discharge-type">{{ dischargeType }}</div>
    }
    @if (offenceDecision.decisionType === 'FINANCIAL_PENALTY' && fine) {
      <div data-role="fine">Fine {{ fine }}</div>
    }
    @if (offenceDecision.decisionType === 'FINANCIAL_PENALTY' && excisePenalty) {
      <div data-role="excise-penalty">
        Excise penalty {{ excisePenalty }}
      </div>
    }
    @if ((offenceDecision.decisionType === 'FINANCIAL_PENALTY' || 'DISCHARGE') && backDuty) {
      <div
        data-role="back-duty"
        >
        Back duty {{ backDuty }}
      </div>
    }
    <div data-role="compensation">{{ compensation }}</div>
    @if (offenceDecision.licenceEndorsement) {
      <div data-role="licence-endorsement">
        {{ licenceEndorsement }}
      </div>
    }
    @if (offenceDecision.licenceEndorsement && offenceDecision.additionalPointsReason) {
      <div
        data-role="additional-points-reason"
        >
        {{
        'Reason for penalty points being imposed on more than one offence: ' + offenceDecision.additionalPointsReason
        }}
      </div>
    }
    @if (offenceDecision.disqualification) {
      <div data-role="disqualification">
        {{ disqualification }}
      </div>
    }
    @if (offenceDecision.guiltyPleaTakenIntoAccount) {
      <div data-role="guilty-plea-taken-into-account">
        {{ "Defendant's guilty plea Taken into account when imposing sentence" }}
      </div>
    }
    `,
})
export class FinancialOffenceDecisionComponent {
  @Input() offenceDecision: FinancialPenaltyOffenceDecision | DischargeOffenceDecision;
  disqualificationPeriodPipe = new DisqualificationPeriodPipe();

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
      return this.offenceDecision.noCompensationReason
        ? 'No compensation ordered because ' + this.offenceDecision.noCompensationReason
        : null;
    }
  }

  get licenceEndorsement() {
    let endorsement = '';
    if (this.offenceDecision.penaltyPointsImposed > 0) {
      endorsement = 'Driver record endorsed with ' + this.offenceDecision.penaltyPointsImposed + ' points';
    } else {
      endorsement = 'Driver licence record endorsed (no points)';
    }
    return endorsement;
  }

  get disqualification() {
    let disqualification = '';
    if (this.offenceDecision.disqualification) {
      const period = this.disqualificationPeriodPipe.transform(this.offenceDecision.disqualificationPeriod);
      disqualification = DISQUALIFICATION_DECISION_TEXT[this.offenceDecision.disqualificationType];
      if (disqualification) {
        disqualification = disqualification
          .replace('#period', period)
          .replace(
            '#notionalPenaltyPoint',
            this.offenceDecision.notionalPenaltyPoints
              ? `Notional penalty points determined ${this.offenceDecision.notionalPenaltyPoints} penalty points. `
              : ''
          );
      }
    }
    return disqualification;
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
