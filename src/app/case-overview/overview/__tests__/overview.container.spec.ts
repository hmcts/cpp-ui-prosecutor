import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { reducers } from '../../../reducers';
import { Store, StoreModule } from '@ngrx/store';
import { caseOverviewReducer } from '../../case-overview.reducer';
import { GetCaseByIdSuccess } from '../../case-overview.action';
import { MOCK_CASE } from '../../__tests__/test-mock-data';
import { FeatureState } from '../../case-overview.selectors';
import { Case, Defendant, Offence } from '../../../contexts/sjp';
import { OverviewContainer } from '../overview.container';
import { RouterTestingModule } from '@angular/router/testing';

describe('OverviewContainer', () => {
  let fixture: ComponentFixture<OverviewContainer>;
  let store: Store<FeatureState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewContainer, MockCaseOverviewComponent],
      imports: [RouterTestingModule, StoreModule.forRoot(reducers), StoreModule.forFeature('kase', caseOverviewReducer)]
    });

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(OverviewContainer);
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
    @Input() displayOffencesWithdrawnBanner: boolean;
  }
});
