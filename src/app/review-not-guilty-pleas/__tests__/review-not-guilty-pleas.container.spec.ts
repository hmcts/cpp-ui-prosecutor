import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewNotGuiltyPleasContainer } from '../review-not-guilty-pleas.container';
import { provideStore, Store } from '@ngrx/store';
import { reducers, State } from '../../reducers';
import { Component, Input } from '@angular/core';
import { LoadPleadedNotGuiltyCases, SetFilter } from '../../core';
import { MOCK_PENDING_DATES_TO_AVOID } from '../../dashboard/__tests__/test-mock-data';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

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

  describe('setRegion', () => {
    it('should dispatch SetFilter action and navigate to review-not-guilty-pleas with selected region', () => {
      const payload = {
        selectedRegion: 'London',
        prosecutor: 'TFL'
      };

      jest.spyOn(store, 'dispatch');

      fixture.componentInstance.setFilter(payload);

      expect(store.dispatch).toHaveBeenCalledWith(new SetFilter(payload));
      expect(navigate).toHaveBeenCalledWith(['user', 'review-not-guilty-pleas', 'London', 'TFL']);
    });
  });

  describe('viewCase', () => {
    it('should navigate to case overview with the correct caseId', () => {
      const caseId = 'test-case-id-456';

      fixture.componentInstance.viewCase(caseId);

      expect(navigate).toHaveBeenCalledWith(['user', 'case-overview', caseId]);
    });
  });
});

@Component({
  selector: 'review-not-guilty-pleas',
  template: `
    <span>{{ pleadedNotGuiltyCasesDetail | json }}</span>
    <span>{{ region | json }}</span>
    <span>{{ prosecutorOptions | json }}</span>
  `,
  imports: [JsonPipe]
})
class MockReviewNotGuiltyPleasComponent {
  @Input() pleadedNotGuiltyCasesDetail;
  @Input() region;
  @Input() prosecutorOptions;
}
