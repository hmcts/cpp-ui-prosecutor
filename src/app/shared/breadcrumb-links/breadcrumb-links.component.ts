import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Breadcrumb } from './breadcrumb-links.interface';

@Component({
  selector: 'breadcrumb-links',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav aria-label="Breadcrumb">
      <ol pdk-breadcrumb-list pdk-margin-top="4">
        <li pdk-breadcrumb-list-item *ngFor="let breadcrumb of breadcrumbs; last as isLast">
          <a
            *ngIf="!isLast"
            href="javascript: void(0)"
            (click)="this.redirect(breadcrumb.link)"
            [attr.data-breadcrumb]="breadcrumb.id"
            pdk-breadcrumb
          >
            {{ breadcrumb.title }}
          </a>
          <div *ngIf="isLast" aria-current="page">
            {{ breadcrumb.title }}
          </div>
        </li>
      </ol>
    </nav>
    <h1 *ngIf="showTitle && title" pdk-typography="heading-xlarge" pdk-margin-vertical="6">
      {{ title }}
    </h1>
  `
})
export class BreadcrumbLinksComponent {
  @Input() breadcrumbs: Array<Breadcrumb>;
  @Input() caseId?: string;
  @Input() showTitle = false;

  constructor(private router: Router) {
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
