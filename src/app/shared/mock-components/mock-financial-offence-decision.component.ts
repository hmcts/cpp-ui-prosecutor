import {Component, Input} from '@angular/core';

@Component({
    selector: 'financial-offence-decision',
    template: `
            financial-offence-decision
        `
})
export class MockFinancialOffenceDecisionComponent {
    @Input() offenceDecision: any;
}
