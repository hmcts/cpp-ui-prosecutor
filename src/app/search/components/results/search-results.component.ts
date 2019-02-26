import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CaseDetails } from '../../search.container';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultsComponent {
  @Input() results: CaseDetails[];
}
