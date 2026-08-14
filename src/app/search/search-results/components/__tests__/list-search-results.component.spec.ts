import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { CaseDetails } from '../../../../contexts/sjp';
import { ListSearchResultsComponent } from '../list-search-results.component';
import { MOCK_SEARCH_RESULTS } from '../../../__tests__/test-mock-data';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PROSECUTOR_DEFAULT_VALUE } from '../../../search.selectors';
import { SelectOption } from '@cpp/pdk';

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
    fixture.componentInstance.searchResults = MOCK_SEARCH_RESULTS.results.slice(0, 1);

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

  it('should not display filter when there is only one prosecutor authority', () => {
    fixture.componentInstance.searchResults = MOCK_SEARCH_RESULTS.results;
    fixture.componentInstance.prosecutorOptions = [{ label: 'TFL', value: 'TFL' }];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display filter dropdown when there are multiple prosecutor authorities', () => {
    fixture.componentInstance.searchResults = MOCK_SEARCH_RESULTS.results;
    fixture.componentInstance.prosecutorOptions = [
      { label: 'All', value: PROSECUTOR_DEFAULT_VALUE },
      { label: 'TFL', value: 'TFL' },
      { label: 'TVL', value: 'TVL' }
    ];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should show all results when "All" filter is selected', () => {
    fixture.componentInstance.searchResults = MOCK_SEARCH_RESULTS.results;
    fixture.componentInstance.prosecutorOptions = [
      { label: 'All', value: PROSECUTOR_DEFAULT_VALUE },
      { label: 'TFL', value: 'TFL' },
      { label: 'TVL', value: 'TVL' }
    ];
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('[pdk-table-body] [pdk-table-row]');
    expect(rows.length).toBe(MOCK_SEARCH_RESULTS.results.length);
  });

  it('should filter results by selected prosecutor authority', () => {
    fixture.componentInstance.searchResults = MOCK_SEARCH_RESULTS.results;
    fixture.componentInstance.prosecutorOptions = [
      { label: 'All', value: PROSECUTOR_DEFAULT_VALUE },
      { label: 'TFL', value: 'TFL' },
      { label: 'TVL', value: 'TVL' }
    ];
    fixture.detectChanges();

    const component = fixture.debugElement.children[0].componentInstance as ListSearchResultsComponent;
    component.filterResults({ prosecutor: 'TFL' });
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('[pdk-table-body] [pdk-table-row]');
    const tflResults = MOCK_SEARCH_RESULTS.results.filter(r => r.prosecutingAuthority === 'TFL');
    expect(rows.length).toBe(tflResults.length);
  });

  it('should display correct prosecutor options in filter dropdown', () => {
    fixture.componentInstance.searchResults = MOCK_SEARCH_RESULTS.results;
    fixture.componentInstance.prosecutorOptions = [
      { label: 'All', value: PROSECUTOR_DEFAULT_VALUE },
      { label: 'TFL', value: 'TFL' },
      { label: 'TVL', value: 'TVL' }
    ];
    fixture.detectChanges();

    const component = fixture.debugElement.children[0].componentInstance as ListSearchResultsComponent;
    const prosecutors = component.prosecutorOptions();
    expect(prosecutors).toEqual([
      { label: 'All', value: PROSECUTOR_DEFAULT_VALUE },
      { label: 'TFL', value: 'TFL' },
      { label: 'TVL', value: 'TVL' }
    ]);
  });

  it('should reset to all results when filter is changed back to "All"', () => {
    fixture.componentInstance.searchResults = MOCK_SEARCH_RESULTS.results;
    fixture.componentInstance.prosecutorOptions = [
      { label: 'All', value: PROSECUTOR_DEFAULT_VALUE },
      { label: 'TFL', value: 'TFL' },
      { label: 'TVL', value: 'TVL' }
    ];
    fixture.detectChanges();

    const component = fixture.debugElement.children[0].componentInstance as ListSearchResultsComponent;

    // First filter by TFL
    component.filterResults({ prosecutor: 'TFL' });
    fixture.detectChanges();

    // Then reset to All
    component.filterResults({ prosecutor: PROSECUTOR_DEFAULT_VALUE });
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('[pdk-table-body] [pdk-table-row]');
    expect(rows.length).toBe(MOCK_SEARCH_RESULTS.results.length);
  });

  it('should show empty table when filtering by prosecutor with no matching results', () => {
    fixture.componentInstance.searchResults = MOCK_SEARCH_RESULTS.results.filter(r => r.prosecutingAuthority === 'TFL');
    fixture.componentInstance.prosecutorOptions = [
      { label: 'All', value: PROSECUTOR_DEFAULT_VALUE },
      { label: 'TFL', value: 'TFL' },
      { label: 'TVL', value: 'TVL' }
    ];
    fixture.detectChanges();

    const component = fixture.debugElement.children[0].componentInstance as ListSearchResultsComponent;
    component.filterResults({ prosecutor: 'TVL' });
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('[pdk-table-body] [pdk-table-row]');
    expect(rows.length).toBe(0);
  });

  it('should have "All" as default filter value', () => {
    fixture.componentInstance.searchResults = MOCK_SEARCH_RESULTS.results;
    fixture.componentInstance.prosecutorOptions = [
      { label: 'All', value: PROSECUTOR_DEFAULT_VALUE },
      { label: 'TFL', value: 'TFL' },
      { label: 'TVL', value: 'TVL' }
    ];
    fixture.detectChanges();

    const component = fixture.debugElement.children[0].componentInstance as ListSearchResultsComponent;
    expect(component.appliedFilter()).toBe(PROSECUTOR_DEFAULT_VALUE);
  });

  it('should update appliedFilter signal when filterResults is called', () => {
    fixture.componentInstance.searchResults = MOCK_SEARCH_RESULTS.results;
    fixture.componentInstance.prosecutorOptions = [
      { label: 'All', value: PROSECUTOR_DEFAULT_VALUE },
      { label: 'TFL', value: 'TFL' },
      { label: 'TVL', value: 'TVL' }
    ];
    fixture.detectChanges();

    const component = fixture.debugElement.children[0].componentInstance as ListSearchResultsComponent;
    component.filterResults({ prosecutor: 'TFL' });

    expect(component.appliedFilter()).toBe('TFL');
  });

  it('should filter results for TVL prosecutor', () => {
    fixture.componentInstance.searchResults = MOCK_SEARCH_RESULTS.results;
    fixture.componentInstance.prosecutorOptions = [
      { label: 'All', value: PROSECUTOR_DEFAULT_VALUE },
      { label: 'TFL', value: 'TFL' },
      { label: 'TVL', value: 'TVL' }
    ];
    fixture.detectChanges();

    const component = fixture.debugElement.children[0].componentInstance as ListSearchResultsComponent;
    component.filterResults({ prosecutor: 'TVL' });
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('[pdk-table-body] [pdk-table-row]');
    const tvlResults = MOCK_SEARCH_RESULTS.results.filter(r => r.prosecutingAuthority === 'TVL');
    expect(rows.length).toBe(tvlResults.length);
  });

  it('should not display filter dropdown when prosecutor authorities is empty', () => {
    fixture.componentInstance.searchResults = MOCK_SEARCH_RESULTS.results;
    fixture.componentInstance.prosecutorOptions = [];
    fixture.detectChanges();

    const filterForm = fixture.nativeElement.querySelector('form[pdk-form]');
    expect(filterForm).toBeNull();
  });

  it('should display filtered results with correct prosecutor authority in table cells', () => {
    fixture.componentInstance.searchResults = MOCK_SEARCH_RESULTS.results;
    fixture.componentInstance.prosecutorOptions = [
      { label: 'All', value: PROSECUTOR_DEFAULT_VALUE },
      { label: 'TFL', value: 'TFL' },
      { label: 'TVL', value: 'TVL' }
    ];
    fixture.detectChanges();

    const component = fixture.debugElement.children[0].componentInstance as ListSearchResultsComponent;
    component.filterResults({ prosecutor: 'TFL' });
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('[pdk-table-body] [pdk-table-row]');
    rows.forEach((row: HTMLElement) => {
      const cells = row.querySelectorAll('[pdk-table-cell]');
      const prosecutorCell = cells[3]; // Prosecutor is the 4th column
      expect(prosecutorCell.textContent?.trim()).toBe('TFL');
    });
  });

  it('should handle switching between different prosecutor filters', () => {
    fixture.componentInstance.searchResults = MOCK_SEARCH_RESULTS.results;
    fixture.componentInstance.prosecutorOptions = [
      { label: 'All', value: PROSECUTOR_DEFAULT_VALUE },
      { label: 'TFL', value: 'TFL' },
      { label: 'TVL', value: 'TVL' }
    ];
    fixture.detectChanges();

    const component = fixture.debugElement.children[0].componentInstance as ListSearchResultsComponent;
    const tflCount = MOCK_SEARCH_RESULTS.results.filter(r => r.prosecutingAuthority === 'TFL').length;
    const tvlCount = MOCK_SEARCH_RESULTS.results.filter(r => r.prosecutingAuthority === 'TVL').length;

    // Filter by TFL
    component.filterResults({ prosecutor: 'TFL' });
    fixture.detectChanges();
    let rows = fixture.nativeElement.querySelectorAll('[pdk-table-body] [pdk-table-row]');
    expect(rows.length).toBe(tflCount);

    // Switch to TVL
    component.filterResults({ prosecutor: 'TVL' });
    fixture.detectChanges();
    rows = fixture.nativeElement.querySelectorAll('[pdk-table-body] [pdk-table-row]');
    expect(rows.length).toBe(tvlCount);

    // Switch back to All
    component.filterResults({ prosecutor: PROSECUTOR_DEFAULT_VALUE });
    fixture.detectChanges();
    rows = fixture.nativeElement.querySelectorAll('[pdk-table-body] [pdk-table-row]');
    expect(rows.length).toBe(MOCK_SEARCH_RESULTS.results.length);
  });

  it('should display prosecutors in correct order with "All" first', () => {
    fixture.componentInstance.searchResults = MOCK_SEARCH_RESULTS.results;
    fixture.componentInstance.prosecutorOptions = [
      { label: 'All', value: PROSECUTOR_DEFAULT_VALUE },
      { label: 'TVL', value: 'TVL' },
      { label: 'TFL', value: 'TFL' },
      { label: 'ABC', value: 'ABC' }
    ];
    fixture.detectChanges();

    const component = fixture.debugElement.children[0].componentInstance as ListSearchResultsComponent;
    const prosecutors = component.prosecutorOptions();

    expect(prosecutors[0]).toEqual({ label: 'All', value: PROSECUTOR_DEFAULT_VALUE });
    expect(prosecutors[1]).toEqual({ label: 'TVL', value: 'TVL' });
    expect(prosecutors[2]).toEqual({ label: 'TFL', value: 'TFL' });
    expect(prosecutors[3]).toEqual({ label: 'ABC', value: 'ABC' });
  });

  it('should update filteredResults computed signal when filter changes', () => {
    fixture.componentInstance.searchResults = MOCK_SEARCH_RESULTS.results;
    fixture.componentInstance.prosecutorOptions = [
      { label: 'All', value: PROSECUTOR_DEFAULT_VALUE },
      { label: 'TFL', value: 'TFL' },
      { label: 'TVL', value: 'TVL' }
    ];
    fixture.detectChanges();

    const component = fixture.debugElement.children[0].componentInstance as ListSearchResultsComponent;
    const initialCount = component.filteredResults().length;
    expect(initialCount).toBe(MOCK_SEARCH_RESULTS.results.length);

    component.filterResults({ prosecutor: 'TFL' });
    const filteredCount = component.filteredResults().length;
    const expectedCount = MOCK_SEARCH_RESULTS.results.filter(r => r.prosecutingAuthority === 'TFL').length;
    expect(filteredCount).toBe(expectedCount);
  });

  @Component({
    selector: 'list-search-results-test',
    template: `
      <list-search-results [searchResults]="searchResults" [prosecutorOptions]="prosecutorOptions">
      </list-search-results>
    `,
    imports: [ListSearchResultsComponent]
  })
  class TestListSearchResultsComponent {
    searchResults: CaseDetails[];
    prosecutorOptions: SelectOption[] = [];
  }
});
