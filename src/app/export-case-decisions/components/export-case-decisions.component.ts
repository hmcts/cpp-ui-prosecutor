import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { InputValues } from '../../shared/from-to-dates/from-to-dates.component';
import { CaseCountResult } from '../../contexts/mi-report';
import { ValidationError } from '@cpp/pdk/form/form.interfaces';
import { Breadcrumb } from '../../shared/breadcrumb-links/breadcrumb-links.interface';
import { Breadcrumbs } from '../../shared/breadcrumb-links/breadcrumb-links.constant';

@Component({
  selector: 'export-case-decisions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <breadcrumb-links [breadcrumbs]="breadcrumbs" [showTitle]="true"></breadcrumb-links>
    <pdk-error-summary *ngIf="errors" [errors]="errors" title="Fix the following" focusOnChange></pdk-error-summary>
    <export-case-decisions-form (errors)="handleFormErrors($event)" (loadCaseCount)="loadCaseCount.emit($event)">
    </export-case-decisions-form>
    <download-case-decisions
      *ngIf="caseCountResult"
      [caseCountResult]="caseCountResult"
      [role]="role"
    ></download-case-decisions>
  `
})
export class ExportCaseDecisionsComponent {
  @Input() role: string;
  @Input() caseCountResult: CaseCountResult;
  @Output() loadCaseCount: EventEmitter<InputValues> = new EventEmitter();
  @Output() errorsOutput: EventEmitter<ValidationError[]> = new EventEmitter();
  errors: ValidationError[];
  breadcrumbs: Breadcrumb[] = [Breadcrumbs.HOME, Breadcrumbs.EXPORT_CASE_DECISIONS];

  handleFormErrors(event) {
    this.errors = event;
    this.errorsOutput.emit(event);
  }
}
