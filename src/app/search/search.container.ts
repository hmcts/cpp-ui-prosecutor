import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeatureState } from './search.selectors';
import { Search } from './search.action';

@Component({
  selector: 'search-container',
  template: `
    <search-input (searchTerm)="search($event)"></search-input>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchContainer {
  constructor(private store: Store<FeatureState>) {}

  search(keyword: string) {
    this.store.dispatch(new Search(keyword));
    // dispatch an action to the store
    // route to the search results component (todo: check if the results should be a container)
  }
}

export interface CaseDetails {
  defendantName: string;
  defendantDOB: string | Date; // todo check this from the response
  caseReferenceNumber: string;
  caseStatus: string;
  prosecutor: string;
  noticeServed: string | Date; // todo check this from the response
}
