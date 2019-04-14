import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { InputValues } from '../../shared/from-to-dates/from-to-dates.component';
import { CaseCountResult } from '../../contexts/mi-report';
import { ValidationError } from '@cpp/pdk/form/form.interfaces';

@Component({
  selector: 'export-case-decisions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol pdk-breadcrumb-list pdk-margin-top="4">
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink=".." pdk-breadcrumb>Home</a>
      </li>
      <li pdk-breadcrumb-list-item>
        Export case results by date
      </li>
    </ol>
    <pdk-error-summary *ngIf="errors" [errors]="errors" title="Fix the following" focusOnChange></pdk-error-summary>
    <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="8">Export case results by date</h1>
    <export-case-decisions-form (errors)="errors = $event" (loadCaseCount)="loadCaseCount.emit($event)">
    </export-case-decisions-form>
    <download-case-decisions *ngIf="caseCountResult" [caseCountResult]="caseCountResult"> </download-case-decisions>
  `
})
export class ExportCaseDecisionsComponent {
  errors: ValidationError[];

  @Input() caseCountResult: CaseCountResult;
  @Output() loadCaseCount: EventEmitter<InputValues> = new EventEmitter();
}
