import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CaseDetails } from '../../../../contexts/sjp';
import { ListSearchResultsComponent } from '../list-search-results.component';
import { MOCK_SEARCH_RESULTS } from '../../../__tests__/test-mock-data';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

describe('ListSearchResultsComponent', () => {
  let fixture: ComponentFixture<TestListSearchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestListSearchResultsComponent, ListSearchResultsComponent],
      providers: [provideRouter([]), { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '123' } } } }],
      teardown: { destroyAfterEach: false }
    });
    fixture = TestBed.createComponent(TestListSearchResultsComponent);
  });

  it('should compile correctly with no results', () => {
    fixture.componentInstance.searchResults = [];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with single result', () => {
    fixture.componentInstance.searchResults = MOCK_SEARCH_RESULTS.results.splice(0, 1);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should compile correctly with multiple results', () => {
    fixture.componentInstance.searchResults = MOCK_SEARCH_RESULTS.results;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it(`should display the 'Upload and enter postal reply' link`, () => {
    const caseDetails = MOCK_SEARCH_RESULTS.results[0];
    fixture.componentInstance.searchResults = [
      {
        ...caseDetails,
        status: 'NO_PLEA_RECEIVED_READY_FOR_DECISION'
      }
    ];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it(`should display Awaiting listing for refer to court yet to be listed`, () => {
    const caseDetails = MOCK_SEARCH_RESULTS.results[0];
    fixture.componentInstance.searchResults = [
      {
        ...caseDetails,
        status: 'REFERRED_FOR_COURT_HEARING',
        listedInCriminalCourts: false
      }
    ];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'list-search-results-test',
    template: `
      <list-search-results [searchResults]="searchResults"></list-search-results>
    `,
    imports: [ListSearchResultsComponent]
  })
  class TestListSearchResultsComponent {
    searchResults: CaseDetails[];
  }
});
