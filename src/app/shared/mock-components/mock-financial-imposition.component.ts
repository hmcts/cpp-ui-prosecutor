import {Component, Input} from '@angular/core';

@Component({
    selector: 'financial-impositions',
    template: `
            financial-impositions
        `
})
export class MockFinancialImpositionComponent {
    @Input() caseDecision: any;
}
