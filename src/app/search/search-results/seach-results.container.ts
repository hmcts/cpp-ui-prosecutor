import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CaseDetails } from '../../contexts/sjp';
import { FeatureState, getKeyword, getSearchResultCases } from '../search.selectors';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'search-results-container',
  template: `
    <search-results
      [keyword]="keyword$ | async"
      [searchResultCases]="searchResultCases$ | async"
      (search)="search($event)"
    >
    </search-results>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsContainer {
  keyword$: Observable<string>;
  searchResultCases$: Observable<CaseDetails[]>;

  constructor(private store: Store<FeatureState>, private route: ActivatedRoute, private router: Router) {
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
