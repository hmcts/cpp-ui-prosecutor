import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

const PHONE_REGEX = /^[0-9()\\-\\.\\s]+$/;

@Directive({
  selector: '[validatePhone]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhoneValidator),
      multi: true
    }
  ]
})
export class PhoneValidator implements Validator {
  validate(c: AbstractControl): ValidationErrors | null {
    if (c.value) {
      const invalid = !PHONE_REGEX.test(c.value);
      if (invalid) {
        const controlName = this.getControlName(c);
        const inValidPhone = { [controlName]: invalid };
        return { inValidPhone };
      }
    }

    return null;
  }

  getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }
}
