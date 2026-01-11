import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SplitCaseValidators } from '../splitCaseValidators';

const caseReference = 'case-reference';
describe('Email Validator', () => {
  let fixture: ComponentFixture<TestSplitCaseValidatorComponent>;
  let form: FormGroup;
  let formArray: FormArray;
  let ctrlElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, TestSplitCaseValidatorComponent]
    });

    fixture = TestBed.createComponent(TestSplitCaseValidatorComponent);
    form = fixture.componentInstance.formGroup;
    formArray = form.controls['splitCases'] as FormArray;
    fixture.detectChanges();
  });

  const setValue = (elementRef, value) => {
    elementRef.nativeElement.value = value;
    elementRef.nativeElement.dispatchEvent(new Event('input'));
  };

  const errors = {
    required: { required: true },
    noMatch: { noMatch: true },
    invalid: { invalidSplit: true },
    duplicate: { duplicate: true }
  };

  it('should validate the required input and set error', () => {
    ctrlElement = fixture.debugElement.query(By.css('[name=splitCase_0]'));
    setValue(ctrlElement, '');
    expect(form.valid).toEqual(false);
    expect(formArray.controls[0].errors).toEqual(errors.required);
  });

  it('should not validate the required input if contains value', () => {
    ctrlElement = fixture.debugElement.query(By.css('[name=splitCase_0]'));
    setValue(ctrlElement, `${caseReference}/0`);
    expect(form.valid).toEqual(true);
  });

  it('should validate inputs if case references do not match parent case reference', () => {
    const ctrlElements = fixture.debugElement.queryAll(By.css('[name^=splitCase_]'));
    ctrlElements.forEach((ctrl, index) => setValue(ctrl, `no matching reference/ ${index}`));
    expect(form.valid).toEqual(false);
    expect(formArray.controls[0].errors).toEqual(errors.noMatch);
    expect(formArray.controls[1].errors).toEqual(errors.noMatch);
  });

  it('should not validate inputs if case references match parent case reference', () => {
    const ctrlElements = fixture.debugElement.queryAll(By.css('[name^=splitCase_]'));
    ctrlElements.forEach((ctrl, index) => setValue(ctrl, `${caseReference}/${index}`));
    expect(formArray.controls[0].hasError('noMatch')).toBe(false);
    expect(formArray.controls[1].hasError('noMatch')).toBe(false);
    expect(form.valid).toEqual(true);
  });

  it(`should validate an input if case reference value does not have '/' as split`, () => {
    ctrlElement = fixture.debugElement.query(By.css('[name=splitCase_0]'));
    setValue(ctrlElement, `${caseReference}`);
    expect(form.valid).toEqual(false);
    expect(formArray.controls[0].errors).toEqual(errors.invalid);
  });

  it(`should validate an input if case reference value ends with '/' as split`, () => {
    ctrlElement = fixture.debugElement.query(By.css('[name=splitCase_0]'));
    setValue(ctrlElement, `${caseReference}/`);
    expect(form.valid).toEqual(false);
    expect(formArray.controls[0].errors).toEqual(errors.invalid);
  });

  it(`should not validate an input if case reference value contains '/' as split`, () => {
    ctrlElement = fixture.debugElement.query(By.css('[name=splitCase_0]'));
    setValue(ctrlElement, `${caseReference}/0`);
    expect(formArray.controls[0].hasError('invalidSplit')).toBe(false);
    expect(form.valid).toEqual(true);
  });

  it(`should validate input if case reference value is duplicate of sibling input value`, () => {
    const ctrlElements = fixture.debugElement.queryAll(By.css('[name^=splitCase_]'));
    ctrlElements.forEach(ctrl => setValue(ctrl, `${caseReference}/0`));
    ctrlElement = fixture.debugElement.query(By.css('[name=splitCase_1]'));
    expect(form.valid).toEqual(false);
    expect(formArray.controls[1].errors).toEqual(errors.duplicate);
  });
});

@Component({
  selector: 'test-splitcase-validation',
  template: `
    <form [formGroup]="formGroup">
      <ng-container formArrayName="splitCases">
        @for (item of formGroup.controls['splitCases'].controls; let i = $index; track i; let first = $first) {
        <input name="splitCase_{{ i }}" [formControl]="item" />
        }
      </ng-container>
    </form>
  `,
  imports: [FormsModule, ReactiveFormsModule]
})
class TestSplitCaseValidatorComponent {
  formGroup = new FormGroup({
    splitCases: new FormArray([
      new FormControl(
        '',
        Validators.compose([
          SplitCaseValidators.caseURNNoMatch(caseReference),
          SplitCaseValidators.invalidSplitFormat,
          SplitCaseValidators.hasDuplicateUrns(),
          Validators.required
        ])
      ),
      new FormControl(
        '',
        Validators.compose([
          SplitCaseValidators.caseURNNoMatch(caseReference),
          SplitCaseValidators.invalidSplitFormat,
          SplitCaseValidators.hasDuplicateUrns()
        ])
      )
    ])
  });
}
