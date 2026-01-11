import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DashboardContainer } from '../dashboard.container';
import { Component, Input } from '@angular/core';
import { Router, provideRouter } from '@angular/router';
import { provideStore, Store } from '@ngrx/store';
import { JsonPipe } from '@angular/common';

import { MOCK_PENDING_DATES_TO_AVOID, MOCK_DEFENDANT_DETAILS_UPDATES } from './test-mock-data';
import { reducers, State } from '../../reducers';
import { LoadPleadedNotGuiltyCases, LoadDefendantDetailsUpdates } from '../../core/actions/entities';
import { DashboardComponent } from '../dashboard.component';

@Component({
  selector: 'prosecutor-dashboard',
  template: `
    <span>{{ pleadedNotGuiltyCasesDetail | json }}</span>
    <span>{{ defendantDetailsUpdates | json }}</span>
    <span>{{ casesMissingSjpNoticeCount | json }}</span>
  `,
  imports: [JsonPipe]
})
class MockDashboardComponent {
  @Input() pleadedNotGuiltyCasesDetail;
  @Input() defendantDetailsUpdates;
  @Input() casesMissingSjpNoticeCount;
  @Input() hasNpp;
}

describe('DashboardContainer', () => {
  let fixture: ComponentFixture<DashboardContainer>;
  let navigate: jest.Mock;
  let store: Store<State>;

  beforeEach(
    waitForAsync(() => {
      navigate = jest.fn();
      TestBed.configureTestingModule({
        providers: [
          provideStore(reducers, { runtimeChecks: {} }),
          provideRouter([]),
          {
            provide: Router,
            useValue: {
              navigate
            }
          }
        ],
        teardown: { destroyAfterEach: false }
      })
        .overrideComponent(DashboardContainer, {
          remove: {
            imports: [DashboardComponent]
          },
          add: {
            imports: [MockDashboardComponent]
          }
        })
        .compileComponents();

      store = TestBed.inject(Store);
      fixture = TestBed.createComponent(DashboardContainer);
    })
  );

  it('should compile correctly', () => {
    store.dispatch(new LoadPleadedNotGuiltyCases(MOCK_PENDING_DATES_TO_AVOID));
    store.dispatch(new LoadDefendantDetailsUpdates(MOCK_DEFENDANT_DETAILS_UPDATES));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
