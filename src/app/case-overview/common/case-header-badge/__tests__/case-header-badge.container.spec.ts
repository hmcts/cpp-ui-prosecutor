import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { reducers, State } from '../../../../reducers';
import { provideStore, Store } from '@ngrx/store';
import { MOCK_CASE } from '../../../__tests__/test-mock-data';
import { Case } from '../../../../contexts/sjp';
import { LoadCaseSuccess } from '../../../../core/actions';
import { CaseHeaderBadgeContainer } from '../case-header-badge.container';

describe('CaseHeaderBadgeContainer', () => {
  let fixture: ComponentFixture<CaseHeaderBadgeContainer>;
  let store: Store<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CaseHeaderBadgeContainer, MockCaseHeaderBadgeComponent],
      providers: [provideStore(reducers, { runtimeChecks: {} })],
      teardown: { destroyAfterEach: false }
    });

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(CaseHeaderBadgeContainer);
  });

  it('should compile correctly', () => {
    store.dispatch(new LoadCaseSuccess(MOCK_CASE));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'case-header-badge',
    template: `
      <div>{{ kase | json }}</div>
    `
  })
  class MockCaseHeaderBadgeComponent {
    @Input() kase: Case;
  }
});
