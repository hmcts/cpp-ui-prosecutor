import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { CaseDecision, DischargeOffenceDecision, FinancialPenaltyOffenceDecision } from '../../../../contexts/sjp';
import { FinancialImpositionsComponent } from '../financial-impositions.component';
import { MOCK_CASE_DECISION_WITH_FINANCIAL_IMPOSITION } from '../../../../case-overview/__tests__/test-mock-data';
import { By } from '@angular/platform-browser';

describe('FinancialImpositionsComponent', () => {
  let fixture: ComponentFixture<TestFinancialImpositionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestFinancialImpositionsComponent, FinancialImpositionsComponent],
      teardown: { destroyAfterEach: false }
    });
    fixture = TestBed.createComponent(TestFinancialImpositionsComponent);
    fixture.componentInstance.caseDecision = { ...MOCK_CASE_DECISION_WITH_FINANCIAL_IMPOSITION };
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with all absolute discharge with no victimSurcharge', () => {
    fixture.componentInstance.caseDecision = {
      ...MOCK_CASE_DECISION_WITH_FINANCIAL_IMPOSITION,
      offenceDecisions: [
        {
          decisionType: 'DISCHARGE',
          dischargeType: 'ABSOLUTE',
          compensation: 0
        } as DischargeOffenceDecision
      ]
    };

    fixture.componentInstance.caseDecision.financialImposition.costsAndSurcharge.victimSurcharge = 0;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with NOT all absolute discharge with no victimSurcharge', () => {
    fixture.componentInstance.caseDecision = {
      ...MOCK_CASE_DECISION_WITH_FINANCIAL_IMPOSITION,
      offenceDecisions: [
        {
          decisionType: 'DISCHARGE',
          dischargeType: 'CONDITIONAL',
          compensation: 20.3
        } as DischargeOffenceDecision
      ]
    };
    fixture.componentInstance.caseDecision.financialImposition.costsAndSurcharge.victimSurcharge = 0;
    fixture.componentInstance.caseDecision.financialImposition.costsAndSurcharge.reasonForNoVictimSurcharge =
      'reasonForNoVictimSurcharge';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display excisePenalty and not display calculated fine, if case decision is FINANCIAL_PENALTY and excisePenalty > 0', () => {
    fixture.componentInstance.caseDecision = {
      ...MOCK_CASE_DECISION_WITH_FINANCIAL_IMPOSITION,
      offenceDecisions: [
        {
          decisionType: 'FINANCIAL_PENALTY',
          excisePenalty: 20.0,
          fine: 0
        } as FinancialPenaltyOffenceDecision,
        {
          decisionType: 'FINANCIAL_PENALTY',
          excisePenalty: 30.0,
          fine: 0
        } as FinancialPenaltyOffenceDecision
      ]
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();

    const fineField = fixture.debugElement.query(By.css(`[data-role="imposition-fine-amount"]`));
    expect(fineField).toBe(null);

    const excisePenaltyField = fixture.debugElement.query(By.css(`[data-role="imposition-excise-penalty-amount"]`))
      .nativeElement.innerHTML;
    expect(excisePenaltyField).toBe(' £50 ');
  });

  it('should display backDuty and calculated fine, if case decision is FINANCIAL_PENALTY and backDuty > 0', () => {
    fixture.componentInstance.caseDecision = {
      ...MOCK_CASE_DECISION_WITH_FINANCIAL_IMPOSITION,
      offenceDecisions: [
        {
          decisionType: 'FINANCIAL_PENALTY',
          backDuty: 20.0,
          fine: 30.0
        } as FinancialPenaltyOffenceDecision,
        {
          decisionType: 'FINANCIAL_PENALTY',
          backDuty: 30.0,
          fine: 40.0
        } as FinancialPenaltyOffenceDecision
      ]
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();

    const fineField = fixture.debugElement.query(By.css(`[data-role="imposition-fine-amount"]`)).nativeElement
      .innerHTML;
    expect(fineField).toBe(' £70 ');

    const backdutyField = fixture.debugElement.query(By.css(`[data-role="imposition-backduty-amount"]`)).nativeElement
      .innerHTML;
    expect(backdutyField).toBe(' £50 ');
  });

  it('should display backDuty, if case decision is FINANCIAL_PENALTY or DISCHARGE and backDuty > 0', () => {
    fixture.componentInstance.caseDecision = {
      ...MOCK_CASE_DECISION_WITH_FINANCIAL_IMPOSITION,
      offenceDecisions: [
        {
          decisionType: 'FINANCIAL_PENALTY',
          backDuty: 20.0
        } as DischargeOffenceDecision,
        {
          decisionType: 'DISCHARGE',
          backDuty: 30.0
        } as DischargeOffenceDecision
      ]
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();

    const fineField = fixture.debugElement.query(By.css(`[data-role="imposition-fine-amount"]`));
    expect(fineField).toBe(null);

    const backdutyField = fixture.debugElement.query(By.css(`[data-role="imposition-backduty-amount"]`)).nativeElement
      .innerHTML;
    expect(backdutyField).toBe(' £50 ');
  });

  @Component({
    selector: 'financial-impositions-test',
    template: `
      <financial-impositions [caseDecision]="caseDecision"></financial-impositions>
    `,
    imports: [FinancialImpositionsComponent]
  })
  class TestFinancialImpositionsComponent {
    @Input() caseDecision: CaseDecision;
  }
});
