import { NgModule } from '@angular/core';
import { MockFinancialImpositionComponent } from './mock-financial-imposition.component';
import { MockFinancialOffenceDecisionComponent } from './mock-financial-offence-decision.component';
import { MockPaymentAndCollectionComponent } from './mock-payment-and-collection.component';
import { MockReferredToOpenCourtOffenceDecisionComponent } from './mock-referred-to-open-court-decision.component';
import { MockNoSeparatePenaltyDecisionComponent } from './mock-no-separate-penalty-decision.component';
import { MockCaseNotesComponent } from './mock-case-notes-component';

const DECLARATIONS = [
  MockFinancialImpositionComponent,
  MockFinancialOffenceDecisionComponent,
  MockPaymentAndCollectionComponent,
  MockReferredToOpenCourtOffenceDecisionComponent,
  MockNoSeparatePenaltyDecisionComponent,
  MockCaseNotesComponent
];

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS
})
export class MockModule {}
