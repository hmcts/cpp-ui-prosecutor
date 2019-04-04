import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Case } from '../../contexts/sjp';

@Component({
  selector: 'dates-to-avoid-page',
  template: `
    <ol pdk-breadcrumb-list pdk-margin-vertical="4">
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="/" pdk-breadcrumb>Home</a>
      </li>
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="../../../../../../search" pdk-breadcrumb>
          Search for a case
        </a>
      </li>
      <li pdk-breadcrumb-list-item>
        <a pdk-breadcrumb href="javascript: void(0)" routerLink="../../../../">Case Overview</a>
      </li>
      <li pdk-breadcrumb-list-item>
        <a pdk-breadcrumb>Dates to avoid</a>
      </li>
    </ol>

    <case-header-badge-container></case-header-badge-container>
    <div>
      <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="5">Dates to avoid</h1>
    </div>
    <div pdk-margin-vertical="1" *ngIf="displayDatesToAvoidBanner">
      <pdk-alert [type]="'confirmation'">
        Dates to avoid court submitted
      </pdk-alert>
      <div>
        <button pdk-button pdk-margin-vertical="5" routerLink="../../../../">
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
}
