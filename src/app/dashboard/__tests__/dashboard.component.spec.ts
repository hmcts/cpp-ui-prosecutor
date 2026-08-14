import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { DashboardComponent } from '../dashboard.component';
import { MOCK_DEFENDANT_DETAILS_UPDATES, MOCK_PENDING_DATES_TO_AVOID } from './test-mock-data';
import { ActivatedRoute } from '@angular/router';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MockSearchContainer,
        ReviewNotGuiltyPleasLinkComponent,
        DefendantDetailsUpdateLinkComponent,
        DashboardComponent
      ],
      providers: [{ provide: ActivatedRoute, useValue: { snapshot: { params: { id: '123' } } } }],
      teardown: { destroyAfterEach: false }
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should compile correctly', () => {
    component.pleadedNotGuiltyCasesDetail = MOCK_PENDING_DATES_TO_AVOID;
    component.defendantDetailsUpdates = MOCK_DEFENDANT_DETAILS_UPDATES;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'review-not-guilty-pleas-link',
    template: `
      <span>{{ numberOfCases }}</span>
    `
  })
  class ReviewNotGuiltyPleasLinkComponent {
    @Input() numberOfCases;
  }

  @Component({
    selector: 'defendant-details-updates-link',
    template: `
      <span>{{ numberOfUpdates }}</span>
    `
  })
  class DefendantDetailsUpdateLinkComponent {
    @Input() numberOfUpdates;
  }

  @Component({
    selector: 'search-input-container',
    template: `
      <div></div>
    `
  })
  class MockSearchContainer {}
});
