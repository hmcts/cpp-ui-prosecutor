import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import moment from 'moment';

@Directive({
  selector: '[maxDays]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MaxDaysDirective),
      multi: true
    }
  ]
})
export class MaxDaysDirective implements Validator {
  private readonly dateFormat = 'YYYY-MM-DD';

  @Input('fromDate') set fromDateValue(value: string) {
    this.fromDate = value;
    if (this.onChange) {
      this.onChange();
    }
  }

  @Input('maxDays') set maxDaysValue(value: number) {
    this.maxDays = value;
    if (this.onChange) {
      this.onChange();
    }
  }

  private fromDate: string;
  private maxDays: number;

  private onChange: () => void;

  validate(c: AbstractControl): ValidationErrors | null {
    if (this.maxDays && c.value) {
      const fDate = moment(this.fromDate, this.dateFormat, true);
      const tDate = moment(c.value, this.dateFormat, true);

      if (!fDate.isValid() || !tDate.isValid()) {
        return null;
      }

      if (tDate.isSameOrAfter(fDate.add(this.maxDays, 'days'))) {
        return {
          maxDays: true
        };
      }
    }

    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}
