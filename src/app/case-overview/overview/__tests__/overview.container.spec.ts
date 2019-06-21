import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { reducers } from '../../../reducers';
import { Store, StoreModule } from '@ngrx/store';
import { caseOverviewReducer } from '../../case-overview.reducer';
import { MOCK_CASE, MOCK_CASE_DECISION } from '../../__tests__/test-mock-data';
import { FeatureState } from '../../case-overview.selectors';
import { Case, CaseDecision, Defendant, Offence } from '../../../contexts/sjp';
import { OverviewContainer } from '../overview.container';
import { LoadCaseSuccess } from '../../../core/actions';

describe('OverviewContainer', () => {
  let fixture: ComponentFixture<OverviewContainer>;
  let store: Store<FeatureState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewContainer, MockCaseOverviewComponent],
      imports: [StoreModule.forRoot(reducers), StoreModule.forFeature('caseOverview', caseOverviewReducer)]
    });

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(OverviewContainer);
  });

  it('should compile correctly', () => {
    MOCK_CASE.caseDecisions = [MOCK_CASE_DECISION];
    store.dispatch(new LoadCaseSuccess(MOCK_CASE));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'case-overview',
    template: `
      <div>kase: {{ kase | json }}</div>
      <div>defendant: {{ defendant | json }}</div>
      <div>offences: {{ offences | json }}</div>
      <div>caseDecisions: {{ caseDecisions | json }}</div>
    `
  })
  class MockCaseOverviewComponent {
    @Input() kase: Case;
    @Input() defendant: Defendant;
    @Input() offences: Offence[];
    @Input() displayOffencesWithdrawnBanner: boolean;
    @Input() displayOffencesWithdrawnFailedBanner: boolean;
    @Input() displayDatesToAvoidUpdateFailedBanner: boolean;
    @Input() caseDecisions: CaseDecision[];
  }
});
