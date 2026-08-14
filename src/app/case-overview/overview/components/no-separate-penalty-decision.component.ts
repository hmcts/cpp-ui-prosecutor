import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NoSeparatePenaltyOffenceDecision } from '../../../contexts/sjp';

@Component({
    selector: 'no-separate-penalty-offence-decision',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    @if (offenceDecision.licenseEndorsement) {
      <div>
        Driver licence record endorsed (no points)
      </div>
    }
    @if (offenceDecision.guiltyPleaTakenIntoAccount) {
      <div>
        Defendant's guilty plea taken into account when imposing sentence
      </div>
    }
    `,
})
export class NoSeparatePenaltyOffenceDecisionComponent {
  @Input() offenceDecision: NoSeparatePenaltyOffenceDecision;
}
