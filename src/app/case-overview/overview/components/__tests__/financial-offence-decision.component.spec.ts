import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { DischargeOffenceDecision, FinancialPenaltyOffenceDecision } from '../../../../contexts/sjp';
import { CommonModule } from '@angular/common';
import { PdkDividerModule, PdkGridModule } from '@cpp/pdk';

import { FinancialOffenceDecisionComponent } from '../financial-offence-decision.component';

describe('FinancialOffenceDecisionComponent', () => {
  let fixture: ComponentFixture<TestFinancialOffenceDecisionComponent>;
  const financialOffence = {
    id: 'mock-case-offence-decision-9',
    offenceId: 'offenceId9',
    decisionType: 'DISCHARGE',
    verdict: 'PROVED_SJP',
    offenceSequenceNumber: 9,
    offenceTitle: 'Title'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialOffenceDecisionComponent, TestFinancialOffenceDecisionComponent],
      imports: [CommonModule, PdkDividerModule, PdkGridModule]
    });
    fixture = TestBed.createComponent(TestFinancialOffenceDecisionComponent);
  });

  it('should compile correctly with discharge offence decision with absolute discharge', () => {
    fixture.componentInstance.offenceDecision = {
      ...financialOffence,
      compensation: 0,
      dischargeType: 'ABSOLUTE',
      guiltyPleaTakenIntoAccount: true,
      noCompensationReason: 'some reason'
    } as DischargeOffenceDecision;

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with discharge offence decision with conditional discharge', () => {
    fixture.componentInstance.offenceDecision = {
      ...financialOffence,
      compensation: 0,
      dischargeType: 'CONDITIONAL',
      guiltyPleaTakenIntoAccount: true,
      noCompensationReason: 'some reason',
      dischargedFor: {
        value: 10,
        unit: 'WEEK'
      }
    } as DischargeOffenceDecision;

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with financial penalty offence decision', () => {
    fixture.componentInstance.offenceDecision = {
      ...financialOffence,
      decisionType: 'FINANCIAL_PENALTY',
      fine: 10.23,
      compensation: 20.01,
      guiltyPleaTakenIntoAccount: false
    } as FinancialPenaltyOffenceDecision;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
  it('should compile correctly with financial penalty offence decision with no fine', () => {
    fixture.componentInstance.offenceDecision = {
      ...financialOffence,
      decisionType: 'FINANCIAL_PENALTY',
      fine: 0,
      compensation: 20.01,
      guiltyPleaTakenIntoAccount: false
    } as FinancialPenaltyOffenceDecision;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'financial-offence-decision-test',
    template: `
      <financial-offence-decision [offenceDecision]="offenceDecision"></financial-offence-decision>
    `
  })
  class TestFinancialOffenceDecisionComponent {
    @Input() offenceDecision: any;
  }
});
