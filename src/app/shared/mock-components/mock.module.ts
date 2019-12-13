import {NgModule} from '@angular/core';
import {MockFinancialImpositionComponent} from './mock-financial-imposition.component';
import {MockFinancialOffenceDecisionComponent} from './mock-financial-offence-decision.component';
import {MockPaymentAndCollectionComponent} from './mock-payment-and-collection.component';
import {MockReferredToOpenCourtOffenceDecisionComponent} from './mock-referred-to-open-court-decision.component';

@NgModule({
    declarations: [
        MockFinancialImpositionComponent,
        MockFinancialOffenceDecisionComponent,
        MockPaymentAndCollectionComponent,
        MockReferredToOpenCourtOffenceDecisionComponent
    ],
    exports: [
        MockFinancialImpositionComponent,
        MockFinancialOffenceDecisionComponent,
        MockPaymentAndCollectionComponent,
        MockReferredToOpenCourtOffenceDecisionComponent
    ]
})
export class MockModule {}
