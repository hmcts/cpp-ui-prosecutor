import { Pipe, PipeTransform } from '@angular/core';
import {
  OffenceDecision,
  WithdrawOffenceDecision,
  AdjournOffenceDecision,
  CourtReferralOffenceDecision
} from '../../../contexts/sjp';
import { FormatDatePipe } from '../format-date/format-date.pipe';

@Pipe({
  name: 'savedDecisionInformation'
})
export class SavedDecisionInformationPipe implements PipeTransform {
  private formatDatePipe: FormatDatePipe = new FormatDatePipe();
  transform(offenceDecision: OffenceDecision): string {
    switch (offenceDecision.decisionType) {
      case 'WITHDRAW': {
        const withdrawOffenceDecision = offenceDecision as WithdrawOffenceDecision;
        return `Withdrawn - ${withdrawOffenceDecision.reason}`;
      }
      case 'ADJOURN': {
        const adjournOffenceDecision = offenceDecision as AdjournOffenceDecision;
        const formattedAdjournedToDate = this.formatDatePipe.transform(adjournOffenceDecision.adjournedTo, 'd MMM y');
        return `Adjourned to ${formattedAdjournedToDate} (or after)`;
      }
      case 'REFER_FOR_COURT_HEARING': {
        const courtReferralOffenceDecision = offenceDecision as CourtReferralOffenceDecision;
        return `Referred for court hearing - ${courtReferralOffenceDecision.referralReason}`;
      }
    }
  }
}
