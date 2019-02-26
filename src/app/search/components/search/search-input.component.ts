import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent {
  @Output() searchTerm = new EventEmitter<string>();

  searchKeyword = '';

  search() {
    this.searchTerm.emit(this.searchKeyword);
  }
}
