import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DefendantDetailsUpdatesLinkComponent } from '../defendant-details-updates-link.component';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

describe('DefendantDetailsUpdatesLinkComponent', () => {
  let component: DefendantDetailsUpdatesLinkComponent;
  let fixture: ComponentFixture<DefendantDetailsUpdatesLinkComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DefendantDetailsUpdatesLinkComponent],
        providers: [provideRouter([]), { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '123' } } } }],
        teardown: { destroyAfterEach: false }
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DefendantDetailsUpdatesLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the number of updates (0 updates)', () => {
    component.numberOfUpdates = 0;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should contain the number of updates (1 update)', () => {
    component.numberOfUpdates = 1;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
