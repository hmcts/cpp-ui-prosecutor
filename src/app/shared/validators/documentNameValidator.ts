import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[validateDocumentName]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DocumentNameValidator),
            multi: true
        }
    ],
})
export class DocumentNameValidator implements Validator {
  validate(c: AbstractControl): ValidationErrors | null {
    if (c.value) {
      // Check if document name contains only white spaces;
      // TODO: add more validation to document name once confirmed the actual format
      const invalid = c.value.replace(/\s/g, '').length === 0;
      if (invalid) {
        const controlName = this.getControlName(c);
        const invalidDocumentName = { [controlName]: invalid };
        return { invalidDocumentName };
      }
    }

    return null;
  }

  getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }
}
