import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CaseDetails } from '../../../contexts/sjp';
import { Breadcrumb } from '../../../shared/breadcrumb-links/breadcrumb-links.interface';
import { Breadcrumbs } from '../../../shared/breadcrumb-links/breadcrumb-links.constant';
import { BreadcrumbLinksComponent } from '../../../shared/breadcrumb-links/breadcrumb-links.component';
import { SearchInputComponent } from '../../search-input/search-input.component';
import { ListSearchResultsComponent } from './list-search-results.component';
import { SelectOption } from '@cpp/pdk';

@Component({
  selector: 'search-results',
  template: `
    <breadcrumb-links [breadcrumbs]="breadcrumbs" [showTitle]="true"></breadcrumb-links>
    <search-input (searchTerm)="searchRequested.emit($event)" [searchKeyword]="keyword"></search-input>
    <list-search-results [prosecutorOptions]="prosecutorOptions" [searchResults]="searchResultCases">
    </list-search-results>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BreadcrumbLinksComponent, SearchInputComponent, ListSearchResultsComponent]
})
export class SearchResultsComponent {
  @Input() keyword: string;
  @Input() prosecutorOptions: SelectOption[];
  @Input() searchResultCases: CaseDetails[];
  @Output() searchRequested = new EventEmitter<string>();
  breadcrumbs: Breadcrumb[] = [Breadcrumbs.HOME, Breadcrumbs.SEARCH];
}
