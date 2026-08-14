import { Directive, forwardRef, HostListener } from '@angular/core';

import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

export const DELETE = 46;
export const BACKSPACE = 8;
export const TAB = 9;
export const ENTER = 13;
export const ZERO = 48;
export const NINE = 57;
export const SHIFT = 16;
export const ALT = 18;

const NUMBER_REGEX = /^\d+$/;

@Directive({
    selector: '[validateDigitsOnly]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DigitsOnlyValidator),
            multi: true
        }
    ],
})
export class DigitsOnlyValidator implements Validator {
  validate(c: AbstractControl): ValidationErrors | null {
    if (c.value) {
      const invalid = !NUMBER_REGEX.test(c.value as string) || c.value.length > 3;
      if (invalid) {
        const controlName = this.getControlName(c);
        const invalidDigit = { [controlName]: invalid };
        return { invalidDigit };
      }
    }
    return null;
  }

  getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    if ([DELETE, BACKSPACE, TAB, ENTER].includes(e.keyCode)) {
      return;
    }
    if (e.shiftKey || e.altKey || e.keyCode < ZERO || e.keyCode > NINE) {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }
}
