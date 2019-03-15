import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { DashboardComponent } from '../dashboard.component';
import { MOCK_PENDING_DATES_TO_AVOID } from './test-mock-data';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, MockSearchContainer, ReviewNotGuiltyPleasLink],
      imports: []
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should compile correctly', () => {
    component.pleadedNotGuiltyCasesDetail = MOCK_PENDING_DATES_TO_AVOID;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'review-not-guilty-pleas-link',
    template: `
      <span>{{ numberOfCases }}</span>
    `
  })
  class ReviewNotGuiltyPleasLink {
    @Input() numberOfCases;
  }

  @Component({
    selector: 'search-input-container',
    template: `
      <div></div>
    `
  })
  class MockSearchContainer {}
});
