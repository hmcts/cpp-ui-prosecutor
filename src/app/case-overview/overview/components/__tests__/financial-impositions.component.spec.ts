import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component, Input} from '@angular/core';
import {CaseDecision, DischargeOffenceDecision} from '../../../../contexts/sjp';
import {CommonModule} from '@angular/common';
import {PdkDividerModule, PdkGridModule} from '@cpp/pdk';
import {FinancialImpositionsComponent} from '../financial-impositions.component';
import {MOCK_CASE_DECISION_WITH_FINANCIAL_IMPOSITION} from '../../../../case-overview/__tests__/test-mock-data';

describe('FinancialImpositionsComponent', () => {
  let fixture: ComponentFixture<TestFinancialImpositionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialImpositionsComponent, TestFinancialImpositionsComponent],
      imports: [CommonModule, PdkDividerModule, PdkGridModule]
    });
    fixture = TestBed.createComponent(TestFinancialImpositionsComponent);
    fixture.componentInstance.caseDecision = {...MOCK_CASE_DECISION_WITH_FINANCIAL_IMPOSITION};
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

  @Component({
    selector: 'financial-impositions-test',
    template: `
      <financial-impositions [caseDecision]='caseDecision'></financial-impositions>
    `
  })
  class TestFinancialImpositionsComponent {
    @Input() caseDecision: CaseDecision;
  }
});
