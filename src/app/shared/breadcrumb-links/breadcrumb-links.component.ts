import { Component, ChangeDetectionStrategy, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Breadcrumb } from './breadcrumb-links.interface';
import {
  PdkBreadcrumbDirective,
  PdkBreadcrumbListComponent,
  PdkBreadcrumbListItemDirective,
  PdkCore,
  PdkTypographyDirective
} from '@cpp/pdk';

@Component({
  selector: 'breadcrumb-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav aria-label="Breadcrumb">
      <ol pdk-breadcrumb-list pdk-margin-top="4">
        @for (breadcrumb of breadcrumbs; track breadcrumb.id; let isLast = $last) {
        <li pdk-breadcrumb-list-item>
          @if (!isLast) {
          <a
            href="javascript: void(0)"
            (click)="this.redirect(breadcrumb.link)"
            [attr.data-breadcrumb]="breadcrumb.id"
            pdk-breadcrumb
          >
            {{ breadcrumb.title }}
          </a>
          } @if (isLast) {
          <div aria-current="page">
            {{ breadcrumb.title }}
          </div>
          }
        </li>
        }
      </ol>
    </nav>
    @if (showTitle && title) {
    <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="6">
      {{ title }}
    </h1>
    }
  `,
  imports: [
    PdkCore,
    PdkBreadcrumbDirective,
    PdkTypographyDirective,
    PdkBreadcrumbListComponent,
    PdkBreadcrumbListItemDirective
  ]
})
export class BreadcrumbLinksComponent {
  private router = inject(Router);

  @Input() breadcrumbs: Array<Breadcrumb>;
  @Input() caseId?: string;
  @Input() showTitle = false;

  constructor() {
    const router = this.router;

    this.router = router;
  }

  get title() {
    return this.breadcrumbs.slice(-1).pop().title;
  }

  redirect(link) {
    const prefix = this.router.url.split('/')[1];
    if (prefix === 'user' || prefix === 'tfl') {
      this.router.navigate([`${prefix}${link(this.caseId)}`]);
    } else {
      this.router.navigate([link(this.caseId)]);
    }
  }
}
