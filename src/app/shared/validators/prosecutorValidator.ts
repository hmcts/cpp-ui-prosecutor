import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[prosecutorValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => ProsecutorValidator),
            multi: true
        }
    ],
})
export class ProsecutorValidator implements Validator {
  @Input() oldValue: string;

  validate(c: AbstractControl): ValidationErrors | null {
    if (c.value === this.oldValue) {
      return {
        duplicatedProsecutor: true
      };
    }
    return null;
  }
}
