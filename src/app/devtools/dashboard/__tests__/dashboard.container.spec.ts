import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardContainer } from '../../../dashboard/dashboard.container';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { provideStore, Store } from '@ngrx/store';
import {
  MOCK_PENDING_DATES_TO_AVOID,
  MOCK_DEFENDANT_DETAILS_UPDATES
} from '../../../dashboard/__tests__/test-mock-data';
import { LoadPleadedNotGuiltyCases, LoadDefendantDetailsUpdates } from '../../../core/actions/entities';
import { reducers } from '../../../reducers';
import { JsonPipe } from '@angular/common';
import { DashboardComponent } from '../../../dashboard/dashboard.component';

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
  let store: Store<any>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: '123'
              }
            }
          }
        },
        provideRouter([])
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
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
    fixture = TestBed.createComponent(DashboardContainer);
  });

  it('should compile correctly', () => {
    store.dispatch(new LoadPleadedNotGuiltyCases(MOCK_PENDING_DATES_TO_AVOID));
    store.dispatch(new LoadDefendantDetailsUpdates(MOCK_DEFENDANT_DETAILS_UPDATES));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
