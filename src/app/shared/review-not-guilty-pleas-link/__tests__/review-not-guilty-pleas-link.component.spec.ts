import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReviewNotGuiltyPleasLinkComponent } from '../review-not-guilty-pleas-link.component';
import { ActivatedRoute } from '@angular/router';

describe('ReviewNotGuiltyPleasLinkComponent', () => {
  let component: ReviewNotGuiltyPleasLinkComponent;
  let fixture: ComponentFixture<ReviewNotGuiltyPleasLinkComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReviewNotGuiltyPleasLinkComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: { params: { id: '123' } }
            }
          }
        ],
        teardown: { destroyAfterEach: false }
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewNotGuiltyPleasLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('when the component is created with zero cases then the link should contain (0)', () => {
    component.numberOfCases = 0;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('when the component is created with single case then the link should contain (1 case)', () => {
    component.numberOfCases = 1;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('when the component is created with multiple cases then the link should contain (2 cases)', () => {
    component.numberOfCases = 2;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
