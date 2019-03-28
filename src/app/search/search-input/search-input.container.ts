import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeatureState } from '../search.selectors';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'search-input-container',
  template: `
    <search-input (searchTerm)="search($event)"></search-input>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputContainer {
  constructor(private store: Store<FeatureState>, private route: ActivatedRoute, private router: Router) {}

  search(keyword: string) {
    this.router.navigate(['./search', keyword], { relativeTo: this.route });
  }
}
