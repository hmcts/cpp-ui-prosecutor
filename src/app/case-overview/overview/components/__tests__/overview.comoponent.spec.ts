import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import {
  PdkBreadcrumbsModule,
  PdkCoreModule,
  PdkDividerModule,
  PdkGridModule,
  PdkPageHeaderModule,
  PdkTabsModule
} from '@cpp/pdk';
import { MOCK_CASE, MOCK_OFFENCES } from '../../../__tests__/test-mock-data';
import {
  AgePipeModule,
  DefendantNamePipeModule,
  FormatAddressPipeModule,
  FormatDatePipeModule
} from '../../../../shared/pipes';
import { Case, CaseDocument, Defendant, Offence } from '../../../../contexts/sjp';
import { OverviewComponent } from '../overview.component';

describe('OverviewComponent', () => {
  let fixture: ComponentFixture<TestCaseOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        OverviewComponent,
        TestCaseOverviewComponent,
        MockOffenceComponent,
        MockPleaMitigationComponent,
        MockStatementOfFactsComponent,
        MockSubComponent
      ],
      imports: [
        PdkCoreModule,
        PdkPageHeaderModule,
        PdkTabsModule,
        PdkGridModule,
        PdkDividerModule,
        AgePipeModule,
        DefendantNamePipeModule,
        FormatDatePipeModule,
        FormatAddressPipeModule,
        PdkBreadcrumbsModule
      ]
    });

    Date.now = jest.fn(() => Date.parse('2017-02-14'));

    fixture = TestBed.createComponent(TestCaseOverviewComponent);
    fixture.componentInstance.kase = MOCK_CASE;
    fixture.componentInstance.defendant = MOCK_CASE.defendant;
    fixture.componentInstance.offences = MOCK_OFFENCES;
  });

  it('should compile correctly', () => {
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

  @Component({
    selector: 'case-overview-test',
    template: `
      <case-overview [kase]="kase" [defendant]="defendant" [offences]="offences"></case-overview>
    `
  })
  class TestCaseOverviewComponent {
    kase: Case;
    defendant: Defendant;
    offences: Offence[];
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
    selector: 'case-details, defendant-details, document-list',
    template: `
      <div>{{ documents | json }}</div>
      <div>{{ defendantDetails | json }}</div>
      <div>{{ kase | json }}</div>
    `
  })
  class MockSubComponent {
    @Input() documents: CaseDocument[];
    @Input() defendantDetails: Defendant;
    @Input() kase: Case;
  }
});
