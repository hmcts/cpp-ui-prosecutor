import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NoSeparatePenaltyOffenceDecision } from 'src/app/contexts/sjp';

@Component({
    selector: 'no-separate-penalty-offence-decision',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
      <div *ngIf="offenceDecision.licenseEndorsement">
        Driver licence record endorsed (no points)
      </div>
      <div *ngIf="offenceDecision.guiltyPleaTakenIntoAccount">
        Defendant's guilty plea taken into account when imposing sentence
      </div>
    `
  })
  export class NoSeparatePenaltyOffenceDecisionComponent {
    @Input() offenceDecision: NoSeparatePenaltyOffenceDecision;
  }
