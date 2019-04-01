import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { TflDashboardComponent } from '../tfl-dashboard.component';
import { PdkCoreModule, PdkGridModule, PdkSummaryItemModule } from '@cpp/pdk';

describe('TflDashboardComponent', () => {
  let fixture: ComponentFixture<TflDashboardComponent>;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TflDashboardComponent, MockSearchContainer, ReviewNotGuiltyPleasLink],
      imports: [PdkCoreModule, PdkGridModule, PdkSummaryItemModule]
    });
    fixture = TestBed.createComponent(TflDashboardComponent);
    component = fixture.componentInstance;
  });

  it('should compile correctly', () => {
    component.pleadedNotGuiltyCasesDetail = { cases: [{ caseId: 'caseId' }], count: 1 };
    component.casesWithSjpNoticeCount = 5;
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
