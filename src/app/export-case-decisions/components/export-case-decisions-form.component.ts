import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PdkButtonDirective, PdkDateInput, PdkForm, PdkLinkDirective, PdkMarginDirective } from '@cpp/pdk';
import { ValidationError } from '@cpp/pdk/form/form.interfaces';
import { InputValues, FromToDatesComponent } from '../../shared/from-to-dates/from-to-dates.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'export-case-decisions-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form pdk-form (validSubmit)="submit(form.value)" (errors)="errors.emit($event)">
      <from-to-dates [maxDaysForToDate]="31" [fromDate]="currentDate" [toDate]="currentDate"></from-to-dates>
      <button pdk-button type="submit" pdk-margin-top="6">
        Search
      </button>
      <div>
        <a href="javascript: void(0)" routerLink=".." pdk-link>Cancel</a>
      </div>
    </form>
  `,
  imports: [
    FromToDatesComponent,
    RouterLink,
    PdkButtonDirective,
    PdkLinkDirective,
    PdkMarginDirective,
    PdkForm,
    FormsModule,
    PdkDateInput
  ]
})
export class ExportCaseDecisionsFormComponent {
  currentDate = '';
  @ViewChild(NgForm, { static: true }) form: NgForm;

  @Output() loadCaseCount: EventEmitter<InputValues> = new EventEmitter();
  @Output() errors: EventEmitter<ValidationError[]> = new EventEmitter();

  submit(formValue) {
    this.errors.emit();
    this.loadCaseCount.emit(formValue);
  }
}
