import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { CaseDecision } from '../../../../contexts/sjp';
import { MOCK_CASE_DECISION, MOCK_CASE_DECISION_2 } from '../../../../case-overview/__tests__/test-mock-data';
import { CaseDecisionsComponent } from '../case-decisions.component';

describe('CaseDecisionsComponent', () => {
  let fixture: ComponentFixture<CaseDecisionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
        TestCaseDecisionsDetailsComponent,
        CaseDecisionsComponent
    ],
    teardown: { destroyAfterEach: false }
});
    fixture = TestBed.createComponent(CaseDecisionsComponent);
  });

  it('should compile correctly', () => {
    fixture.componentInstance.caseDecisionsWithOffenceDecisions = [MOCK_CASE_DECISION, MOCK_CASE_DECISION_2];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'case-decisions-details',
    template: `
      <div>caseDecisionWithOffenceDecisions: {{ caseDecisionWithOffenceDecisions | json }}</div>
    `,
    imports: []
})
  class TestCaseDecisionsDetailsComponent {
    @Input() caseDecisionWithOffenceDecisions: CaseDecision;
  }
});
