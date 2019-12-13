import {Component, Input} from '@angular/core';

@Component({
    selector: 'refer-to-open-court-offence-decision',
    template: `
        refer-to-open-court-offence-decision
        `
})
export class MockReferredToOpenCourtOffenceDecisionComponent {
    @Input() offenceDecision: any;
}
