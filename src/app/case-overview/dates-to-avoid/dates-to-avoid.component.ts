import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Case } from '../../contexts/sjp';
import { Breadcrumbs } from '../../shared/breadcrumb-links/breadcrumb-links.constant';
import { Breadcrumb } from '../../shared/breadcrumb-links/breadcrumb-links.interface';
import { DatesToAvoidFormComponent } from "./dates-to-avoid-form.component";
import { BreadcrumbLinksComponent } from "../../shared/breadcrumb-links/breadcrumb-links.component";
import { CaseHeaderBadgeContainer } from "../common/case-header-badge/case-header-badge.container";
import { PdkCore,PdkAlertComponent, PdkTypographyDirective, PdkButtonDirective } from "@cpp/pdk";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'dates-to-avoid-page',
    template: `
    <breadcrumb-links [caseId]="kase.id" [breadcrumbs]="breadcrumbs"></breadcrumb-links>
    <case-header-badge-container></case-header-badge-container>
    <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="5">{{ breadcrumb.title }}</h1>
    @if (displayDatesToAvoidBanner) {
      <div pdk-margin-vertical="1">
        <pdk-alert [type]="'confirmation'">
          Dates to avoid court submitted
        </pdk-alert>
        <div>
          <button type="button" pdk-button pdk-margin-vertical="5" routerLink="../../../review-not-guilty-pleas">
            Continue
          </button>
        </div>
      </div>
    }
    @if (!displayDatesToAvoidBanner) {
      <dates-to-avoid-form
        [kase]="kase"
        (formSubmit)="formSubmit.emit($event)"
      ></dates-to-avoid-form>
    }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [PdkCore, PdkTypographyDirective, RouterLink, DatesToAvoidFormComponent, BreadcrumbLinksComponent, CaseHeaderBadgeContainer, PdkAlertComponent, PdkButtonDirective]
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
