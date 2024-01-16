import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DefendantDetailsUpdatesLinkComponent } from '../defendant-details-updates-link.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DefendantDetailsUpdatesLinkComponent', () => {
  let component: DefendantDetailsUpdatesLinkComponent;
  let fixture: ComponentFixture<DefendantDetailsUpdatesLinkComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DefendantDetailsUpdatesLinkComponent],
        imports: [RouterTestingModule],
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
