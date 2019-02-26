import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardContainer } from '../dashboard.container';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

describe('DashboardContainer', () => {
  let fixture: ComponentFixture<DashboardContainer>;
  let navigate: jest.Mock;

  beforeEach(() => {
    navigate = jest.fn();
    TestBed.configureTestingModule({
      declarations: [DashboardContainer, MockDashboardComponent],
      imports: [],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate
          }
        }
      ]
    });
    fixture = TestBed.createComponent(DashboardContainer);
  });

  it('should compile correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'prosecutor-dashboard',
    template: `
      <span>dashboard</span>
    `
  })
  class MockDashboardComponent {}
});
