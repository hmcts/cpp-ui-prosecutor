import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

@Directive({
    selector: '[validateEmail]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => EmailValidator),
            multi: true
        }
    ],
})
export class EmailValidator implements Validator {
  validate(c: AbstractControl): ValidationErrors | null {
    if (c.value) {
      const invalid = !EMAIL_REGEX.test((c.value as string).toLowerCase());
      if (invalid) {
        const controlName = this.getControlName(c);
        const invalidEmail = { [controlName]: invalid };
        return { email: invalidEmail };
      }
    }

    return null;
  }

  getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }
}
