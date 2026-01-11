import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import {
  DischargeOffenceDecision,
  DisqualificationPeriod,
  FinancialPenaltyOffenceDecision
} from '../../../../contexts/sjp';

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
      imports: [TestFinancialOffenceDecisionComponent, FinancialOffenceDecisionComponent],
      teardown: { destroyAfterEach: false }
    });
    fixture = TestBed.createComponent(TestFinancialOffenceDecisionComponent);
    // Initialize with a default value before first detectChanges
    fixture.componentInstance.offenceDecision = financialOffence as FinancialPenaltyOffenceDecision;
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

  it('should not display reason if no reason is given', () => {
    fixture.componentInstance.offenceDecision = {
      ...financialOffence,
      decisionType: 'FINANCIAL_PENALTY',
      backDuty: 0,
      fine: 10,
      compensation: 0,
      noCompensationReason: undefined,
      excisePenalty: 0,
      guiltyPleaTakenIntoAccount: false
    } as FinancialPenaltyOffenceDecision;
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.innerHTML).not.toContain('No compensation ordered');
    expect(fixture).toMatchSnapshot();
  });

  describe('should compile correctly with endorsement', () => {
    describe('with financial penalty', () => {
      it('with no points', () => {
        fixture.componentInstance.offenceDecision = {
          ...financialOffence,
          decisionType: 'FINANCIAL_PENALTY',
          fine: 10,
          compensation: 20,
          licenceEndorsement: true,
          penaltyPointsImposed: 0,
          guiltyPleaTakenIntoAccount: false
        } as FinancialPenaltyOffenceDecision;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.innerHTML).toContain('Driver licence record endorsed (no points)');
        expect(fixture).toMatchSnapshot();
      });

      it('with points', () => {
        fixture.componentInstance.offenceDecision = {
          ...financialOffence,
          decisionType: 'FINANCIAL_PENALTY',
          fine: 10,
          compensation: 20,
          licenceEndorsement: true,
          penaltyPointsImposed: 3,
          guiltyPleaTakenIntoAccount: false
        } as FinancialPenaltyOffenceDecision;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.innerHTML).toContain('Driver record endorsed with 3 points');
        expect(fixture).toMatchSnapshot();
      });

      it('with points with additional reason', () => {
        fixture.componentInstance.offenceDecision = {
          ...financialOffence,
          decisionType: 'FINANCIAL_PENALTY',
          fine: 10,
          compensation: 20,
          licenceEndorsement: true,
          penaltyPointsImposed: 3,
          additionalPointsReason: 'Bald tyres',
          guiltyPleaTakenIntoAccount: false
        } as FinancialPenaltyOffenceDecision;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.innerHTML).toContain('Driver record endorsed with 3 points');
        expect(fixture.debugElement.nativeElement.innerHTML).toContain(
          'Reason for penalty points being imposed on more than one offence: Bald tyres'
        );
        expect(fixture).toMatchSnapshot();
      });
    });
    describe('with discharge', () => {
      it('with no points', () => {
        fixture.componentInstance.offenceDecision = {
          ...financialOffence,
          compensation: 0,
          dischargeType: 'ABSOLUTE',
          guiltyPleaTakenIntoAccount: true,
          noCompensationReason: 'some reason',
          licenceEndorsement: true,
          penaltyPointsImposed: 0
        } as DischargeOffenceDecision;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.innerHTML).toContain('Driver licence record endorsed (no points)');
        expect(fixture).toMatchSnapshot();
      });

      it('with points', () => {
        fixture.componentInstance.offenceDecision = {
          ...financialOffence,
          compensation: 0,
          dischargeType: 'ABSOLUTE',
          guiltyPleaTakenIntoAccount: true,
          noCompensationReason: 'some reason',
          licenceEndorsement: true,
          penaltyPointsImposed: 3
        } as DischargeOffenceDecision;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.innerHTML).toContain('Driver record endorsed with 3 points');
        expect(fixture).toMatchSnapshot();
      });

      it('with points with additional reason', () => {
        fixture.componentInstance.offenceDecision = {
          ...financialOffence,
          compensation: 0,
          dischargeType: 'ABSOLUTE',
          guiltyPleaTakenIntoAccount: true,
          noCompensationReason: 'some reason',
          licenceEndorsement: true,
          penaltyPointsImposed: 3,
          additionalPointsReason: 'Bald tyres'
        } as DischargeOffenceDecision;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.innerHTML).toContain('Driver record endorsed with 3 points');
        expect(fixture.debugElement.nativeElement.innerHTML).toContain(
          'Reason for penalty points being imposed on more than one offence: Bald tyres'
        );
        expect(fixture).toMatchSnapshot();
      });
    });
  });

  describe('should compile correctly with disqualification', () => {
    describe('with financial penalty', () => {
      it('for discretionary', () => {
        fixture.componentInstance.offenceDecision = {
          ...financialOffence,
          decisionType: 'FINANCIAL_PENALTY',
          fine: 10,
          compensation: 20,
          disqualification: true,
          disqualificationType: 'DISCRETIONARY',
          disqualificationPeriod: {
            value: 1,
            unit: 'DAY'
          } as DisqualificationPeriod
        } as FinancialPenaltyOffenceDecision;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.innerHTML).toContain(
          'Disqualified from holding or obtaining a driving licence for 1 day. ' +
            'Discretionary disqualification. Driving record endorsed. Section 34(2) Road Traffic Offenders Act 1988.'
        );
        expect(fixture).toMatchSnapshot();
      });

      it('points disqualification, with notional penalty points', () => {
        fixture.componentInstance.offenceDecision = {
          ...financialOffence,
          decisionType: 'FINANCIAL_PENALTY',
          fine: 10,
          compensation: 20,
          disqualification: true,
          disqualificationType: 'POINTS',
          disqualificationPeriod: {
            value: 1,
            unit: 'MONTH'
          } as DisqualificationPeriod,
          notionalPenaltyPoints: 3
        } as FinancialPenaltyOffenceDecision;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.innerHTML).toContain(
          'Disqualified from holding or obtaining a driving licence for 1 month. ' +
            'Disqualification obligatory due to repeat offending. Driving record endorsed. ' +
            'Notional penalty points determined 3 penalty points. Section 35(1) Road Traffic Offenders Act 1988.'
        );
        expect(fixture).toMatchSnapshot();
      });

      it('points disqualification, without notional penalty points', () => {
        fixture.componentInstance.offenceDecision = {
          ...financialOffence,
          decisionType: 'FINANCIAL_PENALTY',
          fine: 10,
          compensation: 20,
          disqualification: true,
          disqualificationType: 'POINTS',
          disqualificationPeriod: {
            value: 1,
            unit: 'MONTH'
          } as DisqualificationPeriod
        } as FinancialPenaltyOffenceDecision;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.innerHTML).toContain(
          'Disqualified from holding or obtaining a driving licence for 1 month. ' +
            'Disqualification obligatory due to repeat offending. Driving record endorsed. ' +
            'Section 35(1) Road Traffic Offenders Act 1988.'
        );
        expect(fixture).toMatchSnapshot();
      });

      it('for obligatory', () => {
        fixture.componentInstance.offenceDecision = {
          ...financialOffence,
          decisionType: 'FINANCIAL_PENALTY',
          fine: 10,
          compensation: 20,
          disqualification: true,
          disqualificationType: 'OBLIGATORY',
          disqualificationPeriod: {
            value: 1,
            unit: 'YEAR'
          } as DisqualificationPeriod
        } as FinancialPenaltyOffenceDecision;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.innerHTML).toContain(
          'Disqualified from holding or obtaining a driving licence for 1 year. ' +
            'Disqualification obligatory for the offence. Driving record endorsed. Section 34(1) Road Traffic Offenders Act 1988.'
        );
        expect(fixture).toMatchSnapshot();
      });
    });
    describe('with discharge', () => {
      it('for discretionary', () => {
        fixture.componentInstance.offenceDecision = {
          ...financialOffence,
          decisionType: 'DISCHARGE',
          compensation: 0,
          dischargeType: 'ABSOLUTE',
          disqualification: true,
          disqualificationType: 'DISCRETIONARY',
          disqualificationPeriod: {
            value: 3,
            unit: 'DAY'
          } as DisqualificationPeriod
        } as DischargeOffenceDecision;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.innerHTML).toContain(
          'Disqualified from holding or obtaining a driving licence for 3 days. ' +
            'Discretionary disqualification. Driving record endorsed. Section 34(2) Road Traffic Offenders Act 1988.'
        );
        expect(fixture).toMatchSnapshot();
      });

      it('points disqualification, with notional penalty points', () => {
        fixture.componentInstance.offenceDecision = {
          ...financialOffence,
          decisionType: 'DISCHARGE',
          compensation: 0,
          dischargeType: 'ABSOLUTE',
          disqualification: true,
          disqualificationType: 'POINTS',
          disqualificationPeriod: {
            value: 3,
            unit: 'MONTH'
          } as DisqualificationPeriod,
          notionalPenaltyPoints: 3
        } as DischargeOffenceDecision;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.innerHTML).toContain(
          'Disqualified from holding or obtaining a driving licence for 3 months. ' +
            'Disqualification obligatory due to repeat offending. Driving record endorsed. ' +
            'Notional penalty points determined 3 penalty points. Section 35(1) Road Traffic Offenders Act 1988.'
        );
        expect(fixture).toMatchSnapshot();
      });

      it('points disqualification, without notional penalty points', () => {
        fixture.componentInstance.offenceDecision = {
          ...financialOffence,
          decisionType: 'DISCHARGE',
          compensation: 0,
          dischargeType: 'ABSOLUTE',
          disqualification: true,
          disqualificationType: 'POINTS',
          disqualificationPeriod: {
            value: 3,
            unit: 'MONTH'
          } as DisqualificationPeriod
        } as DischargeOffenceDecision;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.innerHTML).toContain(
          'Disqualified from holding or obtaining a driving licence for 3 months. ' +
            'Disqualification obligatory due to repeat offending. Driving record endorsed. ' +
            'Section 35(1) Road Traffic Offenders Act 1988.'
        );
        expect(fixture).toMatchSnapshot();
      });

      it('for obligatory', () => {
        fixture.componentInstance.offenceDecision = {
          ...financialOffence,
          decisionType: 'DISCHARGE',
          compensation: 0,
          dischargeType: 'ABSOLUTE',
          disqualification: true,
          disqualificationType: 'OBLIGATORY',
          disqualificationPeriod: {
            value: 3,
            unit: 'YEAR'
          } as DisqualificationPeriod
        } as DischargeOffenceDecision;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.innerHTML).toContain(
          'Disqualified from holding or obtaining a driving licence for 3 years. ' +
            'Disqualification obligatory for the offence. Driving record endorsed. Section 34(1) Road Traffic Offenders Act 1988.'
        );
        expect(fixture).toMatchSnapshot();
      });
    });
  });

  @Component({
    selector: 'financial-offence-decision-test',
    template: `
      <financial-offence-decision [offenceDecision]="offenceDecision"></financial-offence-decision>
    `,
    imports: [FinancialOffenceDecisionComponent]
  })
  class TestFinancialOffenceDecisionComponent {
    @Input() offenceDecision: any;
  }
});
