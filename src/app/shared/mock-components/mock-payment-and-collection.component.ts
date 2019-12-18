import {Component, Input} from '@angular/core';

@Component({
    selector: 'payment-and-collection',
    template: `
            payment-and-collection
        `
})
export class MockPaymentAndCollectionComponent {
    @Input() caseDecision: any;
}
