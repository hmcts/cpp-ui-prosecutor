import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { CaseDetails } from '../../../../contexts/sjp';
import { MOCK_SEARCH_RESULTS } from '../../../__tests__/test-mock-data';
import { SearchResultsComponent } from '../search-results.component';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { ListSearchResultsComponent } from '../list-search-results.component';

describe('SearchResultsComponent', () => {
  let fixture: ComponentFixture<TestSearchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchResultsComponent, TestSearchResultsComponent, MockListSearchComponent],
      providers: [provideRouter([]), { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '123' } } } }],
      teardown: { destroyAfterEach: false }
    });

    fixture = TestBed.createComponent(TestSearchResultsComponent);
  });

  it('should compile correctly', () => {
    fixture.componentInstance.searchResults = MOCK_SEARCH_RESULTS.results;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  @Component({
    selector: 'search-results-test',
    template: `
      <search-results [searchResultCases]="searchResults"></search-results>
    `,
    imports: [SearchResultsComponent]
  })
  class TestSearchResultsComponent {
    searchResults: CaseDetails[];
  }

  @Component({
    selector: 'list-search-results',
    template: `
      {{ searchResults | json }}
    `,
    imports: [ListSearchResultsComponent]
  })
  class MockListSearchComponent {
    @Input() searchResults: CaseDetails[];
  }
});
