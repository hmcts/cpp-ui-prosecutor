import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NationalInsuranceNumberValidator } from '../index';

describe('NationalInsuranceNumber Validator', () => {
  let fixture: ComponentFixture<TestNationalInsuranceNumberValidator>;
  let form: NgForm;
  let ctrlElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestNationalInsuranceNumberValidator, NationalInsuranceNumberValidator],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(TestNationalInsuranceNumberValidator);
    form = fixture.debugElement.children[0].injector.get(NgForm);
    ctrlElement = fixture.debugElement.query(By.css('[name=niNumber]'));
    fixture.detectChanges();
  });

  const setValue = (elementRef, value) => {
    elementRef.nativeElement.value = value;
    elementRef.nativeElement.dispatchEvent(new Event('input'));
  };

  const invalidError = {
    inValidNI: { niNumber: true },
  };

  it('should validate the supplied national insurance number', () => {
    fixture.componentInstance.model = 'BB123456B';
    fixture.detectChanges();
    expect(form.valid).toEqual(true);
  });

  it('should not validate an empty or null input', () => {
    setValue(ctrlElement, '');
    expect(form.valid).toEqual(true);
  });

  it('should not validate national insurance number with spaces', () => {
    setValue(ctrlElement, 'BB 12 34 56 A');
    expect(form.valid).toEqual(false);
    expect(form.control.controls['niNumber'].errors).toEqual(invalidError);
    expect(form.control.hasError('inValidNI', ['niNumber'])).toBe(true);
  });

  it('should validate national insurance number in lower case', () => {
    setValue(ctrlElement, 'bb123456a');
    expect(form.valid).toEqual(true);
  });

  it('should invalidate an incorrect national number and set error', () => {
    setValue(ctrlElement, 'BB123456Bfff');
    expect(form.valid).toEqual(false);
    expect(form.control.controls['niNumber'].errors).toEqual(invalidError);
    expect(form.control.hasError('inValidNI', ['niNumber'])).toBe(true);
  });
});

@Component({
  selector: 'test-ni-validation',
  template: `
    <form>
      <input name="niNumber" [ngModel]="model" validateNI />
    </form>
  `,
})
class TestNationalInsuranceNumberValidator {
  model: string;
}
