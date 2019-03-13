import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeatureState, getSearchKeyword, getSearchResultCases } from '../../search.selectors';
import { Search } from '../../search.action';
import { Observable } from 'rxjs';
import { CaseDetails } from '../../../contexts/sjp';

@Component({
  selector: 'search-results-container',
  template: `
    <ol pdk-breadcrumb-list pdk-margin-top="4">
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="../../" pdk-breadcrumb>Home</a>
      </li>
      <li pdk-breadcrumb-list-item>
        Search for a case
      </li>
    </ol>
    <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="8">Search for a case</h1>
    <search-input (searchTerm)="search($event)"></search-input>
    <search-results-table [searchPayload]="caseDetailsResults$ | async"></search-results-table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsContainer {
  caseDetailsResults$: Observable<CaseDetails[]>;
  keyword$: Observable<string>;

  constructor(private store: Store<FeatureState>) {
    this.caseDetailsResults$ = this.store.select(getSearchResultCases);
    this.keyword$ = this.store.select(getSearchKeyword);
  }

  search(keyword: string) {
    this.store.dispatch(new Search(keyword));
  }
}
