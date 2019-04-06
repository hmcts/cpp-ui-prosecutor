import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { CsvUploadValidator } from './csv-upload-validator';

export const enum CsvUploadValidatorErrorCode {
  INVALID_FILE_NAME_HEADER = 'INVALID_FILE_NAME_HEADER',
  INVALID_FILE_NAME_OFFENCE = 'INVALID_FILE_NAME_OFFENCE',
  SERIAL_NUMBERS_DIFFERENT = 'SERIAL_NUMBERS_DIFFERENT',
  DATES_DIFFERENT = 'DATES_DIFFERENT'
}

@Directive({
  selector: '[csvUpload]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CsvUploadDirective),
      multi: true
    }
  ]
})
export class CsvUploadDirective implements Validator {
  @Input('fileToValidateAgainst') set fileToValidateAgainstValue(value: string) {
    this.fileToValidateAgainst = value;
    if (this.onChange) {
      this.onChange();
    }
  }

  @Input() csvType: string;
  @Input() fileTypeToValidateAgainst: string;

  private fileToValidateAgainst: string;
  private onChange: () => void;

  validate(control: AbstractControl): ValidationErrors | null {
    const validator = new CsvUploadValidator(
      this.getFileNameFromAbsoluthPath(control.value),
      this.getFileNameFromAbsoluthPath(this.fileToValidateAgainst),
      this.csvType,
      this.fileTypeToValidateAgainst
    );

    return validator.validate()
      ? null
      : {
          [validator.ValidationErrorCode]: true
        };
  }

  private getFileNameFromAbsoluthPath(absoluthPath: string): string {
    return absoluthPath ? absoluthPath.replace(/^.*[\\\/]/, '') : '';
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}
