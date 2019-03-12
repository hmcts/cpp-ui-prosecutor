import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardContainer } from '../dashboard.container';
import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard.component';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, TestDashboardComponent, MockSearchContainer],
      imports: []
    });
    fixture = TestBed.createComponent(TestDashboardComponent);
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'prosecutor-dashboard-test',
    template: `
      <prosecutor-dashboard></prosecutor-dashboard>
    `
  })
  class TestDashboardComponent {}

  @Component({
    selector: 'search-input-container',
    template: `
      <div></div>
    `
  })
  class MockSearchContainer {}
});
