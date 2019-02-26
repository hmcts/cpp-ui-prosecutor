import { Component, Input } from '@angular/core';
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
}
