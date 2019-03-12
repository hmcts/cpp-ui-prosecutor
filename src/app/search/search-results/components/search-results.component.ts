import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CaseDetails } from '../../../contexts/sjp';

@Component({
  selector: 'search-results',
  template: `
    <ol pdk-breadcrumb-list pdk-margin-top="4">
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="../" pdk-breadcrumb>Home</a>
      </li>
      <li pdk-breadcrumb-list-item>
        Search for a case
      </li>
    </ol>
    <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="8">Search for a case</h1>
    <search-input (searchTerm)="search.emit($event)"></search-input>
    <list-search-results [searchResults]="searchResultCases"></list-search-results>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent {
  @Input() searchResultCases: CaseDetails[];
  @Output() search = new EventEmitter<string>();
}
