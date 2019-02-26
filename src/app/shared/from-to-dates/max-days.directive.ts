import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import * as moment from 'moment';

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

  @Input() fromDate: string;
  @Input() maxDays: number;

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
}
