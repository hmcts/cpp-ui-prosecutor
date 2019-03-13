import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SearchResult } from '../../../contexts/sjp';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent {
  @Input() results: SearchResult[];
}
