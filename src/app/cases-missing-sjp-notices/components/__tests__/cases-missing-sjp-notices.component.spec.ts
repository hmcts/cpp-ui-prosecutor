import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CaseDetails, CaseSummary, DefendantSummary } from '../../../contexts/sjp';
import { CasesMissingSjpNoticesComponent } from '../cases-missing-sjp-notices.component';
import { Component, Input } from '@angular/core';

describe('CasesMissingSjpNoticesComponent', () => {
  let fixture: ComponentFixture<CasesMissingSjpNoticesComponent>;
  let component;

  const mockCasesMissingNotice = [
    {
      id: 'caseId1',
      urn: '22C22222222',
      defendant: {
        id: 'defendantId1',
        title: 'Mr',
        firstName: 'Abel',
        lastName: 'Krumps',
        dateOfBirth: '1972-01-01',
        gender: 'Male',
        nationalInsuranceNumber: 'SR67854OP'
      } as DefendantSummary,
      prosecutingAuthority: 'TFL',
      postingDate: '2019-05-03'
    } as CaseSummary,
    {
      id: 'caseId2',
      urn: '33C2DF22222',
      defendant: {
        id: 'defendantId2',
        title: 'Mrs',
        firstName: 'Linda',
        lastName: 'Craig',
        dateOfBirth: '1980-07-12',
        gender: 'Female',
        nationalInsuranceNumber: 'SR63344OQ'
      } as DefendantSummary,
      prosecutingAuthority: 'TFL',
      postingDate: '2019-05-03'
    } as CaseSummary
  ];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MockListCasesMissingSjpNoticesComponent, CasesMissingSjpNoticesComponent],
        teardown: { destroyAfterEach: false }
      });
      fixture = TestBed.createComponent(CasesMissingSjpNoticesComponent);
      component = fixture.componentInstance;
    })
  );

  it('should compile correctly with no data', () => {
    component.casesMissingNotices = [];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with single row', () => {
    component.casesMissingNotices = [mockCasesMissingNotice[0]];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with multiple rows', () => {
    component.casesMissingNotices = mockCasesMissingNotice;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'list-cases-missing-sjp-notices',
    template: `
      <div>{{ casesMissingNotices | json }}</div>
    `
  })
  class MockListCasesMissingSjpNoticesComponent {
    @Input() casesMissingNotices: CaseDetails[];
  }
});
