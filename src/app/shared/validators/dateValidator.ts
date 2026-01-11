import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

// This is a quick fix as there seems to be an inconsisten agreement with
// dates between BE and FE:
// FE accepts dates in YY-MM-DD and YYYY-MM-DD format (check the PDK2)
// BE only accepts dates in YYYY-MM-DD format

const DATE_REGEX = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/;

@Directive({
    selector: '[validateDate]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DateValidator),
            multi: true
        }
    ],
})
export class DateValidator implements Validator {
  validate(c: AbstractControl): ValidationErrors | null {
    if (c.value) {
      const invalid = !DATE_REGEX.test((c.value as string).toLowerCase());
      if (invalid) {
        const controlName = this.getControlName(c);
        const invalidDate = { [controlName]: invalid };
        return { invalidDate };
      }
    }

    return null;
  }

  getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }
}
