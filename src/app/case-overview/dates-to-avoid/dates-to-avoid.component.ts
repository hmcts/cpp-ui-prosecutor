import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Case } from '../../contexts/sjp';
import { Breadcrumbs } from '../../shared/breadcrumb-links/breadcrumb-links.constant';
import { Breadcrumb } from '../../shared/breadcrumb-links/breadcrumb-links.interface';

@Component({
  selector: 'dates-to-avoid-page',
  template: `
    <breadcrumb-links [caseId]="kase.id" [breadcrumbs]="breadcrumbs"></breadcrumb-links>
    <case-header-badge-container></case-header-badge-container>
    <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="5">{{ breadcrumb.title }}</h1>
    <div pdk-margin-vertical="1" *ngIf="displayDatesToAvoidBanner">
      <pdk-alert [type]="'confirmation'">
        Dates to avoid court submitted
      </pdk-alert>
      <div>
        <button type="button" pdk-button pdk-margin-vertical="5" routerLink="../../../review-not-guilty-pleas">
          Continue
        </button>
      </div>
    </div>
    <dates-to-avoid-form
      *ngIf="!displayDatesToAvoidBanner"
      [kase]="kase"
      (formSubmit)="formSubmit.emit($event)"
    ></dates-to-avoid-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatesToAvoidComponent {
  @Input() kase: Case;
  @Input() displayDatesToAvoidBanner: boolean;
  @Output() formSubmit = new EventEmitter<string>();
  breadcrumb = Breadcrumbs.DATES_TO_AVOID;
  breadcrumbs: Breadcrumb[] = [
    Breadcrumbs.HOME,
    Breadcrumbs.SEARCH,
    Breadcrumbs.CASE_OVERVIEW,
    Breadcrumbs.DATES_TO_AVOID
  ];
}
