import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'search-input',
  template: `
    <label pdk-label>Enter case reference number or defendant’s last name</label>
    <pdk-grid container>
      <form pdk-form #form="ngForm" (submit)="search()">
        <pdk-grid one-third>
          <pdk-form-field>
            <pdk-searchbar [(ngModel)]="searchKeyword" name="searchInput"></pdk-searchbar>
          </pdk-form-field>
        </pdk-grid>
      </form>
    </pdk-grid>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent {
  @Output() searchTerm = new EventEmitter<string>();

  searchKeyword = '';

  search() {
    this.searchTerm.emit(this.searchKeyword);
  }
}
