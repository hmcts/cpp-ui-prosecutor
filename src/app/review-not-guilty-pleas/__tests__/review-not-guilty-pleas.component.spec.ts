import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReviewNotGuiltyPleasComponent } from '../review-not-guilty-pleas.component';
import {
  MOCK_PENDING_DATES_TO_AVOID,
  MOCK_PENDING_DATES_TO_AVOID_WITH_SINGLE_CASE
} from '../../dashboard/__tests__/test-mock-data';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

describe('ReviewNotGuiltyPleasComponent', () => {
  let component: ReviewNotGuiltyPleasComponent;
  let fixture: ComponentFixture<ReviewNotGuiltyPleasComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReviewNotGuiltyPleasComponent],
        providers: [provideRouter([]), { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '123' } } } }],
        teardown: { destroyAfterEach: false }
      });

      fixture = TestBed.createComponent(ReviewNotGuiltyPleasComponent);
      component = fixture.componentInstance;
    })
  );

  it('when the component is created with zero cases then the component should display message "There are no cases to review"', () => {
    component.pleadedNotGuiltyCasesDetail = {
      cases: [],
      count: 0
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('when the component is created with 1 case then the component should be created with out failure', () => {
    component.pleadedNotGuiltyCasesDetail = MOCK_PENDING_DATES_TO_AVOID_WITH_SINGLE_CASE;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('then the component should be created with out failure', () => {
    component.pleadedNotGuiltyCasesDetail = MOCK_PENDING_DATES_TO_AVOID;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
