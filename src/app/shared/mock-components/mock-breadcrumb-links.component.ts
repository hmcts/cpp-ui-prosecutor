import { Component, Input } from '@angular/core';
import { Breadcrumb } from '../breadcrumb-links/breadcrumb-links.interface';

@Component({
  selector: 'breadcrumb-links',
  template: 'breadcrumb-links'
})
export class MockBreadcrumbLinksComponent {
  @Input() breadcrumbs: Breadcrumb[];
  @Input() showTitle = false;
  @Input() caseId: string;
}
