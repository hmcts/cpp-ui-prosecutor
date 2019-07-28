import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeaderNavItem } from '@cpp/pdk/patterns/cpp.component';

@Component({
  selector: 'app-layout',
  template: `
    <pdk-cpp-layout
      [apiError]="apiError"
      [offline]="offline"
      [cookieMessage]="true"
      [activity]="activity"
      [headerNavItems]="headerNavItems"
      [searchEnabled]="searchEnabled"
      searchPlaceholder="Case or application reference"
      searchLabel="Search by case or application reference"
      (search)="search.emit($event)"
    >
      <ng-content></ng-content>
    </pdk-cpp-layout>
  `
})
export class LayoutComponent {
  @Input() headerNavItems: HeaderNavItem[];
  @Input() apiError: boolean;
  @Input() offline: boolean;
  @Input() activity: boolean;
  @Input() searchEnabled: boolean;
  @Output() search = new EventEmitter<string>();
}
