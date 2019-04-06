import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ValidationError } from '@cpp/pdk/form/form.interfaces';

@Component({
  selector: 'csv-upload-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol pdk-breadcrumb-list pdk-margin-vertical="4">
      <li pdk-breadcrumb-list-item>
        <a href="javascript: void(0)" routerLink="/tfl" pdk-breadcrumb>Home</a>
      </li>
      <li pdk-breadcrumb-list-item>
        <a pdk-breadcrumb>Upload CSVs</a>
      </li>
    </ol>

    <h1 pdk-typography="heading-xlarge" pdk-margin-vertical="4">Upload CSVs</h1>

    <div pdk-margin-vertical="1" *ngIf="this.displayFileSubmittedBanner">
      <pdk-alert [type]="'confirmation'">
        <div>
          Your CSV file is being checked for errors
        </div>
        <div>
          Check back within 24 hours to find out if it's been successfully sent to court
        </div>
      </pdk-alert>
    </div>

    <pdk-error-summary
      *ngIf="errors && errors.length > 0"
      pdk-margin-top="5"
      focusOnChange
      title="Fix the following"
      [errors]="errors"
    >
    </pdk-error-summary>

    <csv-upload-form
      *ngIf="!this.displayFileSubmittedBanner"
      (formSubmit)="formSubmit.emit($event)"
      (errors)="errors = $event"
    >
    </csv-upload-form>
  `
})
export class CsvUploadComponent {
  errors: ValidationError[];
  @Input() displayFileSubmittedBanner: boolean;
  @Output() formSubmit = new EventEmitter<any>();
}
