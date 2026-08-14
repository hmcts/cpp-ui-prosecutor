import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MOCK_CASE } from '../../../__tests__/test-mock-data';
import { CaseDetailsComponent } from '../case-details.component';
import { Case } from '../../../../contexts/sjp';
import { IfEmptyPipe } from '../../../../shared/pipes/if-empty/if-empty.pipe';
import { CaseStatusPipe } from '../../../../shared/pipes/case-status/case-status.pipe';
import { DefendantNamePipe } from '../../../../shared/pipes/defendant-name/defendant-name.pipe';
import { AgePipe } from '../../../../shared/pipes/age/age.pipe';
import { FormatDatePipe } from '../../../../shared/pipes/format-date/format-date.pipe';
import { FormatAddressPipe } from '../../../../shared/pipes/format-address/format-address.pipe';
import { ApplicationStatusPipe } from '../../../../shared/pipes/application-status/application-status.pipe';

describe('CaseDetailsComponent', () => {
  let fixture: ComponentFixture<TestCaseDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AgePipe,
        IfEmptyPipe,
        DefendantNamePipe,
        CaseStatusPipe,
        FormatDatePipe,
        FormatAddressPipe,
        ApplicationStatusPipe,
        TestCaseDetailsComponent,
        CaseDetailsComponent
      ],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(TestCaseDetailsComponent);
    fixture.componentInstance.kase = MOCK_CASE;
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with re-opened date', () => {
    fixture.componentInstance.kase = {
      ...MOCK_CASE,
      reopenedDate: '2018-12-12',
      libraCaseNumber: 'case123',
      reopenedInLibraReason: 'collateral damage'
    };

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it(`should display Awaiting listing for refer to court yet to be listed`, () => {
    fixture.componentInstance.kase = {
      ...MOCK_CASE,
      status: 'REFERRED_FOR_COURT_HEARING',
      listedInCriminalCourts: false
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display the court details for listed in criminal courts case', () => {
    fixture.componentInstance.kase = {
      ...MOCK_CASE,
      status: 'REFERRED_FOR_COURT_HEARING',
      listedInCriminalCourts: true,
      hearingCourtName: 'Hearing court ',
      hearingTime: '2018-12-12'
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should not display application details if no application is present', () => {
    fixture.componentInstance.kase = {
      ...MOCK_CASE,
      caseApplication: null
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    expect(fixture.nativeElement.innerHTML).not.toContain('Date application received');
    expect(fixture.nativeElement.innerHTML).not.toContain('Application status');
  });

  it('should display application if application is present', () => {
    fixture.componentInstance.kase = {
      ...MOCK_CASE,
      caseApplication: {
        applicationStatus: 'APPEAL_ABANDONED',
        dateReceived: '2020-01-01'
      } as any
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    expect(fixture.nativeElement.innerHTML).toContain('Date application received');
    expect(fixture.nativeElement.innerHTML).toContain('Application status');
  });

  @Component({
    selector: 'case-details-test',
    template: `
      <case-details [kase]="kase"> </case-details>
    `,
    imports: [
      AgePipe,
      IfEmptyPipe,
      DefendantNamePipe,
      CaseStatusPipe,
      FormatDatePipe,
      FormatAddressPipe,
      ApplicationStatusPipe,
      CaseDetailsComponent
    ]
  })
  class TestCaseDetailsComponent {
    kase: Case;
  }
});
