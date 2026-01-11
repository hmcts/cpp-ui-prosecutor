import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevToolsDashboardComponent } from '../dashboard.component';
import { ActivatedRoute } from '@angular/router';

describe('DevTools dashboard component', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let dashboardComponent: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent, DevToolsDashboardComponent],
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

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    dashboardComponent = fixture.debugElement.query(By.css('dev-tools-dashboard'));

    fixture.detectChanges();
  });

  it('compiles', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('shows user details when user is set', () => {
    testComponent.user = {
      id: 'userId',
      displayName: 'Charging lawyer 1 - Tina Turner'
    };
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
    expect(
      dashboardComponent
        .queryAll(By.css('span'))
        .some(spanElement => spanElement.nativeElement.innerHTML.includes('Charging lawyer 1 - Tina Turner'))
    ).toBeTruthy();
  });
});

@Component({
  selector: 'test-devtools',
  template: '<dev-tools-dashboard [user]="user"></dev-tools-dashboard>',
  imports: [DevToolsDashboardComponent]
})
class TestComponent {
  fakeSessionEnabled: boolean;
  user: any;
}
