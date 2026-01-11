import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PdkGrid, PdkFormFieldComponent, PdkSearchbarComponent, PdkLabelDirective, PdkForm } from "@cpp/pdk";
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'search-input',
    template: `
    <label pdk-label>Enter case reference number or defendant’s last name or company name</label>
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PdkGrid, PdkFormFieldComponent, PdkSearchbarComponent, FormsModule, PdkLabelDirective, PdkForm]
})
export class SearchInputComponent {
  @Input() searchKeyword = '';
  @Output() searchTerm = new EventEmitter<string>();

  search() {
    this.searchTerm.emit(this.searchKeyword);
  }
}
