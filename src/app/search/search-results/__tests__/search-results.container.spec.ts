import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CaseDetails } from '../../../contexts/sjp';
import { FeatureState } from '../../search.selectors';
import { Store, StoreModule } from '@ngrx/store';
import { SearchResultsContainer } from '../seach-results.container';
import { reducers } from '../../../reducers';
import { searchReducer } from '../../search.reducer';
import { SearchSuccess } from '../../search.action';
import { MOCK_SEARCH_RESULTS } from '../../__tests__/test-mock-data';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';

describe('SearchResultsContainer', () => {
  let fixture: ComponentFixture<SearchResultsContainer>;
  let store: Store<FeatureState>;
  let router: Router;
  let navigate: jest.Mock;
  const snapshot = {
    params: {
      keyword: ''
    }
  };

  beforeEach(() => {
    navigate = jest.fn();

    TestBed.configureTestingModule({
      declarations: [SearchResultsContainer, MockSearchResultsComponent],
      imports: [StoreModule.forRoot(reducers), StoreModule.forFeature('search', searchReducer), RouterTestingModule],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot
          }
        }
      ]
    });

    store = TestBed.get(Store);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(SearchResultsContainer);
  });

  it('should compile correctly', () => {
    store.dispatch(new SearchSuccess(MOCK_SEARCH_RESULTS));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit search keyword and dispatch search event', () => {
    fixture.detectChanges();
    spyOn(store, 'dispatch');
    const child = fixture.debugElement.query(By.directive(MockSearchResultsComponent)).componentInstance;
    child.search.emit('john');
    expect(router.navigate).toHaveBeenCalledWith(['./', 'john'], { relativeTo: { snapshot } });
  });

  @Component({
    selector: 'search-results',
    template: `
      <div>{{ searchResultCases | json }}</div>
      <div>{{ keyword }}</div>
    `
  })
  class MockSearchResultsComponent {
    @Input() searchResultCases: CaseDetails[];
    @Input() keyword: string;
    @Output() search = new EventEmitter<string>();
  }
});
