import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { ApplicationDecision, CaseDecision } from '../../../../contexts/sjp';
import { MOCK_CASE_DECISION } from '../../../../case-overview/__tests__/test-mock-data';
import { CaseDecisionsDetailsComponent } from '../case-decisions-details.component';
import { NoSeparatePenaltyOffenceDecisionComponent } from '../no-separate-penalty-decision.component';

describe('CaseDecisionsDetailsComponent', () => {
  let fixture: ComponentFixture<TestCaseDecisionsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestCaseDecisionsDetailsComponent,
        MockApplicationDecisionComponent,
        CaseDecisionsDetailsComponent,
        NoSeparatePenaltyOffenceDecisionComponent
      ],
      teardown: { destroyAfterEach: false }
    });
    fixture = TestBed.createComponent(TestCaseDecisionsDetailsComponent);
  });

  it('should compile correctly', () => {
    fixture.componentInstance.caseDecisionWithOffenceDecisions = MOCK_CASE_DECISION;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should show set aside', () => {
    const decisions = MOCK_CASE_DECISION;
    decisions.offenceDecisions.forEach(od => (od.decisionType = 'SET_ASIDE'));
    fixture.componentInstance.caseDecisionWithOffenceDecisions = decisions;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
    expect(fixture.debugElement.nativeElement.innerHTML).toContain('Decision set aside');
  });

  it('should show press restriction when requested', () => {
    const decisions = MOCK_CASE_DECISION;
    decisions.offenceDecisions.forEach(
      od =>
        (od.pressRestriction = {
          requested: true,
          name: 'Test name'
        })
    );
    fixture.componentInstance.caseDecisionWithOffenceDecisions = decisions;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
    expect(fixture.debugElement.nativeElement.innerHTML).toContain('Reporting restrictions');
  });

  it('should show press restriction revoked when requested=false', () => {
    const decisions = MOCK_CASE_DECISION;
    decisions.offenceDecisions.forEach(
      od =>
        (od.pressRestriction = {
          requested: false,
          name: null
        })
    );
    fixture.componentInstance.caseDecisionWithOffenceDecisions = decisions;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
    expect(fixture.debugElement.nativeElement.innerHTML).toContain('Direction restricting publicity revoked');
  });

  it('should not show press restriction when undefined', () => {
    const decisions = MOCK_CASE_DECISION;
    decisions.offenceDecisions.forEach(od => (od.pressRestriction = undefined));
    fixture.componentInstance.caseDecisionWithOffenceDecisions = decisions;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
    expect(fixture.debugElement.nativeElement.innerHTML).not.toContain('Reporting restrictions');
  });

  it('should show application', () => {
    const decisions = {
      ...MOCK_CASE_DECISION,
      applicationDecision: {
        granted: false,
        rejectionReason: 'Test reason'
      }
    };
    fixture.componentInstance.caseDecisionWithOffenceDecisions = decisions;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
    expect(fixture.debugElement.nativeElement.innerHTML).toContain('application-decision-details');
  });

  @Component({
    selector: 'case-decisions-test',
    template: `
      <case-decisions-details
        [caseDecisionWithOffenceDecisions]="caseDecisionWithOffenceDecisions"
      ></case-decisions-details>
    `,
    imports: [CaseDecisionsDetailsComponent]
  })
  class TestCaseDecisionsDetailsComponent {
    @Input() caseDecisionWithOffenceDecisions: CaseDecision;
  }

  @Component({
    selector: 'application-decision-details',
    template: `
      application-decision-details
    `,
    imports: [MockApplicationDecisionComponent]
  })
  class MockApplicationDecisionComponent {
    @Input() applicationDecision: ApplicationDecision;
  }
});
