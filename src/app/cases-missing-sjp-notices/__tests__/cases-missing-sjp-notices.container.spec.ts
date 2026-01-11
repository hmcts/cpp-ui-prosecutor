import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CasesMissingSjpNoticesContainer } from '../cases-missing-sjp-notices.container';
import { Component, Input } from '@angular/core';
import { CaseDetails, CaseSummary, DefendantSummary } from '../../contexts/sjp';
import { provideStore, Store } from '@ngrx/store';
import { reducers, State } from '../../reducers';
import { LoadCasesMissingSjpNoticeSuccess } from '../cases-missing-sjp-notices.action';

describe('CasesMissingSjpNoticesContainer', () => {
  let fixture: ComponentFixture<CasesMissingSjpNoticesContainer>;
  let store: Store<State>;

  const mockCaseDetails = [
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
        imports: [MockCasesMissingSjpNoticesComponent, CasesMissingSjpNoticesContainer],
        providers: [provideStore(reducers, { runtimeChecks: {} })],
        teardown: { destroyAfterEach: false }
      });

      store = TestBed.inject(Store);
      fixture = TestBed.createComponent(CasesMissingSjpNoticesContainer);

      store.dispatch(new LoadCasesMissingSjpNoticeSuccess(mockCaseDetails));
    })
  );

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'cases-missing-sjp-notices',
    template: `
      <div>{{ casesMissingNotices | json }}</div>
    `
  })
  class MockCasesMissingSjpNoticesComponent {
    @Input() casesMissingNotices: CaseDetails[];
  }
});
