import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { CaseDecision } from '../../../../contexts/sjp';
import { MOCK_CASE_DECISION } from '../../../__tests__/test-mock-data';
import { CommonModule } from '@angular/common';
import { PdkDividerModule, PdkGridModule, PdkTabsModule } from '@cpp/pdk';
import { FormatDatePipeModule, SavedDecisionInformationPipeModule } from '../../../../shared/pipes';
import { RouterTestingModule } from '@angular/router/testing';
import { CaseDecisionsComponent } from '../case-decisions.component';
import { FirstLastNamePipeModule } from '../../../../shared/pipes/first-last-name/first-last-name.module';

describe('CaseDecisionComponent', () => {
  let fixture: ComponentFixture<TestCaseDecisionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseDecisionsComponent, TestCaseDecisionsComponent],
      imports: [
        CommonModule,
        PdkDividerModule,
        PdkGridModule,
        PdkTabsModule,
        FormatDatePipeModule,
        RouterTestingModule,
        FirstLastNamePipeModule,
        SavedDecisionInformationPipeModule
      ]
    });
    fixture = TestBed.createComponent(TestCaseDecisionsComponent);
  });

  it('should compile correctly', () => {
    fixture.componentInstance.caseDecision = MOCK_CASE_DECISION;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'case-decisions-test',
    template: `
      <case-decisions [caseDecision]="caseDecision"></case-decisions>
    `
  })
  class TestCaseDecisionsComponent {
    @Input() caseDecision: CaseDecision;
  }
});
