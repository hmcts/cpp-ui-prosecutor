import { Component, Input } from '@angular/core';

@Component({
  selector: 'no-separate-penalty-offence-decision',
  template: `
  no-separate-penalty-offence-decision
  `
})
export class MockNoSeparatePenaltyDecisionComponent {
  @Input() offenceDecision: any;
}
