import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { DashboardComponent } from '../dashboard.component';
import { MOCK_DEFENDANT_DETAILS_UPDATES, MOCK_PENDING_DATES_TO_AVOID } from './test-mock-data';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, MockSearchContainer, ReviewNotGuiltyPleasLink, DefendantDetailsUpdateLink],
      imports: []
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
  class ReviewNotGuiltyPleasLink {
    @Input() numberOfCases;
  }

  @Component({
    selector: 'defendant-details-updates-link',
    template: `
      <span>{{ numberOfUpdates }}</span>
    `
  })
  class DefendantDetailsUpdateLink {
    @Input() numberOfUpdates;
  }

  @Component({
    selector: 'export-case-decisions-link',
    template: ``
  })
  class ExportCaseDecisionsLink {}

  @Component({
    selector: 'search-input-container',
    template: `
      <div></div>
    `
  })
  class MockSearchContainer {}
});
