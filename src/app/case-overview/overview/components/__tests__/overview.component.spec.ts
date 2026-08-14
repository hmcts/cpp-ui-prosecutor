import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { MOCK_CASE, MOCK_CASE_DECISION, MOCK_OFFENCES, MOCK_CASE_NOTES } from '../../../__tests__/test-mock-data';
import {
  Case,
  CaseDecision,
  CaseDocument,
  Defendant,
  Offence,
  CaseNotes,
  LegalEntityDetails,
  PersonalDetails
} from '../../../../contexts/sjp';
import { OverviewComponent } from '../overview.component';
import { CaseWarningsComponent } from '../case-warnings.component';
import { DefendantDetailsChangeNotificationBannerComponent } from '../defendant-details-change-notification-banner.component';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { provideCppCoreHttpServices } from '@cpp/core';
import { State } from '../../../../reducers';

describe('OverviewComponent', () => {
  let fixture: ComponentFixture<TestCaseOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestCaseOverviewComponent,
        MockOffenceComponent,
        MockPleaMitigationComponent,
        MockStatementOfFactsComponent,
        MockCaseHeaderBadgeContainer,
        MockSubComponent,
        MockSubmissionMessagesComponent,
        MockCaseDecisionComponent,
        MockDateOfBirthComponent,
        OverviewComponent,
        CaseWarningsComponent,
        DefendantDetailsChangeNotificationBannerComponent
      ],
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState: {
            case: MOCK_CASE
          } as State
        }),
        provideCppCoreHttpServices()
      ],
      teardown: { destroyAfterEach: false }
    });

    Date.now = jest.fn(() => Date.parse('2017-02-14'));

    fixture = TestBed.createComponent(TestCaseOverviewComponent);
    fixture.componentInstance.kase = { ...MOCK_CASE, completed: false };
    fixture.componentInstance.defendant = MOCK_CASE.defendant;
    fixture.componentInstance.offences = MOCK_OFFENCES;
    fixture.componentInstance.caseDecisions = [MOCK_CASE_DECISION];
    fixture.componentInstance.caseNotes = MOCK_CASE_NOTES;
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

  it('should compile correctly with personal detail change notification banner', () => {
    fixture.componentInstance.defendant.personalDetails.dobChanged = true;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const alertMessage = compiled.querySelector('defendant-details-change-notification-banner');
    expect(alertMessage.textContent).toContain('The following defendant details have been updated');
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

  it('should display case notes if present', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerHTML).toContain('case-notes-tab');
  });

  it('should not display case notes if none are present', () => {
    fixture.componentInstance.caseNotes = null;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerHTML).not.toContain('case-notes-tab');
  });

  @Component({
    selector: 'case-overview-test',
    template: `
      <case-overview
        [kase]="kase"
        [defendant]="defendant"
        [offences]="offences"
        [caseDecisions]="caseDecisions"
        [caseNotes]="caseNotes"
      ></case-overview>
    `,
    imports: [OverviewComponent]
  })
  class TestCaseOverviewComponent {
    kase: Case;
    defendant: Defendant;
    offences: Offence[];
    caseDecisions: CaseDecision[];
    caseNotes: CaseNotes;
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
    selector: 'case-details, defendant-details-person, defendant-details-legal-entity, document-list',
    template: `
      <div>{{ documents | json }}</div>
      <div>{{ personDetails | json }}</div>
      <div>{{ legalEntityDetails | json }}</div>
      <div>{{ kase | json }}</div>
      <div>{{ caseId }}</div>
    `
  })
  class MockSubComponent {
    @Input() documents: CaseDocument[];
    @Input() personDetails: PersonalDetails;
    @Input() legalEntityDetails: LegalEntityDetails;
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

  @Component({
    selector: 'date-of-birth',
    template: `
      <div>dateOfBirth: {{ dateOfBirth }}</div>
      <div>defaultSubstitute: {{ defaultSubstitute }}</div>
    `
  })
  class MockDateOfBirthComponent {
    @Input() dateOfBirth: string;
    @Input() defaultSubstitute = '–';
  }
});
