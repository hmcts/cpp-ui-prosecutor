import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { InputValues } from '../../shared/from-to-dates/from-to-dates.component';
import { CaseCountResult } from '../../contexts/mi-report';
import { ValidationError } from '@cpp/pdk/form/form.interfaces';
import { Breadcrumb } from '../../shared/breadcrumb-links/breadcrumb-links.interface';
import { Breadcrumbs } from '../../shared/breadcrumb-links/breadcrumb-links.constant';
import { BreadcrumbLinksComponent } from '../../shared/breadcrumb-links/breadcrumb-links.component';
import { PdkErrorSummaryComponent, PdkForm } from '@cpp/pdk';
import { ExportCaseDecisionsFormComponent } from './export-case-decisions-form.component';
import { DownloadCaseDecisionsComponent } from './download-case-decisions.component';

@Component({
  selector: 'export-case-decisions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <breadcrumb-links [breadcrumbs]="breadcrumbs" [showTitle]="true"></breadcrumb-links>
    @if (errors) {
    <pdk-error-summary [errors]="errors" title="Fix the following" [focusOnChange]="true"></pdk-error-summary>
    }
    <export-case-decisions-form (errors)="handleFormErrors($event)" (loadCaseCount)="loadCaseCount.emit($event)">
    </export-case-decisions-form>
    @if (caseCountResult) {
    <download-case-decisions [caseCountResult]="caseCountResult" [role]="role"></download-case-decisions>
    }
  `,
  imports: [
    BreadcrumbLinksComponent,
    PdkErrorSummaryComponent,
    ExportCaseDecisionsFormComponent,
    DownloadCaseDecisionsComponent,
    PdkForm
  ]
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
