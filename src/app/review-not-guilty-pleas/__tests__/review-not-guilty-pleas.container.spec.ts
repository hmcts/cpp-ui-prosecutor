import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewNotGuiltyPleasContainer } from '../review-not-guilty-pleas.container';
import { provideStore, Store } from '@ngrx/store';
import { reducers, State } from '../../reducers';
import { Component, Input } from '@angular/core';
import { LoadPleadedNotGuiltyCases } from '../../core/actions/entities';
import { MOCK_PENDING_DATES_TO_AVOID } from '../../dashboard/__tests__/test-mock-data';
import { ActivatedRoute, Router } from '@angular/router';

describe('ReviewNotGuiltyPleasContainer', () => {
  let fixture: ComponentFixture<ReviewNotGuiltyPleasContainer>;
  let store: Store<State>;
  let navigate: jest.Mock;

  beforeEach(() => {
    navigate = jest.fn();
    TestBed.configureTestingModule({
      imports: [MockReviewNotGuiltyPleasComponent, ReviewNotGuiltyPleasContainer],
      providers: [
        provideStore(reducers, { runtimeChecks: {} }),
        {
          provide: Router,
          useValue: {
            navigate
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: '123'
              }
            }
          }
        }
      ],
      teardown: { destroyAfterEach: false }
    });

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ReviewNotGuiltyPleasContainer);
  });

  it('should create container', () => {
    store.dispatch(new LoadPleadedNotGuiltyCases(MOCK_PENDING_DATES_TO_AVOID));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'review-not-guilty-pleas',
  template: `
    <span>{{ pleadedNotGuiltyCasesDetail | json }}</span>
    <span>{{ region | json }}</span>
  `
})
class MockReviewNotGuiltyPleasComponent {
  @Input() pleadedNotGuiltyCasesDetail;
  @Input() region;
}
