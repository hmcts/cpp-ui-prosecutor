import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListCasesMissingSjpNoticesComponent } from '../list-cases-missing-sjp-notices.component';
import { CaseSummary, DefendantSummary } from '../../../contexts/sjp';

describe('ListCasesMissingSjpNotices.ComponentComponent', () => {
  let component: ListCasesMissingSjpNoticesComponent;
  let fixture: ComponentFixture<ListCasesMissingSjpNoticesComponent>;

  const mockCasesMissingSjpNoticesArray = [
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
        imports: [ListCasesMissingSjpNoticesComponent],
        teardown: { destroyAfterEach: false }
      });
      fixture = TestBed.createComponent(ListCasesMissingSjpNoticesComponent);
      component = fixture.componentInstance;
    })
  );

  it('should compile correctly with no data', () => {
    component.casesMissingNotices = [];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with single row', () => {
    component.casesMissingNotices = [mockCasesMissingSjpNoticesArray[0]];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with  multiple rows', () => {
    component.casesMissingNotices = mockCasesMissingSjpNoticesArray;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
