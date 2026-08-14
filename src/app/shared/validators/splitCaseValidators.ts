import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export class SplitCaseValidators {
  static hasDuplicateUrns() {
    let previousValue: string;

    return (control: AbstractControl): ValidationErrors => {
      const formArray = control.parent as FormArray;
      if (formArray) {
        let controlsToUpdate: AbstractControl[] = [];
        const siblingControls = formArray.controls.filter(c => c !== control);
        const duplicateControls = siblingControls.filter(c => !!control.value && control.value === c.value);

        if (previousValue !== control.value) {
          controlsToUpdate = siblingControls.filter(c => !!c.value && c.value === previousValue);
          if (controlsToUpdate.length > 0) {
            controlsToUpdate.forEach(c => c.updateValueAndValidity());
          }
          previousValue = control.value;
        }

        if (duplicateControls.length > 0) {
          return { duplicate: true };
        }
      }
      return null;
    };
  }

  static caseURNNoMatch(caseReference: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      if (control.value) {
        const urn = String(control.value);
        if (!urn.startsWith(caseReference)) {
          return { noMatch: true };
        }
      }
      return null;
    };
  }

  static invalidSplitFormat(control: AbstractControl): ValidationErrors {
    const includesSlash = String(control.value)
      .trim()
      .includes('/');
    const endsWithSlash = String(control.value)
      .trim()
      .endsWith('/');

    if (control.value && (!includesSlash || endsWithSlash)) {
      return { invalidSplit: true };
    }
    return null;
  }
}
