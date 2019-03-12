import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CaseDetails } from '../../contexts/sjp';
import { Search } from '../search.action';
import { FeatureState, getSearchResultCases } from '../search.selectors';

@Component({
  selector: 'search-results-container',
  template: `
    <search-results [searchResultCases]="searchResultCases$ | async" (search)="search($event)"> </search-results>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsContainer {
  searchResultCases$: Observable<CaseDetails[]>;

  constructor(private store: Store<FeatureState>) {
    this.searchResultCases$ = this.store.select(getSearchResultCases);
  }

  search(keyword: string) {
    this.store.dispatch(new Search(keyword));
  }
}
