import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { CaseDetails } from '../../../../contexts/sjp';
import { PdkCoreModule, PdkGridModule, PdkInsetTextModule } from '@cpp/pdk';
import { RouterTestingModule } from '@angular/router/testing';
import { MOCK_SEARCH_RESULTS } from '../../../__tests__/test-mock-data';
import { SearchInputModule } from '../../../search-input/search-input.module';
import { SearchResultsComponent } from '../search-results.component';
import { MockModule } from '../../../../shared/mock-components/mock.module';

describe('SearchResultsComponent', () => {
  let fixture: ComponentFixture<TestSearchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchResultsComponent, TestSearchResultsComponent, MockListSearchComponent],
      imports: [RouterTestingModule, PdkCoreModule, PdkGridModule, PdkInsetTextModule, SearchInputModule, MockModule]
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
    `
  })
  class TestSearchResultsComponent {
    searchResults: CaseDetails[];
  }

  @Component({
    selector: 'list-search-results',
    template: `
      {{ searchResults | json }}
    `
  })
  class MockListSearchComponent {
    @Input() searchResults: CaseDetails[];
  }
});
