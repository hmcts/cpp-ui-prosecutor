import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import {
  PdkAlertModule,
  PdkBreadcrumbsModule,
  PdkCoreModule,
  PdkDividerModule,
  PdkGridModule,
  PdkPageHeaderModule,
  PdkRelatedModule,
  PdkTabsModule,
  PdkWarningTextModule
} from '@cpp/pdk';
import { MOCK_CASE, MOCK_CASE_DECISION, MOCK_OFFENCES } from '../../../__tests__/test-mock-data';
import {
  AgePipeModule,
  DefendantNamePipeModule,
  FormatAddressPipeModule,
  FormatDatePipeModule,
  SavedDecisionInformationPipeModule
} from '../../../../shared/pipes';
import { Case, CaseDecision, CaseDocument, Defendant, Offence } from '../../../../contexts/sjp';
import { OverviewComponent } from '../overview.component';
import { CaseWarningsComponent } from '../case-warnings.component';
import { PersonalDetailsChangeAlertComponent } from '../personal-details-change-alert.component';
import { VerdictTypePipeModule } from '../../../../shared/pipes/verdict-type/verdict-type.module';

describe('OverviewComponent', () => {
  let fixture: ComponentFixture<TestCaseOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        OverviewComponent,
        TestCaseOverviewComponent,
        MockOffenceComponent,
        CaseWarningsComponent,
        MockPleaMitigationComponent,
        MockStatementOfFactsComponent,
        MockCaseHeaderBadgeContainer,
        MockSubComponent,
        PersonalDetailsChangeAlertComponent,
        MockSubmissionMessagesComponent,
        MockCaseDecisionComponent
      ],
      imports: [
        PdkCoreModule,
        PdkPageHeaderModule,
        PdkTabsModule,
        PdkWarningTextModule,
        PdkGridModule,
        PdkDividerModule,
        PdkAlertModule,
        AgePipeModule,
        DefendantNamePipeModule,
        FormatDatePipeModule,
        FormatAddressPipeModule,
        PdkBreadcrumbsModule,
        PdkRelatedModule,
        SavedDecisionInformationPipeModule,
        VerdictTypePipeModule
      ]
    });

    Date.now = jest.fn(() => Date.parse('2017-02-14'));

    fixture = TestBed.createComponent(TestCaseOverviewComponent);
    fixture.componentInstance.kase = { ...MOCK_CASE, completed: false };
    fixture.componentInstance.defendant = MOCK_CASE.defendant;
    fixture.componentInstance.offences = MOCK_OFFENCES;
    fixture.componentInstance.caseDecisions = [MOCK_CASE_DECISION];
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly completed case', () => {
    fixture.componentInstance.kase = { ...MOCK_CASE, completed: true };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly assigned case', () => {
    fixture.componentInstance.kase = { ...MOCK_CASE, assigned: true };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with single offence', () => {
    fixture.componentInstance.offences = [MOCK_OFFENCES[0]];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with plea mitigation', () => {
    fixture.componentInstance.offences = [
      {
        ...MOCK_OFFENCES[0],
        pleaMitigation: 'Plea mitigation'
      }
    ];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with case warnings', () => {
    fixture.componentInstance.defendant.personalDetails.dateOfBirth = '2000-02-14';
    fixture.componentInstance.offences = [
      {
        ...MOCK_OFFENCES[0],
        chargeDate: '2017-01-14',
        outOfTime: true,
        notInEffect: true
      }
    ];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with personal detail change alert', () => {
    fixture.componentInstance.defendant.personalDetails.dobChanged = true;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const alertMessage = compiled.querySelector('personal-details-change-alert');
    expect(alertMessage.textContent).toContain('The following defendant details have been updated:');
    expect(fixture).toMatchSnapshot();
  });

  it('should display Decisions tab with Case Decisions', () => {
    fixture.componentInstance.caseDecisions = [
      {
        ...MOCK_CASE_DECISION
      }
    ];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display empty Decisions tab without Case Decisions', () => {
    fixture.componentInstance.caseDecisions = [];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'case-overview-test',
    template: `
      <case-overview
        [kase]="kase"
        [defendant]="defendant"
        [offences]="offences"
        [caseDecisions]="caseDecisions"
      ></case-overview>
    `
  })
  class TestCaseOverviewComponent {
    kase: Case;
    defendant: Defendant;
    offences: Offence[];
    caseDecisions: CaseDecision[];
  }

  @Component({
    selector: 'plea-mitigation',
    template: `
      <div>{{ pleaMitigation }}</div>
    `
  })
  class MockPleaMitigationComponent {
    @Input() pleaMitigation: string;
  }

  @Component({
    selector: 'statement-of-facts',
    template: `
      <div>{{ statementOfFacts }}</div>
    `
  })
  class MockStatementOfFactsComponent {
    @Input() statementOfFacts: string;
  }

  @Component({
    selector: 'defendant-offence',
    template: `
      <div>{{ index }}</div>
      <div>{{ offence | json }}</div>
      <div>{{ kase | json }}</div>
    `
  })
  class MockOffenceComponent {
    @Input() index: number;
    @Input() offence: Offence;
    @Input() kase: Case;
  }

  @Component({
    selector: 'case-header-badge-container',
    template: `
      <pre>case badge</pre>
    `
  })
  class MockCaseHeaderBadgeContainer {}

  @Component({
    selector: 'case-details, defendant-details, document-list',
    template: `
      <div>{{ documents | json }}</div>
      <div>{{ defendantDetails | json }}</div>
      <div>{{ kase | json }}</div>
      <div>{{ caseId }}</div>
    `
  })
  class MockSubComponent {
    @Input() documents: CaseDocument[];
    @Input() defendantDetails: Defendant;
    @Input() kase: Case;
    @Input() caseId: string;
  }

  @Component({
    selector: 'case-submission-messages',
    template: `
      <span>{{ kase | json }}</span>
      <span>{{ displayOffencesWithdrawnBanner }}</span>
      <span>{{ displayDatesToAvoidUpdateFailedBanner }}</span>
    `
  })
  class MockSubmissionMessagesComponent {
    @Input() kase: Case;
    @Input() displayOffencesWithdrawnBanner: boolean;
    @Input() displayDatesToAvoidUpdateFailedBanner: boolean;
  }

  @Component({
    selector: 'case-decisions',
    template: `
      <div>caseDecisionsWithOffenceDecisions: {{ caseDecisionsWithOffenceDecisions | json }}</div>
    `
  })
  class MockCaseDecisionComponent {
    @Input() caseDecisionsWithOffenceDecisions: CaseDecision[];
  }
});
