import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ValidationError } from '@cpp/pdk';

@Component({
  selector: 'csv-upload-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-grid container>
      <pdk-grid two-thirds>
        <form pdk-form (validSubmit)="submitForm()" #form="ngForm" (errors)="errors.emit($event)">
          <div pdk-padding-vertical="2">
            <pdk-form-field label="Select header CSV" labelType="medium" [errorMessages]="errorMessages">
              <input
                type="file"
                accept=".csv"
                name="headerCsv"
                required
                pdk-text-input
                [fileToValidateAgainst]="offencesCsvRef.value"
                csvType="Header"
                fileTypeToValidateAgainst="Offence"
                csvUpload
                ngModel
                #headerCsvRef
              />
            </pdk-form-field>
            <pdk-form-field label="Select offences CSV" labelType="medium" [errorMessages]="errorMessages">
              <input
                type="file"
                accept=".csv"
                name="offencesCsv"
                required
                pdk-text-input
                [fileToValidateAgainst]="headerCsvRef.value"
                csvType="Offence"
                fileTypeToValidateAgainst="Header"
                csvUpload
                ngModel
                #offencesCsvRef
              />
            </pdk-form-field>
          </div>

          <button pdk-button pdk-margin-vertical="5" type="submit">
            Send to court
          </button>
          <div>
            <a href="javascript:void(0)" pdk-link routerLink="../../" pdk-margin-vertical="5">Cancel</a>
          </div>
        </form>
      </pdk-grid>
    </pdk-grid>
  `
})
export class CsvUploadFormComponent {
  public readonly errorMessages = [
    {
      rule: 'required',
      message: 'You need to upload a file'
    },
    {
      rule: 'INVALID_FILE_NAME_HEADER',
      message: `Header file name format is wrong. Upload the file again making sure it follows the
                format nppcase_tfl_<SERIAL_NUMBER>_header_<DATETIME>.csv,
                e.g. nppcase_tfl_000001_header_20170101133045.csv`
    },
    {
      rule: 'INVALID_FILE_NAME_OFFENCE',
      message: `Offence file name format is wrong. Upload the file again making sure it follows the
                format nppcase_tfl_<SERIAL_NUMBER>_offence_<DATETIME>.csv,
                e.g. nppcase_tfl_000001_offence_20170101133045.csv`
    },
    {
      rule: 'SERIAL_NUMBERS_DIFFERENT',
      message: `Serial numbers don’t match in header and offence files.
                Upload the file again making sure they are both the same`
    },
    {
      rule: 'DATES_DIFFERENT',
      message: `Date parts for header and offence files names don’t match.
                Upload the file again making sure they are both the same`
    }
  ];

  @ViewChild('headerCsvRef') headerCsvRef;
  @ViewChild('offencesCsvRef') offencesCsvRef;
  @ViewChild(NgForm) form: NgForm;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() errors = new EventEmitter<ValidationError[]>();

  submitForm() {
    this.formSubmit.emit({
      headerCsv: this.headerCsvRef.nativeElement.files[0],
      offencesCsv: this.offencesCsvRef.nativeElement.files[0]
    });
  }
}
