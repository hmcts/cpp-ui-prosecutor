import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { CaseDecision } from '../../../../contexts/sjp';
import { MOCK_CASE_DECISION, MOCK_CASE_DECISION_2 } from '../../../../case-overview/__tests__/test-mock-data';
import { CommonModule } from '@angular/common';
import { PdkDividerModule, PdkGridModule, PdkTabsModule } from '@cpp/pdk';
import { RouterTestingModule } from '@angular/router/testing';
import { CaseDecisionsComponent } from '../case-decisions.component';
import { VerdictTypePipeModule } from '../../../../shared/pipes/verdict-type/verdict-type.module';
import {
  FirstLastNamePipeModule,
  FormatDatePipeModule,
  SavedDecisionInformationPipeModule
} from '../../../../shared/pipes';

describe('CaseDecisionsComponent', () => {
  let fixture: ComponentFixture<CaseDecisionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseDecisionsComponent, TestCaseDecisionsDetailsComponent],
      imports: [
        CommonModule,
        PdkDividerModule,
        PdkGridModule,
        PdkTabsModule,
        FormatDatePipeModule,
        RouterTestingModule,
        FirstLastNamePipeModule,
        SavedDecisionInformationPipeModule,
        VerdictTypePipeModule
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
    `
  })
  class TestCaseDecisionsDetailsComponent {
    @Input() caseDecisionWithOffenceDecisions: CaseDecision;
  }
});
