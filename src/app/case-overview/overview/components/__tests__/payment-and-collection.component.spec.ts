import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { CaseDecision } from '../../../../contexts/sjp';
import { MOCK_CASE_DECISION_WITH_FINANCIAL_IMPOSITION } from '../../../../case-overview/__tests__/test-mock-data';
import { PaymentAndCollectionComponent } from '../payment-and-collection.component';

describe('PaymentAndCollectionComponent', () => {
  let fixture: ComponentFixture<TestPaymentAndCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestPaymentAndCollectionComponent, PaymentAndCollectionComponent],
      teardown: { destroyAfterEach: false }
    });
    fixture = TestBed.createComponent(TestPaymentAndCollectionComponent);
    fixture.componentInstance.caseDecision = { ...MOCK_CASE_DECISION_WITH_FINANCIAL_IMPOSITION };
  });

  it('should compile correctly with pay to court with lump sum and within days > 0', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with attach to earnings with lump sum and within days > 0', () => {
    fixture.componentInstance.caseDecision.financialImposition.payment.paymentType = 'ATTACH_TO_EARNINGS';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly for payment terms with deduct from benefits with lump sum and within days > 0', () => {
    fixture.componentInstance.caseDecision.financialImposition.payment.paymentType = 'DEDUCT_FROM_BENEFITS';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly for payment terms with lump sum and within days = 0 and amount > 0', () => {
    fixture.componentInstance.caseDecision.financialImposition.payment.paymentTerms.lumpSum.withinDays = 0;
    fixture.componentInstance.caseDecision.financialImposition.payment.paymentTerms.lumpSum.amount = 100.23;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly for payment terms with lump sum and within days = 0 and amount = 0 and not collection ordered', () => {
    fixture.componentInstance.caseDecision.financialImposition.payment.paymentTerms.lumpSum.withinDays = 0;
    fixture.componentInstance.caseDecision.financialImposition.payment.paymentTerms.lumpSum.amount = 0;
    fixture.componentInstance.caseDecision.financialImposition.costsAndSurcharge.collectionOrderMade = false;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'payment-and-collection-test',
    template: `
      <payment-and-collection [caseDecision]="caseDecision"></payment-and-collection>
    `,
    imports: [PaymentAndCollectionComponent]
  })
  class TestPaymentAndCollectionComponent {
    @Input() caseDecision: CaseDecision;
  }
});
