import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CaseDetails } from '../../contexts/sjp';
import { FeatureState, getKeyword, getProsecutorAuthoritiesOptions, getSearchResultCases } from '../search.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { SearchResultsComponent } from './components/search-results.component';
import { SelectOption } from '@cpp/pdk';

@Component({
  selector: 'search-results-container',
  imports: [AsyncPipe, SearchResultsComponent],
  template: `
    <search-results
      [keyword]="keyword$ | async"
      [searchResultCases]="searchResultCases$ | async"
      [prosecutorOptions]="prosecutorOptions$ | async"
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
  prosecutorOptions$: Observable<SelectOption[]>;
  searchResultCases$: Observable<CaseDetails[]>;

  constructor() {
    this.keyword$ = this.store.select(getKeyword);
    this.searchResultCases$ = this.store.select(getSearchResultCases);
    this.prosecutorOptions$ = this.store.select(getProsecutorAuthoritiesOptions);
  }

  search(searchKeyword: string) {
    const { keyword: currentKeyword } = this.route.snapshot.params;
    if (currentKeyword !== searchKeyword && searchKeyword.trim() !== '') {
      this.router.navigate([currentKeyword ? '../' : './', searchKeyword], { relativeTo: this.route });
    }
  }
}
