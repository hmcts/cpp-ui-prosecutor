import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeatureState } from '../search.selectors';
import { Search } from '../search.action';

@Component({
  selector: 'search-input-container',
  template: `
    <search-input (searchTerm)="search($event)"></search-input>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputContainer {
  constructor(private store: Store<FeatureState>) {}

  search(keyword: string) {
    this.store.dispatch(new Search(keyword));
  }
}
