import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[validateNI]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => NationalInsuranceNumberValidator),
            multi: true
        }
    ],
})
export class NationalInsuranceNumberValidator implements Validator {
  validate(c: AbstractControl): ValidationErrors | null {
    if (c.value) {
      const nationalInsuranceNumberRegex = this.getNiPattern();
      const nationalInsuranceSpaceInvalid = /\s/g.test(c.value.trim());
      const invalid =
        nationalInsuranceSpaceInvalid || !nationalInsuranceNumberRegex.test(c.value.replace(/\s/g, '').toUpperCase());
      if (invalid) {
        const controlName = this.getControlName(c);
        const inValidNI = { [controlName]: invalid };
        return { inValidNI };
      }
    }

    return null;
  }

  getNiPattern(): RegExp {
    return new RegExp(
      '^(?!BG)(?!GB)(?!NK)(?!KN)(?!TN)(?!NT)(?!ZZ)' +
        '[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z]' +
        '[0-9][0-9][0-9][0-9][0-9][0-9][A-D]$'
    );
  }

  getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }
}
