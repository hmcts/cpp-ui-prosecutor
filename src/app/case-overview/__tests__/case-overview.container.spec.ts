import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { Case, Defendant, Offence } from '../case-overview.interfaces';
import { CaseOverviewContainer } from '../case-overview.container';
import { reducers } from '../../reducers';
import { Store, StoreModule } from '@ngrx/store';
import { caseOverviewReducer } from '../case-overview.reducer';
import { GetCaseByIdSuccess } from '../case-overview.action';
import { MOCK_CASE } from './test-mock-data';
import { FeatureState } from '../case-overview.selectors';

describe('CaseOverviewContainer', () => {
  let fixture: ComponentFixture<CaseOverviewContainer>;
  let store: Store<FeatureState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseOverviewContainer, MockCaseOverviewComponent],
      imports: [StoreModule.forRoot(reducers), StoreModule.forFeature('kase', caseOverviewReducer)]
    });

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(CaseOverviewContainer);
  });

  it('should compile correctly', () => {
    store.dispatch(new GetCaseByIdSuccess(MOCK_CASE));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'case-overview',
    template: `
      <div>{{ kase | json }}</div>
      <div>{{ defendant | json }}</div>
      <div>{{ offences | json }}</div>
    `
  })
  class MockCaseOverviewComponent {
    @Input() kase: Case;
    @Input() defendant: Defendant;
    @Input() offences: Offence[];
  }
});
