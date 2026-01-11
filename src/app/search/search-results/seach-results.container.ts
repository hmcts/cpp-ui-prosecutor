import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CaseDetails } from '../../contexts/sjp';
import { FeatureState, getKeyword, getSearchResultCases } from '../search.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { SearchResultsComponent } from './components/search-results.component';

@Component({
  selector: 'search-results-container',
  imports: [AsyncPipe, SearchResultsComponent],
  template: `
    <search-results
      [keyword]="keyword$ | async"
      [searchResultCases]="searchResultCases$ | async"
      (searchRequested)="search($event)"
    >
    </search-results>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsContainer {
  private store = inject<Store<FeatureState>>(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  keyword$: Observable<string>;
  searchResultCases$: Observable<CaseDetails[]>;

  constructor() {
    this.keyword$ = this.store.select(getKeyword);
    this.searchResultCases$ = this.store.select(getSearchResultCases);
  }

  search(searchKeyword: string) {
    const { keyword: currentKeyword } = this.route.snapshot.params;
    if (currentKeyword !== searchKeyword && searchKeyword.trim() !== '') {
      this.router.navigate([currentKeyword ? '../' : './', searchKeyword], { relativeTo: this.route });
    }
  }
}
