import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardContainer } from '../dashboard.container';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';

import { MOCK_PENDING_DATES_TO_AVOID, MOCK_DEFENDANT_DETAILS_UPDATES } from './test-mock-data';
import { reducers, State } from '../../reducers';

import { CommonModule } from '@angular/common';
import { LoadPleadedNotGuiltyCases, LoadDefendantDetailsUpdates } from '../../core/actions/entities';

describe('DashboardContainer', () => {
  let fixture: ComponentFixture<DashboardContainer>;
  let navigate: jest.Mock;
  let store: Store<State>;

  beforeEach(() => {
    navigate = jest.fn();
    TestBed.configureTestingModule({
      declarations: [DashboardContainer, MockDashboardComponent],
      imports: [CommonModule, StoreModule.forRoot(reducers, {runtimeChecks: {}})],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate
          }
        }
      ]
    });

    store = TestBed.get(Store);
    fixture = TestBed.createComponent(DashboardContainer);
  });

  it('should compile correctly', () => {
    store.dispatch(new LoadPleadedNotGuiltyCases(MOCK_PENDING_DATES_TO_AVOID));
    store.dispatch(new LoadDefendantDetailsUpdates(MOCK_DEFENDANT_DETAILS_UPDATES));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'prosecutor-dashboard',
    template: `
      <span>{{ pleadedNotGuiltyCasesDetail | json }}</span>
      <span>{{ defendantDetailsUpdates | json }}</span>
      <span>{{ casesMissingSjpNoticeCount | json }}</span>
    `
  })
  class MockDashboardComponent {
    @Input() pleadedNotGuiltyCasesDetail;
    @Input() defendantDetailsUpdates;
    @Input() casesMissingSjpNoticeCount;
  }
});
