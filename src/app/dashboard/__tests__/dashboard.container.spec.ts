import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardContainer } from '../dashboard.container';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';

import { MOCK_PENDING_DATES_TO_AVOID } from './test-mock-data';
import { reducers, State } from '../../reducers';

import { CommonModule } from '@angular/common';
import { LoadPleadedNotGuiltyCases } from '../../core/actions/entities';

describe('DashboardContainer', () => {
  let fixture: ComponentFixture<DashboardContainer>;
  let navigate: jest.Mock;
  let store: Store<State>;

  beforeEach(() => {
    navigate = jest.fn();
    TestBed.configureTestingModule({
      declarations: [DashboardContainer, MockDashboardComponent],
      imports: [CommonModule, StoreModule.forRoot(reducers)],
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
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'prosecutor-dashboard',
    template: `
      <span>{{ pleadedNotGuiltyCasesDetail | json }}</span>
    `
  })
  class MockDashboardComponent {
    @Input() pleadedNotGuiltyCasesDetail;
  }
});
