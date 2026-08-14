import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { CaseDetails } from '../../../contexts/sjp';
import { FeatureState } from '../../search.selectors';
import { provideStore, Store } from '@ngrx/store';
import { SearchResultsContainer } from '../seach-results.container';
import { SearchSuccess } from '../../search.action';
import { MOCK_SEARCH_RESULTS } from '../../__tests__/test-mock-data';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { reducers } from '../../../reducers';
import { JsonPipe } from '@angular/common';
import { SelectOption } from '@cpp/pdk';

describe('SearchResultsContainer', () => {
  let fixture: ComponentFixture<SearchResultsContainer>;
  let store: Store<FeatureState>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockSearchResultsComponent, SearchResultsContainer],
      providers: [provideStore(reducers, { runtimeChecks: {} }), provideRouter([])],
      teardown: { destroyAfterEach: false }
    });

    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(SearchResultsContainer);
  });

  it('should compile correctly', () => {
    store.dispatch(new SearchSuccess({ ...MOCK_SEARCH_RESULTS, keyword: '' }));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit search keyword and dispatch search event', () => {
    store.dispatch(new SearchSuccess({ ...MOCK_SEARCH_RESULTS, keyword: '' }));
    fixture.detectChanges();
    spyOn(store, 'dispatch');
    jest.spyOn(router, 'navigate');
    const child = fixture.debugElement.query(By.css('search-results'))?.componentInstance;
    expect(child).toBeTruthy();
    child.searchRequested.emit('john');
    expect(router.navigate).toHaveBeenCalledWith(['./', 'john'], { relativeTo: expect.any(Object) });
  });

  @Component({
    selector: 'search-results',
    imports: [JsonPipe],
    template: `
      <div>{{ searchResultCases | json }}</div>
      <div>{{ prosecutorOptions | json }}</div>
      <div>{{ keyword }}</div>
    `
  })
  class MockSearchResultsComponent {
    @Input() searchResultCases: CaseDetails[];
    @Input() prosecutorOptions: SelectOption[];
    @Input() keyword: string;
  }
});
